import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const ShowDataset = React.lazy(() =>
  import(/* webpackChunkName: "start" */ "./ShowDataset")
);
const ShowStats = React.lazy(() => import("./ShowStats"));
const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/previous-work`}
      />
      <Route
        path={`${match.url}/show-dataset`}
        render={(props) => <ShowDataset {...props} />}
      />
      <Route
        path={`${match.url}/show-stats`}
        render={(props) => <ShowStats {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
