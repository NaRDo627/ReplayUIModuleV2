import { combineReducers } from "redux";
import time from "./time"

export default combineReducers({
    // 다른 리듀서를 만들게되면 여기에 넣어줌..
    time,
  });