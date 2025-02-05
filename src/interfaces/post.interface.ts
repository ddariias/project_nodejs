export interface IPost {
  _id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  _userId: string;
}
export type PostBody = Pick<IPost, "title">