export type CommentModel = {
  author: number,
  created: string,
  id: number,
  likes: number,
  parent?: number,
  text: string
}

export type AuthorModel = {
  avatar: string,
  id: number,
  name: string
}

export type CommentData = Omit<CommentModel, "author"> & {
  author: AuthorModel,
  isLiked: boolean,
}
