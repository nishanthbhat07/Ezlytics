import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Card, CardBody, CardHeader, Row, Col, Button } from "reactstrap";

import { Separator } from "../common/CustomBootstrap";

class PreviousWork extends Component {
  render() {
    const { datasets } = this.props;
    return (
      <Card className="d-flex flex-row mb-4">
        <div className="d-flex flex-grow-1 min-width-zero">
          <CardBody className=" pl-0 align-self-center  flex-sm-row pl-3">
            <CardHeader style={{ fontSize: 24, marginTop: 15 }}>
              Previous Work Here
            </CardHeader>
            <Separator className="mb-5" />
            <div className="justify-content-center pl-3 ml-3">
              {datasets.map((el) => (
                <React.Fragment key={el._id.$oid}>
                  <Row style={{ margin: 10, padding: 10, fontSize: 20 }}>
                    <Col sm={3}>{el.file_name}</Col>
                    {/*  <Col sm={6}>{el.lastEdit}</Col>*/}
                    <Col sm={3}>
                      <Button
                        color="primary"
                        className={`btn-shadow`}
                        size="lg"
                      >
                        <span className="label">Load Dataset</span>
                      </Button>
                    </Col>
                  </Row>
                  <Separator className="mb-05" />
                </React.Fragment>
              ))}
            </div>
            <Row className="pt-2" style={{ marginTop: 15, paddingBottom: 8 }}>
              <Col sm={{ offset: 10, size: 2 }}>
                <Button
                  color="primary"
                  className={`btn-shadow`}
                  size="md"
                  onClick={() =>
                    this.props.history.push("/app/dashboard/show-dataset")
                  }
                >
                  <span className="label">Add New Dataset?</span>
                </Button>
              </Col>
            </Row>
          </CardBody>
        </div>
      </Card>
    );
  }
}

export default injectIntl(PreviousWork);
