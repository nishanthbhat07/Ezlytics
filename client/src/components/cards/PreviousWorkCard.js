import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Card, CardBody, CardHeader, Row, Col, Button } from "reactstrap";

import { Separator } from "../common/CustomBootstrap";

import { APIURI } from "../../constants/defaultValues";
import { connect } from "react-redux";
import { setFileName } from "../../redux/file/file.actions";

class PreviousWork extends Component {
  constructor(props) {
    super(props);
    this.loadDataset = this.loadDataset.bind(this);
  }

  loadDataset = (file_name) => {
    this.props.setFileName(file_name);
    this.props.history.push("/app/dashboard/show-dataset");
  };

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
                    <Col sm={6} md={3} lg={4}>
                      {el.file_name}
                    </Col>
                    {/*  <Col sm={6}>{el.lastEdit}</Col>*/}
                    <Col
                      sm={6}
                      md={{ offset: 5, size: 4 }}
                      lg={{ offset: 2, size: 4 }}
                    >
                      <Button
                        color="primary"
                        className={`btn-shadow`}
                        size="sm"
                        onClick={() => this.loadDataset(el.file_name)}
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

const mapDispatchToProps = (dispatch) => ({
  setFileName: (filename) => dispatch(setFileName(filename)),
});
export default connect(null, mapDispatchToProps)(injectIntl(PreviousWork));
