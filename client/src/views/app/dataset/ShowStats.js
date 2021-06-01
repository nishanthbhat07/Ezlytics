import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import DropZoneCard from "../../../components/cards/DropZoneCard";
import { connect } from "react-redux";
import StatsTable from "./fetchStatsTable";

class ShowStats extends Component {
  constructor(props) {
    super(props);
    this.checkFileName = this.checkFileName.bind(this);
  }

  checkFileName = () => {
    if (!this.props.fileName) return;
    console.log("[FILE]: ", this.props.fileName);
  };

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            {this.props.fileName ? (
              <div>
                <Row>
                  <Col sm={12}>
                    <StatsTable fileName={this.props.fileName} />
                  </Col>
                </Row>
              </div>
            ) : (
              <DropZoneCard />
            )}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  fileName: state.file.filename,
});
export default connect(mapStateToProps, null)(ShowStats);
