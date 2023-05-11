import IUser from "./user.model";
import IQuickReplies from "./quickreplie.model";

export default interface IMessage {
  _id: string | number
  text: string
  createdAt: Date | number
  user: IUser
  image?: string
  video?: string
  audio?: string
  system?: boolean
  sent?: boolean
  received?: boolean
  pending?: boolean
  quickReplies?: IQuickReplies
}
