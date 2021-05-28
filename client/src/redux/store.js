import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagas);
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
