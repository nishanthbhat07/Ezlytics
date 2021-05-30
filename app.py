from flask import Flask,request
from flask_cors import CORS
import pymongo
from flask_bcrypt  import Bcrypt
import jwt
import pandas as pd
import boto3
import json
from dotenv import dotenv_values
import datetime
from bson import json_util

config=dotenv_values('.env')
app=Flask(__name__)
CORS(app)
bcrypt=Bcrypt(app)

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

# RETURNS COLUMNS FROM THE CSV FILE
@app.route('/data-display-cols',methods=['POST'])
def get_file():
    filename=request.json
    print(filename)
    file_name = filename['filename']
    obj=fetch_from_aws(file_name=file_name)
    data= pd.read_csv(obj['Body'])
    cols=data.columns.to_list()
    data.fillna('NaN',inplace=True)
    # row_json_data = data.to_json(orient='records')
    final_row_data = []
    for index, rows in data.iterrows():
        d = rows.to_dict()
        d['id']=index
        final_row_data.append(d)
    return {"columns":cols,"data":final_row_data}


# RETURNS FIRST 5 ROWS OF THE DATA
@app.route('/data-head',methods=['POST'])
def print_head():
    filename=request.json
    print(filename)
    file_name = filename['filename']
    obj=fetch_from_aws(file_name=file_name)
    return data.head().to_dict()


if __name__=='__main__':
    app.run(port=5000,debug=True)