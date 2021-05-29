import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardText,
  Input,
  Label,
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import DropZone from "../../containers/dashboard/FileUpload";
import { Separator } from "../common/CustomBootstrap";

class UserCardBasic extends Component {
  render() {
    return (
      <Card className="d-flex flex-row mb-4">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className=" pl-0 align-self-center  flex-sm-row pl-3">
            <CardHeader style={{ fontSize: 24, marginTop: 15 }}>
              Upload your File Here!
            </CardHeader>
            <Separator className="mb-5" />
            <div className="justify-content-center pl-3 ml-3">
              <DropZone />
            </div>
          </CardBody>
        </div>
      </Card>
    );
  }
}

export default injectIntl(UserCardBasic);
