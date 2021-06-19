import React, { Component, memo } from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import ReactTable from "react-table";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import DataTablePagination from "./DatatablePagination";
import {
  APIURI,
  themeRadiusStorageKey,
} from "../../../constants/defaultValues";
import { connect } from "react-redux";

import {
  setColumns,
  setCategoricalColumns,
  setNumericalColumns,
  setDataset,
} from "../../../redux/file/file.actions";

class FetchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTableColumns: [],
      data: [],
    };
  }

  render() {
    return (
      <Row>
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>Dataset</CardTitle>
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
                      this.props.setDataset(data);
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
// const mapPropsToState = (state) => ({
//   dataset: state.file.dataset,
//   columns: state.file.columns,
// });
const mapDispatchToProps = (dispatch) => ({
  setColumns: (cols) => dispatch(setColumns(cols)),
  setNumericalCols: (cols) => dispatch(setNumericalColumns(cols)),
  setCategoricalCols: (cols) => dispatch(setCategoricalColumns(cols)),
  setDataset: (dataset) => dispatch(setDataset(dataset)),
});
export default connect(null, mapDispatchToProps)(memo(FetchTable));
