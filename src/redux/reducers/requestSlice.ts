import IRequest from "../../models/request/request.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RequestState {
  requests: IRequest[]
}
const initialState: RequestState = {
  requests: []
}
export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    loadRequest: (state,action:PayloadAction<IRequest[]>)=>{
      state.requests = action.payload;
    },
    addRequest: (state,action:PayloadAction<IRequest>)=>{
      state.requests.push(action.payload);
    },
    removeRequest: (state,action:PayloadAction<number>)=>{
      state.requests = state.requests.filter(r=>r.id!==action.payload);
    },
    cleanPiece: (state)=>{
      state.requests = [];
    }
  }
});
export const {loadRequest,addRequest,removeRequest,cleanPiece} = requestSlice.actions;
export default requestSlice.reducer;
