import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onUserRegister() {
    if (this.state.email !== "" && this.state.password !== "") {
      console.log(this.state);
      this.props.registerUser(this.state, this.props.history);
    }
  }

  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use this form to register. <br />
                If you are a member, please{" "}
                <NavLink to={`/user/login`} className="white">
                  login
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.register" />
              </CardTitle>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input
                    type="name"
                    defaultValue={this.state.name}
                    name="name"
                    onChange={this.handleChange}
                  />
                  <IntlMessages id="user.fullname" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input
                    type="email"
                    defaultValue={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                  />
                  <IntlMessages id="user.email" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <IntlMessages
                    id="user.password"
                    defaultValue={this.state.password}
                  />
                </Label>
                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => this.onUserRegister()}
                  >
                    <IntlMessages id="user.register-button" />
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUser,
})(Register);
