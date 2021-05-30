import { SET_USER_FILENAME } from "../actions";

export const setFileName = (filename) => ({
  type: SET_USER_FILENAME,
  payload: filename,
});
