import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Analysis = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./analysis")
);
const AnalysisMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}`}
        render={(props) => <Analysis {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default AnalysisMenu;
