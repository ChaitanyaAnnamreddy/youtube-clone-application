import styled from 'styled-components'
import { Button } from 'antd'

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px 0;
  gap: 8px;
  scrollbar-width: none; /* Hide scrollbar for Firefox */
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
  position: fixed;
  top: 60px;
  left: 200px;
  z-index: 999;
`

const StyledButton = styled(Button)`
  flex: none;
  background-color: hsla(0, 0%, 100%, 0.08);
  border: none;
  color: white;
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`

const HorizontalScrollList = () => {
  const items = [
    'All',
    'Brahmanandam',
    'Music',
    'Mass films',
    'Daggubati Venkatesh',
    'Shruti Haasan',
    'News',
    'Romantic comedies',
    'Podcasts',
    'Indian Premier League',
    'Mass films',
    'Daggubati Venkatesh',
    'Shruti Haasan',
    'News',
    'Romantic comedies',
  ]

  return (
    <ScrollContainer>
      {items.map((text, index) => (
        <StyledButton key={index}>{text}</StyledButton>
      ))}
    </ScrollContainer>
  )
}

export default HorizontalScrollList
