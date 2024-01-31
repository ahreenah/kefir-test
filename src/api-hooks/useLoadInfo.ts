import {useCallback, useEffect, useState} from "react"
import toast from "react-hot-toast"
import getAuthorsRequest from "src/api/authors/getAuthorsRequest"
import getCommentsRequest from "src/api/comments/getCommentsRequest"
import {AuthorModel, CommentData, CommentModel} from "src/types"

const useLoadInfo = () => {

  const [comments, setComments] = useState<{
    data: Array<CommentData>,
    pages: number,
    pagination: {
      page: number,
      size: number,
      total_pages: number
    }
  } | undefined>(undefined)
  const [authors, setAuthors] = useState<Array<AuthorModel>>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    (async () => {
      const authors = await getAuthorsRequest()
      setAuthors(authors)
      const newComments = await getCommentsRequest(1)
      setComments({
        ...newComments,
        data: newComments.data.map((data: CommentModel) => ({
          ...data,
          isLiked: false,
          author: authors.find((i: AuthorModel) => i.id = data.author)
        }))
      })
      setIsLoading(false)
    })();
    return () => {}
  }, [])

  const loadMore = useCallback(async () => {
    try {
      setIsLoading(true)
      let newComments = await getCommentsRequest(page + 1)
      setComments({
        ...newComments,
        data: [
          ...comments?.data ?? [],
          ...newComments.data.map((data: CommentModel) => ({
            ...data,
            isLiked: false,
            author: authors.find((i: AuthorModel) => i.id == data.author)
          }))
        ]
      })
      setPage(page => page + 1)
    }
    catch (e) {
      toast.error('Ошибка загрузки')
    }
    setIsLoading(false)
  }, [authors, page, comments])

  return {
    isLoading, comments, page, loadMore, setComments,
    moreToLoad: page != comments?.pagination.total_pages
  }

}

export default useLoadInfo
