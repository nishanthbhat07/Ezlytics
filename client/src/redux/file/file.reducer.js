import { SET_USER_FILENAME, SET_COLUMNS } from "../actions";

const INIT_STATE = {
  filename: "summer.csv",
  columns: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_FILENAME:
      return { ...state, filename: action.payload };

    case SET_COLUMNS:
      return { ...state, columns: action.payload };
    default:
      return state;
  }
};
