/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { YOUTUBE_VIDEO_API } from '../../utils/constants'
import { Flex, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { setItems } from '../../utils/store/youtubeVideoSlice'
import styled from 'styled-components'
import { useNavigate } from 'react-router'

const { Title, Text } = Typography

const StyledCard = styled.div`
  display: flex;
  align-items: flex-start;
  width: 400px;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  padding: 10px 0px 0px 10px;
  // background: #121212;
  transition: background 0.3s;
`

const ThumbnailWrapper = styled.div`
  width: 160px;
  height: 90px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border-radius: 8px;
  }
`

const MetaWrapper = styled.div`
  flex: 1;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const VideoRecommendation = ({ items }) => {
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
  }, [dispatch])

  return (
    <Flex wrap="wrap" gap="large" align="start">
      {items.map((item, index) => (
        <StyledCard
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => navigate(`/watch/${item.id}`)}
        >
          {/* Thumbnail Section */}
          <ThumbnailWrapper>
            {hoveredIndex === index ? (
              <iframe
                src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                allowfullscreen
              />
            ) : (
              <img
                alt="youtube thumbnail"
                src={item.snippet.thumbnails.medium.url}
              />
            )}
          </ThumbnailWrapper>

          {/* Metadata Section */}
          <MetaWrapper>
            <Title level={5} style={{ color: '#f1f1f1', marginBottom: '4px' }}>
              {item.snippet.title.length > 50
                ? item.snippet.title.substring(0, 50) + '...'
                : item.snippet.title}
            </Title>
            <Text style={{ color: '#aaaaaa', fontSize: '12px' }}>
              {item.snippet.channelTitle}
            </Text>
          </MetaWrapper>
        </StyledCard>
      ))}
    </Flex>
  )
}

export default VideoRecommendation
