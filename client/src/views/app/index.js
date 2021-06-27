import React, { Component, Suspense } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLayout from "../../layout/AppLayout";

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ "./dataset")
);
const PreviousWork = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ "./previous-work")
);
const Analysis = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ "./analysis")
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboard`}
              />
              <Route
                path={`${match.url}/dashboard`}
                render={(props) => <Dashboard {...props} />}
              />
              <Route
                path={`${match.url}/previous-work`}
                render={(props) => <PreviousWork {...props} />}
              />
              <Route
                path={`${match.url}/analysis`}
                render={(props) => <Analysis {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
