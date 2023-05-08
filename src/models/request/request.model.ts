import ITypeRequest from "../typeRequest.model";

export default interface IRequest {
  id?:number,
  types:ITypeRequest,
  fields:JSON,
  created_at?:Date,
  updated_at?:Date
}
