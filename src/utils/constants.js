const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

if (!API_KEY) {
  throw new Error('Missing YouTube API key in environment variables.')
}

export const YOUTUBE_VIDEO_API =
  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=10&maxResults=8&videoDuration=short&key=' +
  API_KEY

export const YOUTUBE_SHORTS_API =
  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=23&maxResults=6&regionCode=US&videoDuration=short&key=' +
  API_KEY
