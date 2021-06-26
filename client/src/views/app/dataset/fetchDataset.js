import React, { Component, memo } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import ReactTable from "react-table";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import DataTablePagination from "./DatatablePagination";
import { APIURI } from "../../../constants/defaultValues";
import { connect } from "react-redux";

import { NotificationManager } from "../../../components/common/react-notifications";
import {
  setColumns,
  setCategoricalColumns,
  setNumericalColumns,
} from "../../../redux/file/file.actions";

class FetchDataset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTableColumns: [],
      data: [],
      loading: false,
    };
    this.pickleDataset = this.pickleDataset.bind(this);
  }

  pickleDataset = () => {
    this.setState({ loading: true });
    fetch(`${APIURI}/pickle-dataset`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_id")}`,
      },
      body: JSON.stringify({
        dataset: this.state.data,
        file_name: this.props.fileName,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ loading: false });
        NotificationManager.success(res.msg, "Success", 3000, null, null, "");
      })
      .catch((err) =>
        NotificationManager.error(err, "Could not upload", 3000, null, null, "")
      );
  };
  render() {
    return (
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle style={{ fontSize: 24, fontWeight: 500 }}>
                Dataset
              </CardTitle>
              <Row className="pb-2 pt-2 pl-3">
                <Col sm={{ offset: 10, size: 2 }}>
                  <Button
                    color="primary"
                    className={`btn-shadow  btn-multiple-state ${
                      this.state.loading ? "show-spinner" : ""
                    }`}
                    size="sm"
                    onClick={() => this.pickleDataset()}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">Click here to Save</span>
                  </Button>
                </Col>
              </Row>
              <ReactTable
                data={this.state.data}
                columns={this.state.dataTableColumns}
                defaultPageSize={50}
                filterable={true}
                showPageJump={true}
                PaginationComponent={DataTablePagination}
                showPageSizeOptions={true}
                onFetchData={(state, instance) => {
                  fetch(`${APIURI}/fetch-df`, {
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
                    .then((cols) => {
                      const { columns, data, numerical_cols, cat_cols } = cols;
                      this.props.setColumns(columns);
                      this.props.setCategoricalCols(cat_cols);
                      this.props.setNumericalCols(numerical_cols);

                      const mapping = [];
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
                      this.setState({
                        dataTableColumns: mapping,
                        data: data,
                      });
                    })
                    .catch((err) => console.error(err));
                }}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setColumns: (cols) => dispatch(setColumns(cols)),
  setNumericalCols: (cols) => dispatch(setNumericalColumns(cols)),
  setCategoricalCols: (cols) => dispatch(setCategoricalColumns(cols)),
});
export default connect(null, mapDispatchToProps)(memo(FetchDataset));
