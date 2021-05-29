import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import DropZoneCard from "../../../components/cards/DropZoneCard";
import GradientCard from "../../../components/cards/GradientCard";
export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      fileName: "",
    };
  }
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
            {this.state.fileName ? <GradientCard /> : <DropZoneCard />}
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
