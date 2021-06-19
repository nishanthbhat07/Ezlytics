import {
  SET_USER_FILENAME,
  SET_COLUMNS,
  SET_CATEGORICAL_COLUMNS,
  SET_NUMERICAL_COLS,
  SET_DATASET,
} from "../actions";

export const setFileName = (filename) => ({
  type: SET_USER_FILENAME,
  payload: filename,
});

export const setDataset = (dataset) => ({
  type: SET_DATASET,
  payload: dataset,
});

export const setColumns = (cols) => ({
  type: SET_COLUMNS,
  payload: cols,
});

export const setNumericalColumns = (cols) => ({
  type: SET_NUMERICAL_COLS,
  payload: cols,
});
export const setCategoricalColumns = (cols) => ({
  type: SET_CATEGORICAL_COLUMNS,
  payload: cols,
});
