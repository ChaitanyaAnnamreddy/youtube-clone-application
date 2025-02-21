import { Flex, Button } from 'antd'
import { useParams } from 'react-router'
import { Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import {
  ShareAltOutlined,
  DownloadOutlined,
  LikeOutlined,
} from '@ant-design/icons'
import VideoRecommendation from './VideoRecommendation'
import VideoComments from './VideoComments'
import { useMediaQuery } from 'react-responsive'

// Action to update like/dislike in Redux (optional, if you want to persist state)
const updateVideoLikes = (videoId, likes) => {
  return { type: 'UPDATE_VIDEO_LIKES', payload: { videoId, likes } }
}

const WatchVideo = () => {
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' })
  console.log('isMobile', isMobile)
  const params = useParams()
  const dispatch = useDispatch()

  const youtubeVideo = useSelector((state) => state.youtubeVideo.items)
  // Find the specific video matching params.id to initialize like count
  const video = youtubeVideo.find((item) => item.id === params.id)
  const initialLikes = video?.statistics?.likeCount || 0

  const [userLiked, setUserLiked] = useState(false) // Track if user has liked
  const [likeCount, setLikeCount] = useState(initialLikes) // Total likes

  // Format large numbers (e.g., 1,000 → 1K, 1,000,000 → 1M)
  const formatCount = (count) => {
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + 'M'
    if (count >= 1_000) return (count / 1_000).toFixed(1) + 'K'
    return count.toString()
  }

  // Handle like button click
  const handleLike = () => {
    if (userLiked) {
      // Undo like (user unlikes)
      setLikeCount(likeCount - 1)
      setUserLiked(false)
    } else {
      // Add like
      setLikeCount(likeCount + 1)
      setUserLiked(true)
    }
    // Optionally dispatch to Redux or API here
    dispatch(updateVideoLikes(params.id, likeCount))
  }

  // Ensure state updates when youtubeVideo or params.id changes
  useEffect(() => {
    const video = youtubeVideo.find((item) => item.id === params.id)
    const newLikeCount = video?.statistics?.likeCount || 0
    setLikeCount(newLikeCount)
    setUserLiked(false) // Reset user interaction on video change
  }, [params.id, youtubeVideo])

  // Format view count
  const formatViewCount = (views) => {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + 'M views'
    if (views >= 1_000) return (views / 1_000).toFixed(1) + 'K views'
    return views + ' views'
  }

  // Find video data for rendering
  const currentVideo = youtubeVideo.find((item) => item.id === params.id) || {}

  return (
    <Flex
      style={{
        marginTop: '10px',
        padding: '16px',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        width: '100%',
      }}
    >
      <Flex vertical style={{ width: isTablet ? '100%' : '65%' }}>
        <div
          style={{
            height: isMobile ? '200px' : '500px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {params && (
            <iframe
              width="100%"
              height="530px"
              style={{ borderRadius: '16px' }}
              src={`https://www.youtube.com/embed/${params.id}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
            ></iframe>
          )}
        </div>

        <Flex
          gap="small"
          vertical
          style={{ marginTop: isMobile ? '60%' : '3%' }}
        >
          <Text textStyle="lg" fontWeight="bold" style={{ color: 'white' }}>
            {currentVideo.snippet?.title || 'Video Title Not Available'}
          </Text>
          <Flex
            justify="space-between"
            style={{
              display: isMobile ? 'flex' : 'flex',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <Flex vertical>
              <Text textStyle="sm" style={{ color: '#aaa' }}>
                {currentVideo.snippet?.channelTitle || 'Channel Not Available'}
              </Text>
              <Text textStyle="sm" style={{ color: '#aaa' }}>
                {formatViewCount(currentVideo.statistics?.viewCount || 0)}
              </Text>
            </Flex>
            <Flex gap="small" align="center">
              <Button
                icon={<LikeOutlined />}
                style={{
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: 'none',
                }}
                onClick={handleLike}
              >
                {userLiked ? 'Liked' : 'Like'} ({formatCount(likeCount)})
              </Button>
              <Button
                icon={<ShareAltOutlined />}
                style={{
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: 'none',
                }}
              >
                {isMobile ? <></> : 'Share'}
              </Button>
              <Button
                icon={<DownloadOutlined />}
                style={{
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: 'none',
                }}
              >
                {isMobile ? <></> : 'Download'}
              </Button>
            </Flex>
          </Flex>
        </Flex>
        <VideoComments />
      </Flex>
      <Flex
        vertical
        style={{
          width: isMobile ? '100%' : '35%',
          display: isTablet ? 'none' : 'flex',
        }}
      >
        <VideoRecommendation items={youtubeVideo} id={params.id} />
      </Flex>
    </Flex>
  )
}

export default WatchVideo
