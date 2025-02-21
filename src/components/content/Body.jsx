import { Flex } from 'antd'
import ListCarousel from './ListCarousel'
import VideoContainer from './VideoContainer'
import Shorts from './Shorts'

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
      <Shorts />
    </Flex>
  )
}

export default Body
