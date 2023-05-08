import IMedia from "../media.model";
import ITypeRequest from "../typeRequest.model";

export default interface IRequestRequire{
  type_piece_id?: number,
  name: string,
  types?: ITypeRequest,
  body?: {
    name: string,
    media: IMedia
  }
}
