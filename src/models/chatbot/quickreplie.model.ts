export interface IQuickReply{
  title: string,
  value: string,
}
export default interface IQuickReplies{
  type: 'radio' | 'checkbox' | 'dropdown',
  keepIt?: boolean,
  values: IQuickReply[],
}
