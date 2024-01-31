import React, {useCallback, useMemo} from "react";
import "./App.css";
import Comment from "./components/Comment";
import styled from "styled-components";
import Likes from "./components/Likes";
import LoadingSpinner from './components/LoadingSpinner'
import useLoadInfo from "./api-hooks/useLoadInfo";
import {Toaster} from 'react-hot-toast';

const Wrapper = styled.div`

  max-width: 561px;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin: 52px auto 64px;
  gap: 32px;
  padding: 0 15px 0;
`

const Comments = styled.div`
  display: flex; 
  flex-direction:column;
  gap: 32px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--Neutral-neutral-30, #767676);
`


const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  padding-top: 8px;
  justify-content: center;
  color:white;
  border-top: 1px solid var(--Neutral-neutral-30, #767676);
`

const Title = styled.div`
  color: #FFF;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
`

const LoadMoreButton = styled.button`
  border-radius: 4px;
  background: #313439;

  backdrop-filter: blur(13.5px);
  display: flex;
  width: fit-content;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #FFF;

  text-align: center;
  font-family: "lato", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */
  border: none;
  text-alin: center;
  padding: 8px 31px;
  cursor:pointer; 
  &:hover{
    opacity:0.9;
  }
`


function App() {
  const {comments, isLoading, loadMore, setComments, moreToLoad} = useLoadInfo()

  const likes = useMemo(() => comments?.data?.reduce(
    (sum, item) => sum + item.likes
    , 0
  ) ?? 0, [comments])

  const toggleLike = useCallback((id: number) => setComments(
    v => v
      ? {
        ...v,
        pages: v.pages, data:
          v.data.map(item => item.id === id ? ({
            ...item,
            likes: item.likes + (item.isLiked ? -1 : 1),
            isLiked: !item.isLiked,
          }) : item)

      }
      : undefined
  ), [comments, likes, setComments])

  return (
    <>
      <Wrapper>
        <Header>
          <Title>
            {comments?.data?.length ?? 0} комментариев
          </Title>
          <Likes disabled count={likes} />
        </Header>
        <Comments>
          {comments?.data
            .filter(({parent}) => !parent).map((comment, idx) => (
              <Comment
                data={comment}
                key={comment.id}
                onLikeToggle={toggleLike}
                children={comments?.data.filter(({parent}) => parent === comment.id)} />
            ))
          }
        </Comments>
        {isLoading
          ? <LoadingSpinner />
          : moreToLoad
            ? <LoadMoreButton
              onClick={loadMore}
            >
              Загрузить еще
            </LoadMoreButton>
            : <Footer>Конец истории переписки</Footer>
        }
      </Wrapper>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
