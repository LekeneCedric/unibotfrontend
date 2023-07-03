import IMedia from "./media.model";
import ITypePiece from "./typePiece.model";

export default interface IPiece {
  id?: number,
  name: string,
  type_piece_id?: number,
  type: ITypePiece,
  media: IMedia,
  created_at?: Date,
}
