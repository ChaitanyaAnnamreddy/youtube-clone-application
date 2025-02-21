import { Flex, Button } from 'antd'
import { useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'

// Action to update like/dislike in Redux (optional, if you want to persist state)
const updateVideoLikes = (videoId, likes) => {
  return { type: 'UPDATE_VIDEO_LIKES', payload: { videoId, likes } }
}

const WatchShorts = () => {
  const params = useParams()
  const youtubeShorts = useSelector((state) => state.youtubeShorts.items)
  const dispatch = useDispatch()

  // Find the specific video matching params.id to initialize like count
  const video = youtubeShorts.find((item) => item.id === params.id)
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
    const video = youtubeShorts.find((item) => item.id === params.id)
    const newLikeCount = video?.statistics?.likeCount || 0
    setLikeCount(newLikeCount)
    setUserLiked(false) // Reset user interaction on video change
  }, [params.id, youtubeShorts])

  // Format view count
  const formatViewCount = (views) => {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + 'M views'
    if (views >= 1_000) return (views / 1_000).toFixed(1) + 'K views'
    return views + ' views'
  }

  // Find video data for rendering
  const currentVideo = youtubeShorts.find((item) => item.id === params.id) || {}

  return (
    <Flex
      style={{
        margin: '1% 35%',
        padding: '16px',
        backgroundColor: 'transparent',
        borderRadius: '8px',
      }}
      gap="25px"
    >
      <div>
        {params && (
          <iframe
            width="100%"
            height="600px"
            style={{ borderRadius: '16px' }}
            src={`https://www.youtube.com/embed/${params.id}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
          ></iframe>
        )}
      </div>

      <Flex gap="small">
        <Flex gap="small" align="center" vertical justify='center'>
          <Button
            icon={<span>👍</span>}
            style={{
              borderRadius: '16px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              border: 'none',
            }}
            onClick={handleLike}
          >
            {formatCount(likeCount)}
          </Button>
          <Button
            icon={<span>↗</span>}
            style={{ borderRadius: '16px' }}
          ></Button>
          <Button
            icon={<span>↓</span>}
            style={{ borderRadius: '16px' }}
          ></Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default WatchShorts
