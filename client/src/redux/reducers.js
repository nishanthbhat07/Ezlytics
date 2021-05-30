import { combineReducers } from "redux";

import settings from "./settings/reducer";
import menu from "./menu/reducer";
import authUser from "./auth/reducer";
import file from "./file/file.reducer";

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  file,
});

export default reducers;
