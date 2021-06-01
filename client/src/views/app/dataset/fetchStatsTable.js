import React, { Component } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import ReactTable from "react-table";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import DataTablePagination from "./DatatablePagination";
import { APIURI } from "../../../constants/defaultValues";
class StatsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTableColumns_num: [],
      dataTableColumns_obj: [],
      data_num: [],
      data_obj: [],
    };
  }

  render() {
    return (
      <Row>
        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Numerical Statistics</CardTitle>
              <ReactTable
                data={this.state.data_num}
                columns={this.state.dataTableColumns_num}
                defaultPageSize={5}
                filterable={false}
                showPageJump={true}
                PaginationComponent={DataTablePagination}
                showPageSizeOptions={true}
                onFetchData={(state, instance) => {
                  fetch(`${APIURI}/fetch-stats`, {
                    method: "post",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem(
                        "user_id"
                      )}`,
                    },
                    body: JSON.stringify({
                      filename: this.props.fileName,
                    }),
                  })
                    .then((res) => res.json())
                    .then((result) => {
                      const { numerical, objects } = result;
                      var col1 = Object.keys(numerical[0]);
                      var col2 = Object.keys(objects[0]);
                      const columns = col1.map((el) => el);
                      const columns1 = col2.map((el) => el);
                      var temp = columns[0];
                      columns[0] = columns[columns.length - 1];
                      columns[columns.length - 1] = temp;
                      temp = columns1[0];
                      columns1[0] = columns1[columns1.length - 1];
                      columns1[columns1.length - 1] = temp;
                      const mapping = [];
                      const mapping1 = [];
                      columns.map((el) => {
                        const obj = {
                          Header: el,
                          accessor: el,
                          Cell: (props) => (
                            <p className="list-item-heading">{props.value}</p>
                          ),
                        };
                        mapping.push(obj);
                      });
                      columns1.map((el) => {
                        const obj = {
                          Header: el,
                          accessor: el,
                          Cell: (props) => (
                            <p className="list-item-heading">{props.value}</p>
                          ),
                        };
                        mapping1.push(obj);
                      });
                      this.setState({
                        data_num: numerical,
                        dataTableColumns_num: mapping,
                        dataTableColumns_obj: mapping1,
                        data_obj: objects,
                      });
                    })
                    .catch((err) => console.error(err));
                }}
              />
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Other Statistics</CardTitle>
              <ReactTable
                data={this.state.data_obj}
                columns={this.state.dataTableColumns_obj}
                defaultPageSize={5}
                filterable={false}
                showPageJump={true}
                PaginationComponent={DataTablePagination}
                showPageSizeOptions={true}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

export default StatsTable;
