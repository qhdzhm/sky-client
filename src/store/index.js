import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserStore/UserStore";
import appReducer from "./AppStore/AppStore";
const state = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
export default state;
