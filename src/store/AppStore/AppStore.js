import { createSlice } from "@reduxjs/toolkit";

const appState = createSlice({
  name: "app",
  initialState: {
    device: "Desktop",
    statusNumber: 0,
    sidebar:{
      opened: true,
      withoutAnimation : false
    }
  },
  reducers:{
    toggleSidebar: (state, action) => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = action.payload;
    },
    closeSidebar: (state, action) => {
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = action.payload;
    },
    toggleDevice: (state, action) => {
      state.device = action.payload;
    },
    setStatusNumber: (state, action) => {
      state.statusNumber = action.payload;
    }
  }
});

const appReducer = appState.reducer
export const {toggleSidebar, closeSidebar, toggleDevice, setStatusNumber} = appState.actions;

export default appReducer