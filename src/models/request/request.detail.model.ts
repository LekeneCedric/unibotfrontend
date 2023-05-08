import IRequestRequire from "./request.require.model";
import ITypeRequest from "../typeRequest.model";

export default interface IRequestDetail{
  types? : ITypeRequest,
  requires?: IRequestRequire[]
}
