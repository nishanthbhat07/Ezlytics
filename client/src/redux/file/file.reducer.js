import {
  SET_USER_FILENAME,
  SET_COLUMNS,
  SET_CATEGORICAL_COLUMNS,
  SET_NUMERICAL_COLS,
  SET_DATASET,
} from "../actions";

const INIT_STATE = {
  filename: "",
  columns: [],
  dataset: [],
  numerical_cols: [],
  categorical_cols: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_FILENAME:
      return { ...state, filename: action.payload };

    case SET_COLUMNS:
      return { ...state, columns: action.payload };

    case SET_NUMERICAL_COLS:
      return { ...state, numerical_cols: action.payload };

    case SET_CATEGORICAL_COLUMNS:
      return { ...state, categorical_cols: action.payload };
    default:
      return state;
  }
};
