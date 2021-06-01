import { SET_USER_FILENAME, SET_COLUMNS } from "../actions";

export const setFileName = (filename) => ({
  type: SET_USER_FILENAME,
  payload: filename,
});

export const setColumns = (cols) => ({
  type: SET_COLUMNS,
  payload: cols,
});
