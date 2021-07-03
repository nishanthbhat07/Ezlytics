import React from "react";
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
class PlotGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Card style={{ cursor: "pointer" }} onClick={() => this.showModal()}>
        <CardBody>
          <CardTitle>{this.props.graphTitle}</CardTitle>
          <Row>
            <Colxx xxs="12" lg="6" className="mb-5">
              <div className="chart-container">
                <LineChart shadow data={lineChartData} />
              </div>
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
