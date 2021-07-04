import React from "react";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { Row, Card, CardBody, CardTitle, Button, Col } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
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
    const options = {
      legend: {
        display: true,
        position: "right",
      },
    };
    return (
      <Card>
        <CardBody>
          <CardTitle>{this.props.graphTitle}</CardTitle>

          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Colxx xxs="12" lg="12" className="mb-5">
              <PerfectScrollbar
                options={{ suppressScrollY: true }}
                component="div"
              >
                <div className="chart-container">
                  <DoughnutChart
                    shadow
                    data={this.props.chartObj}
                    options={options}
                  />
                </div>
              </PerfectScrollbar>
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
export default PlotGraph;
