import IMedia from "./media.model";

export default interface IPiece {
  id?:number,
  name:string,
  type:string,
  media:IMedia
}
