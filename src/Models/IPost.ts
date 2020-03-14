export interface IPost {
  id: number;
  postTypeId: number;
  acceptedAnswerId: number;
  parentId?: any;
  creationDate: Date;
  score: number;
  viewCount: number;
  body: string;
  ownerUserId: number;
  lastEditorUserId: number;
  lastEditDate: Date;
  lastActivityDate: Date;
  title: string;
  tags: string;
  answerCount: number;
  commentCount: number;
  favoriteCount: number;
}
