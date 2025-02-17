import { Flex } from 'antd'
import ListCarousel from './ListCarousel'
import VideoContainer from './VideoContainer'

const Body = () => {
  return (
    <Flex
      vertical
      gap="small"
      style={{
        margin: '16px',
        color: 'white',
        position: 'relative',
        top: '50px',
      }}
    >
      <ListCarousel />
      <VideoContainer />
    </Flex>
  )
}

export default Body
