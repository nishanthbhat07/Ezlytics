import React, { Component } from "react";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { Row, Card, CardBody, CardTitle, Button, Col } from "reactstrap";
import ChooseColsAndAnalysisModal from "./modal";
import {
  DoughnutChart,
  LineChart,
  PolarAreaChart,
  AreaChart,
  ScatterChart,
  BarChart,
  RadarChart,
  PieChart,
} from "../../../components/charts";

import { connect } from "react-redux";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      analysisType: "",
      showCols: false,
      selectedCol: "",
    };
    this.showModal = this.showModal.bind(this);
    this.setAnalysisType = this.setAnalysisType.bind(this);
    this.setShowCols = this.setShowCols.bind(this);
    this.setSelectedCol = this.setSelectedCol.bind(this);
  }
  showModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  setShowCols = (val) => {
    this.setState({ showCols: val });
  };
  setAnalysisType = (val) => {
    this.setState({ analysisType: val });
  };
  setSelectedCol = (val) => {
    this.setState({ selectedCol: val });
  };
  render() {
    const { columns, numerical_cols, categorical_cols } = this.props;
    return (
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>Plot Graphs</CardTitle>
              <Row>
                <Col sm={{ offset: 9, size: 3 }}>
                  <Button color="primary" onClick={() => this.showModal()}>
                    Click here to start
                  </Button>
                </Col>
                <ChooseColsAndAnalysisModal
                  isOpen={this.state.isOpen}
                  showModal={this.showModal}
                  columns={columns}
                  numerical_cols={numerical_cols}
                  categorical_cols={categorical_cols}
                  analysisType={this.state.analysisType}
                  showCols={this.state.showCols}
                  setAnalysisType={this.setAnalysisType}
                  setShowCols={this.setShowCols}
                  setSelectedCol={this.setSelectedCol}
                  selectedCol={this.state.selectedCol}
                />
              </Row>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <div className="chart-container">
                    {/* <LineChart shadow data={lineChartData} />*/}
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  columns: state.file.columns,
  numerical_cols: state.file.numerical_cols,
  categorical_cols: state.file.categorical_cols,
});
export default connect(mapStateToProps, null)(Analysis);
