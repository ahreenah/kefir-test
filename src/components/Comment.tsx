import {CommentData, CommentModel} from "src/types"
import styled from "styled-components"
import Likes from "./Likes"
import {useState} from "react"
import {DateTime} from 'luxon'

type CommentProps = {
  data: CommentData,
  children: Array<CommentData>,
  onLikeToggle: (id: number) => void,
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-column-gap: 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Sender = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const SenderAvatar = styled.div`
  width: 68px;
  background: white;
  height: 68px;
  border-radius: 100%;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`

const SenderData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`

const SenderName = styled.div`
  color: #FFF;

  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 137.5% */
`

const SendTime = styled.div`
  color: #8297AB;

  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const Text = styled.div`
  color: #FFF;
  overflow-wrap: anywhere;
  font-family: Lato;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const CommentWithNested = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const Nested = styled.div`
  margin-left: 34px; 
`


function formatDateTime(dateTime: string) {
  // Parse the input date string
  const parsedDateTime = DateTime.fromISO(dateTime);

  // Get the current date and time
  const now = DateTime.now();

  // Calculate the difference in hours
  const hoursDifference = now.diff(parsedDateTime, 'hours').hours;

  // Check if the difference is more than 8 hours
  if (hoursDifference < 8) {
    // If more than 8 hours ago, print relative time
    return parsedDateTime.setLocale('ru-RU').toRelative();
  } else {
    // If within 8 hours, print localized absolute time
    return parsedDateTime.setLocale('ru-RU').toFormat("dd.MM.yyyy, HH:mm:ss")//.toLocaleString(DateTime.DATETIME_FULL);
  }
}

const Comment = ({data, children, onLikeToggle}: CommentProps) => {
  const [isLiked, setIsLiked] = useState(false)
  return (
    <CommentWithNested>
      <Wrapper>
        <SenderAvatar style={{
          backgroundImage: `url(${data?.author?.avatar ?? '/star-wars.png'})`
        }} />
        <Header>
          <Sender>
            <SenderData>
              {data.author
                ? <SenderName>{data?.author?.name}</SenderName>
                : <SenderName>Deleted</SenderName>}
              <SendTime>
                {formatDateTime(data.created)}
                {/*{DateTime.fromISO(data.created).toRelative()}{new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'full',
                  timeStyle: 'long',
                }).format(new Date(data.created))}*/}
              </SendTime>
            </SenderData>
          </Sender>
          <Likes
            count={data.likes}
            isLiked={data.isLiked}
            onChange={() => onLikeToggle(data.id)}
          />
        </Header>
        <div />
        <Text>
          {data.text}
        </Text>
      </Wrapper>
      <Nested>
        {children.map(comment => (
          <Comment
            key={comment.id}
            data={comment} children={[]}
            onLikeToggle={onLikeToggle}
          />
        ))}
      </Nested>
    </CommentWithNested>
  )
}

export default Comment
