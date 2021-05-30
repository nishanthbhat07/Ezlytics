import { SET_USER_FILENAME } from "../actions";

const INIT_STATE = {
  filename: "summer.csv",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_FILENAME:
      return { ...state, filename: action.payload };
    default:
      return state;
  }
};
