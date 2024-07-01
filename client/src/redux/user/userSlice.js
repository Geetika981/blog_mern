import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  loading: false,
  error: false,
  blogs:[],
  comments:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerInStart: (state) => {
        state.loading = true;
        state.error = false;
      },
      registerInSuccess: (state) => {
          (state.loading = false),
          (state.error = false);
      },
      registerInFailure: (state, action) => {
          (state.loading = false),
          (state.error = action.payload);
      },
    signInStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInSuccess: (state, action) => {
      // console.log(action.payload),
        (state.currentuser = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    signInFailure: (state, action) => {
      (state.currentuser = null),
        (state.loading = false),
        (state.error = action.payload);
    },
    logoutStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    logoutSuccess: (state) => {
      (state.currentuser = null), (state.loading = false);
    },
    logoutFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateuserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateuserSuccess: (state, action) => {
      state.currentuser = action.payload;
      state.loading = false;
    },
    updateuserFailure: (state, action) => {
      (state.loading = false); (state.error = action.payload);
    },
    getblogs:(state,action)=>{
      state.blogs=action.payload;
    },
    getComments:(state,action)=>{
      state.comments=action.payload;
    }
  },
});

export default userSlice.reducer;
export const {
  signInStart,
  signInFailure,
  signInSuccess,
  logoutSuccess,
  getComments,
  logoutFailure,
  updateuserStart,
  updateuserFailure,
  updateuserSuccess,
  registerInFailure,
  registerInSuccess,
  registerInStart,getblogs
} = userSlice.actions;
