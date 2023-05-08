import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IPiece from "../../models/piece.model";
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
    loadPiece: (state, action: PayloadAction<IPiece[]>) => {
      console.log(action.payload)
      state.pieces = action.payload;
    },
    addPiece: (state, action: PayloadAction<IPiece>)=>{
      state.pieces.push(action.payload);
      console.log(state.pieces)
    },
    removePiece: (state, action: PayloadAction<number>)=>{
      state.pieces = state.pieces.filter(p=>p.id!==action.payload);
    },
    updatePiece: (state,action:PayloadAction<IPiece>)=>{
      state.pieces = state.pieces.map(p=>p.id===action.payload.id?action.payload:p);
    },
    cleanPiece: (state)=>{
      state.pieces = [];
    }
  }
});
export const {loadPiece,addPiece,removePiece,updatePiece,cleanPiece} = pieceSlice.actions;
export default pieceSlice.reducer;
