/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../../utils/constants'
import { Card, Flex } from 'antd'
import { useDispatch } from 'react-redux'
import { setItems } from '../../utils/store/youtubeVideoSlice'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { useMediaQuery } from 'react-responsive'

const { Meta } = Card

const Body = styled(Meta)`
  .ant-card-meta-title {
    color: #f1f1f1 !important;
  }

  .ant-card-meta-description {
    color: #aaaaaa !important;
  }
`

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

const VideoContainer = ({ items }) => {
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(YOUTUBE_VIDEO_API)
      const data = await response.json()
      dispatch(setItems(data.items))
    }
    fetchVideos()

    // return () => {
    //   dispatch(clearItems())
    // }
  }, [dispatch])

  return (
    <Flex wrap="wrap" gap="large" align="center">
      {items.map((item, index) => (
        <Card
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => {
            navigate(`/watch/${item.id}`)
          }}
          cover={
            hoveredIndex === index ? (
              <iframe
                width="320"
                height="242"
                src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                allowfullscreen
              ></iframe>
            ) : (
              <img
                alt="youtube thumbnail"
                src={item.snippet.thumbnails.high.url}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  borderRadius: '16px',
                }}
              />
            )
          }
          style={{
            width: isTablet ? '250px' : isMobile ? '100%' : '320px',
            cursor: 'pointer',
            height: isTablet || isMobile ? '100%' : 350,
            objectFit: 'cover',
            overflow: 'hidden',
            borderRadius: '16px',
            border: 'none',
            background: 'none',
            color: 'white !important',
          }}
        >
          <Body
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

export const AdVideo = () => {
  return (
    <Flex>
      <VideoContainer />
    </Flex>
  )
}
export default VideoContainer
