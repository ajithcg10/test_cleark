import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../Redux/store'

// Define a type for the slice state
export interface UserState {
data:{
    _id: string,
    email:string,
    password: string,
    __v: number,
    loginDetails:{
      _id: string,
      chats:any[],
      email:string,
      password:string,
      profileImage:string,
      __v: number,
    }
}

}

// Define the initial state using that type
const initialState: UserState = {
  data:{
    _id: '',
    email:'',
    password: '',
    __v: 0,
    loginDetails:{
      _id: '',
      chats:[],
      email:'',
      password:'',
      profileImage:'',
      __v: 0,
    }
}
  };
  
  export const userdataSlice = createSlice({
    name: 'userdata',
    initialState,
    reducers: {
      getData: (state, action: PayloadAction<UserState>) => {
        state.data = { ...state.data, ...action.payload.data }; // Update the state with the payload data
      },
    },
  });

export const { getData } = userdataSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.userSlice

export default userdataSlice.reducer