import React from "react";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { Row, Card, CardBody, CardTitle, Button, Col } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { chartTooltip } from "../../../components/charts/util";
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

/*
BI:
    1. Line Chart
    2. Scatter plot
    3. Bar Chart
    4. Box plot
    5. Violin Plot
UI:
    1. Pie Chart (DOUGHNUT CHART)
    2. Histogram
*/
const PlotGraph = (props) => {
  switch (props.type) {
    case "pie":
      console.log(props.chartObj);
      return (
        <Card>
          <PerfectScrollbar options={{ suppressScrollY: true }} component="div">
            <CardBody>
              <CardTitle>{props.graphTitle}</CardTitle>

              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Colxx xxs="12" lg="12" className="mb-5">
                  <div className="chart-container">
                    <DoughnutChart shadow data={props.chartObj} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </PerfectScrollbar>
        </Card>
      );
    case "bar":
      const lineChartOptions = {
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: chartTooltip,
        plugins: {
          datalabels: {
            display: false,
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                lineWidth: 1,
                color: "rgba(0,0,0,0.1)",
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 100,
                min: 0,
                max: props.max + 50,
                padding: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      };
      console.log(props.chartObj);

      return (
        <Card>
          <PerfectScrollbar options={{ suppressScrollY: true }} component="div">
            <CardBody>
              <CardTitle>{props.graphTitle}</CardTitle>

              <Row
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Colxx xxs="12" lg="12" className="mb-5">
                  <div className="chart-container">
                    <LineChart
                      data={props.chartObj}
                      options={lineChartOptions}
                    />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </PerfectScrollbar>
        </Card>
      );
  }
};
export default PlotGraph;
