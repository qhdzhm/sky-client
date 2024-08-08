import { clearToken, getToken, instance, setToken } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const userStore = createSlice({
  name:'user',
  initialState: {
    user:{},
    token: getToken() || ''
  },
  reducers:{
    setUserInfo(state,action){
      state.user = action.payload
      setToken(state.user.token)
    },
    clearUserInfo(state,action){
      state.user = {}
      state.token = ''
      clearToken();
    }
  }
})

const {setUserInfo,clearUserInfo} = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = (LoginForm)=>{
  
  return async (dispatch)=>{
    const res = await instance.post('/admin/employee/login',LoginForm)

    if(res.data.code === 1){
      dispatch(setUserInfo(res.data.data))
      message.success('login success')
    }

    else{
      message.error(res.data.msg)
      clearToken();
      return
    }
  }
}
export {fetchLogin ,clearUserInfo }
export default userReducer
