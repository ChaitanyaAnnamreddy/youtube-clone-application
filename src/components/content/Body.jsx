import { Flex } from 'antd'
import ListCarousel from './ListCarousel'
import VideoContainer from './VideoContainer'
import Shorts from './Shorts'
import { useSelector } from 'react-redux'

const Body = () => {
  const youtubeVideos = useSelector((state) => state.youtubeVideo.items)
  const youtubeShorts = useSelector((state) => state.youtubeShorts.items)
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
      <VideoContainer items={youtubeVideos.slice(0, 8)} />
      <Shorts items={youtubeShorts.slice(0, 5)} />
      <VideoContainer items={youtubeVideos.slice(8, 12)} />
      <Shorts items={youtubeShorts.slice(5, 10)} />
      <VideoContainer items={youtubeVideos.slice(12, 20)} />
      <Shorts items={youtubeShorts.slice(10, 15)} />
    </Flex>
  )
}

export default Body
