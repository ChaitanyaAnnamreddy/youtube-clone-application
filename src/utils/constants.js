const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

if (!API_KEY) {
  throw new Error('Missing YouTube API key in environment variables.')
}

export const YOUTUBE_VIDEO_API =
  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&key=' +
  API_KEY
