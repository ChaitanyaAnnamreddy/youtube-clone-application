import styled from 'styled-components'
import { Button } from 'antd'
import { useSelector } from 'react-redux'

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
  z-index: 999;
`

const StyledButton = styled(Button)`
  flex: none;
  background-color: #102542;
  border: none;
  color: #fbffe5;
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`

const HorizontalScrollList = () => {
  const collapsed = useSelector((state) => state.app.collapsed)
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
    <ScrollContainer
      style={{
        width: `calc(100% - ${collapsed ? '80px' : '200px'})`,
      }}
    >
      {items.map((text, index) => (
        <StyledButton key={index}>{text}</StyledButton>
      ))}
    </ScrollContainer>
  )
}

export default HorizontalScrollList
