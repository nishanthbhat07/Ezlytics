import React, { Component } from "react";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { Row, Card, CardBody, CardTitle, Button, Col } from "reactstrap";
import ChooseColsAndAnalysisModal from "./modal";
import PlotGraph from "./plotGraph";

import { makeDataPlotableBivariate, makeDataPlotableUnivariate } from "./utils";

import { APIURI } from "../../../constants/defaultValues";

import { connect } from "react-redux";

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      analysisType: "",
      showCols: false,
      selectedCol: "",
      selectedCols1: "",
      selectedCols2: "",
      plots: [],
      plotOptions: [],
    };
    this.showModal = this.showModal.bind(this);
    this.setAnalysisType = this.setAnalysisType.bind(this);
    this.setShowCols = this.setShowCols.bind(this);
    this.setSelectedCol = this.setSelectedCol.bind(this);
    this.setSelectedCols = this.setSelectedCols.bind(this);
    this.drawGraphs = this.drawGraphs.bind(this);
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
  setSelectedCols = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  drawGraphs = () => {
    if (this.state.analysisType === "Univariate Analysis") {
      fetch(`${APIURI}/fetch-data-for-graphs`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user_id")}`,
        },
        body: JSON.stringify({
          type: this.state.analysisType,
          column: this.state.selectedCol,
          filename: this.props.filename,
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          // console.log(results);
          const { data } = results;
          const chartObj = makeDataPlotableUnivariate(
            Object.values(data),
            this.state.selectedCol
          );

          var options = {
            graphTitle: `Pie Chart of ${this.state.selectedCol}`,
            chartObj: chartObj,
          };

          this.setState({
            plots: this.state.plots.concat([options]),
          });
          this.showModal();
        });
    } else {
      fetch(`${APIURI}/fetch-data-for-graphs`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user_id")}`,
        },
        body: JSON.stringify({
          type: this.state.analysisType,
          col1: this.state.selectedCols1,
          col2: this.state.selectedCols2,
          filename: this.props.filename,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          const { data } = result;
          const chartObj = makeDataPlotableBivariate(
            data,
            this.state.selectedCols1,
            this.state.selectedCols2
          );
          // console.log("[Chart Obj]: ", chartObj);
          var options = {
            graphTitle: `Pie Chart of ${this.state.selectedCol}`,
            chartObj: chartObj,
          };
          this.setState({
            plots: this.state.plots.concat([options]),
          });
          this.showModal();
        });
    }
  };
  render() {
    const { columns, numerical_cols, categorical_cols } = this.props;
    return (
      <Row className="mb-4">
        <Colxx xxs="12">
          {this.state.plots
            ? this.state.plots.map((item) => (
                <Colxx className="mb-4" xxs="12">
                  <PlotGraph
                    graphTitle={item.graphTitle}
                    chartObj={item.chartObj}
                  />
                </Colxx>
              ))
            : null}
          <Card style={{ cursor: "pointer" }} onClick={() => this.showModal()}>
            <CardBody
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "750",
                fontSize: 32,
              }}
            >
              <CardTitle>Click here to start</CardTitle>

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
                setSelectedCols={this.setSelectedCols}
                selectedCol={this.state.selectedCol}
                selectedCols1={this.state.selectedCols1}
                selectedCols2={this.state.selectedCols2}
                drawGraphs={this.drawGraphs}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  columns: state.file.columns,
  filename: state.file.filename,
  numerical_cols: state.file.numerical_cols,
  categorical_cols: state.file.categorical_cols,
});
export default connect(mapStateToProps, null)(Analysis);
