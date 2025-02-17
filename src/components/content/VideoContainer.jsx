import { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../../utils/constants'
import { Card, Flex } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setItems, clearItems } from '../../utils/store/youtubeVideoSlice'

const { Meta } = Card

const formatViewCount = (views) => {
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + 'M views'
  if (views >= 1_000) return (views / 1_000).toFixed(1) + 'K views'
  return views + ' views'
}

const timeAgo = (dateString) => {
  const date = new Date(dateString)
  const diff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24))
  return diff === 0 ? 'Today' : `${diff} days ago`
}

const VideoContainer = () => {
  const dispatch = useDispatch()
  const youtubeVideos = useSelector((state) => state.youtubeVideo.items)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(YOUTUBE_VIDEO_API)
      const data = await response.json()
      dispatch(setItems(data.items))
    }
    fetchVideos()

    return () => {
      dispatch(clearItems())
    }
  }, [dispatch])

  return (
    <Flex wrap="wrap" gap="large" align="center">
      {youtubeVideos.map((item, index) => (
        <Card
          hoverable
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          cover={
            hoveredIndex === index ? (
              <iframe
                width="460"
                height="270"
                src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            ) : (
              <img
                alt="youtube thumbnail"
                src={item.snippet.thumbnails.high.url}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )
          }
          style={{
            width: 320,
            cursor: 'pointer',
            height: 420,
            objectFit: 'cover',
            overflow: 'hidden',
            borderRadius: '16px',
            border: 'none',
            // background: 'none',
            color: 'white !important',
          }}
        >
          <Meta
            title={item.snippet.title}
            description={
              <div>
                <div>{item.snippet.channelTitle}</div>
                <div>
                  {formatViewCount(item.statistics.viewCount)} •{' '}
                  {timeAgo(item.snippet.publishedAt)}
                </div>
              </div>
            }
          />
        </Card>
      ))}
    </Flex>
  )
}
export default VideoContainer
