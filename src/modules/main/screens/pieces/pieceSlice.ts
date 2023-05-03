import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IPiece from "../../../../models/piece.model";
import { act } from "react-test-renderer";
interface PieceState {
  pieces: IPiece[]
}
const initialState: PieceState = {
  pieces: []
}
export const pieceSlice = createSlice({
  name: 'piece',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<IPiece[]>) => {
      console.log(`t ${action.payload}`);
      state.pieces = action.payload;
    },
    add: (state, action: PayloadAction<IPiece>)=>{
      state.pieces.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>)=>{
      state.pieces = state.pieces.filter(p=>p.id!==action.payload);
    },
    update: (state,action:PayloadAction<IPiece>)=>{
      state.pieces = state.pieces.map(p=>p.id===action.payload.id?action.payload:p);
    },
    clean: (state)=>{
      state.pieces = [];
    }
  }
});
export const {load,add,remove,update,clean} = pieceSlice.actions;
export default pieceSlice.reducer;
