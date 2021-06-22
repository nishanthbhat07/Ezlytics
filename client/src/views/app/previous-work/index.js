import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Second = React.lazy(() =>
  import(/* webpackChunkName: "second" */ "./second")
);
const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route path={`${match.url}`} render={(props) => <Second {...props} />} />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
