/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { YOUTUBE_SHORTS_API } from '../../utils/constants'
import { Card, Flex } from 'antd'
import { useDispatch } from 'react-redux'
import { setItems } from '../../utils/store/youtubeShortsSlice'
import styled from 'styled-components'
import { Text } from '@chakra-ui/react'
import shortsIcon from '../../assets/youtube-shorts.svg'
import { useNavigate } from 'react-router'

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

const Shorts = ({ items }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(YOUTUBE_SHORTS_API)
      const data = await response.json()
      dispatch(setItems(data.items))
    }
    fetchVideos()
  }, [dispatch])

  return (
    <>
      <Flex gap="small">
        <img src={shortsIcon} alt="" />
        <Text textStyle="xl" fontWeight="bold">
          Shorts
        </Text>
      </Flex>
      <Flex gap="large" align="center">
        {items.map((item, index) => (
          <Card
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            cover={
              hoveredIndex === index ? (
                <iframe
                  width="320"
                  height="350px"
                  src={`https://www.youtube.com/embed/${item.id}?autoplay=1&mute=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                ></iframe>
              ) : (
                <img
                  alt="youtube thumbnail"
                  src={item.snippet.thumbnails.high.url}
                  style={{
                    width: '320',
                    height: '350px',
                    objectFit: 'cover',
                    borderRadius: '16px',
                  }}
                />
              )
            }
            onClick={() => {
              navigate(`/shorts/${item.id}`)
            }}
            style={{
              width: 320,
              cursor: 'pointer',
              height: 450,
              objectFit: 'fill',
              overflow: 'hidden',
              borderRadius: '16px',
              border: 'none',
              background: 'none',
              color: 'white !important',
            }}
          >
            <Body
              title={item.snippet.title}
              description={formatViewCount(item.statistics.viewCount)}
            />
          </Card>
        ))}
      </Flex>
    </>
  )
}
export default Shorts
