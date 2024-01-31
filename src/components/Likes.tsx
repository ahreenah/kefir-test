import styled from "styled-components"
import likeEmptyIcon from '../assets/like-empty.svg'
import likeFilledIcon from '../assets/like-filled.svg'
import likeDisabledIcon from '../assets/like-disabled.svg'
//import likeEmptyIcon from '../assets/like-empty.svg'

const Wrapper = styled.div`
display: flex;
align-items: flex-start;
gap: 8px;
cursor: pointer;
`

const Text = styled.span`
color: var(--Neutral-neutral-white, #FFF);
font-variant-numeric: lining-nums tabular-nums;
font-feature-settings: 'cv04' on, 'cv03' on;
font-family: Lato;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 22.5px */
`

export type LikedProps = {
  count: number,
  isLiked?: boolean,
  onChange?: (value: boolean) => void,
  disabled?: boolean
}

const Likes = ({count, isLiked, onChange, disabled}: LikedProps) => (
  <Wrapper onClick={() => onChange?.(!isLiked)}>
    <img src={disabled ? likeDisabledIcon : isLiked ? likeFilledIcon : likeEmptyIcon} />
    <Text>{count}</Text>
  </Wrapper>
)

export default Likes;
