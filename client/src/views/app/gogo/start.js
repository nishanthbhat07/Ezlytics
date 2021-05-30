import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import DropZoneCard from "../../../components/cards/DropZoneCard";
import { connect } from "react-redux";
import ShowTable from "./table";

class Start extends Component {
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
          <Colxx xxs="12">
            <Breadcrumb heading="menu.start" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            {this.props.fileName ? (
              <ShowTable fileName={this.props.fileName} />
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
export default connect(mapStateToProps, null)(Start);
