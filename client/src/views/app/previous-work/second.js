import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import PreviousWorkCard from "../../../components/cards/PreviousWorkCard";
import { APIURI } from "../../../constants/defaultValues";

export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
    };
  }
  componentDidMount() {
    fetch(`${APIURI}/fetch-all-user-datasets`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user_id")}`,
      },
    })
      .then((res) => res.json())
      .then((results) => {
        this.setState({ datasets: results.user_datasets });
      });
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <PreviousWorkCard
              history={this.props.history}
              datasets={this.state.datasets}
            />
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}
