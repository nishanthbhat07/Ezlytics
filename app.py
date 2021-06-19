from flask import Flask,request
from flask_cors import CORS
import pymongo
from flask_bcrypt  import Bcrypt
from flask_caching import Cache
import jwt
import pandas as pd
import numpy as np
import boto3
import json
from dotenv import dotenv_values
import datetime
from bson import json_util

config=dotenv_values('.env')
cache_config = {
    "DEBUG": True,         
    "CACHE_TYPE": "SimpleCache", 
    "CACHE_DEFAULT_TIMEOUT": 300
}
app=Flask(__name__)
CORS(app)
bcrypt=Bcrypt(app)
app.config.from_mapping(cache_config)
cache = Cache(app)

key=config['key']
# AWS CREDENTIALS
bucket = config['bucket']
aws_id=config['aws_id']
aws_secret=config['aws_secret']
mongoURI=config['mongoURI']


client = pymongo.MongoClient(mongoURI)
db = client['DDashboard']
user_col=db['users']


# SIGNUP API
@app.route('/signup',methods=['POST'])
def signup():
    inps= request.get_json()
    email=str(inps['email'])
    password=str(inps['password'])
    name=str(inps['name'])
    if(len(password)<8):
        return {'statusCode':422,'status':"Password length is short"}
    else:
        user=user_col.find_one({'email':email})
        if(user==None):
            hash_pwd=bcrypt.generate_password_hash(password,10)
            pwd= str(hash_pwd)
            pwd= pwd[2:-1]
            user_col.insert_one({
                "name":name,
                'password':pwd,
                'email':email
            })
            return {'statusCode':200,"success":True}
        else:
            return {'statusCode':422,"success":False,"msg":"EmailID Already exists"}

# LOGIN API
@app.route('/login',methods=['POST'])
def login():
    cred= request.get_json()
    cred['email']=str(cred['email'])
    cred['password']=str(cred['password'])
    user=user_col.find_one({'email':cred['email']})
    if(bcrypt.check_password_hash(str(user['password']),cred['password'])):
        token=jwt.encode({"email":cred['email'] }, "secret", algorithm="HS256")
        new_user={}
        user = json.loads(json_util.dumps(user))
        for i in user:
            if(i=='password'):
              continue  
            new_user[i]=user[i]

        return {'statusCode':200,"success":True,"token":token, "msg":"","user":new_user}
    else:
        return {'statusCode':422,"success":False,"msg":'Invalid Password / EmailID '}

@app.route('/dummy-api',methods=['POST'])
def dummy():
    return {'statusCode':200, 'statusPhrase':'OK', 'progress': 100}


# AWS HELPER FUNCTIONS
def fetch_from_aws(file_name):
    s3 = boto3.client('s3',aws_access_key_id=aws_id,aws_secret_access_key=aws_secret) 
    return s3.get_object(Bucket= bucket, Key= file_name)


def delete_from_aws(file_name):
    s3 = boto3.client('s3',aws_access_key_id=aws_id,aws_secret_access_key=aws_secret)
    obj = s3.Object(bucket,file_name)
    obj.delete()

# HELPER FUNCTION ---> CHECKING AUTHORIZATION BY DECODING JWT
def check_user_authorization(headers):
    if('Authorization' not in headers.keys()):
        return {'statusCode': 401, 'statusPhrase': "Unauthorized"}
    decode_bearer= jwt.decode(headers['Authorization'].split(' ')[-1],'secret',algorithms="HS256")['email']
    user = user_col.find_one({'email':decode_bearer})
    return {'user':user, 'statusCode':200}

# RETURNS COLUMNS AND DATAFRAME FROM THE CSV FILE
@app.route('/fetch-df',methods=['POST'])
@cache.cached(timeout=50)
def get_file():
    headers= request.headers
    check_auth= check_user_authorization(headers=headers)
    if(check_auth['statusCode']==401):
        return {'statusCode': 401, 'statusPhrase': "Unauthorized"}
    if(not check_auth):
        return {'statusCode': 401, 'statusPhrase': "Unauthorized"}
    filename=request.json
    file_name = filename['filename']
    obj=fetch_from_aws(file_name=file_name)
    data= pd.read_csv(obj['Body'])
    cols=data.columns.to_list()
    data.fillna('NaN',inplace=True)
    numerical_cols=data._get_numeric_data().columns.to_list()
    cat_cols=list(set(cols)-set(numerical_cols))
    # row_json_data = data.to_json(orient='records')
    final_row_data = []
    for index, rows in data.iterrows():
        d = rows.to_dict()
        d['id']=index
        final_row_data.append(d)

    return {"columns":cols,"data":final_row_data,"numerical_cols":numerical_cols,"cat_cols":cat_cols}



# RETURNS FIRST 5 ROWS OF THE DATA
@app.route('/fetch-stats',methods=['POST'])
@cache.cached(timeout=50)
def fetch_stats():
    headers= request.headers
    check_auth= check_user_authorization(headers=headers)
    if(check_auth['statusCode']==401):
        return {'statusCode': 401, 'statusPhrase': "Unauthorized"}
    if(not check_auth):
        return {'statusCode': 401, 'statusPhrase': "Unauthorized"}
    filename=request.json
    file_name = filename['filename']
    obj=fetch_from_aws(file_name=file_name)
    data= pd.read_csv(obj['Body'])
    data_num= data.describe()
    data_obj= data.describe(include=['object'])
    final_num, final_obj = [],[]
    for index, rows in data_num.iterrows():
        d = rows.astype(float).to_dict()
        d['id']=index
        final_num.append(d)
    for index, rows in data_obj.iterrows():
        row=[str(x) for x in rows.values]
        if(row[0].isnumeric()):
            d=rows.astype(float).to_dict()
            d['id']=index
            final_obj.append(d)
        else:
            d=rows.to_dict()
            d['id']=index
            final_obj.append(d)
    # print(type(final_obj),type(final_num))
    # final_num = json.loads(json_util.dumps(final_num))
    # final_obj = json.loads(json_util.dumps(final_obj))

    return {'numerical':final_num, 'objects':final_obj}

if __name__=='__main__':
    app.run(port=5000,debug=True)