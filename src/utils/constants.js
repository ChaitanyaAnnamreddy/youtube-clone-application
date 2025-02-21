export const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

if (!API_KEY) {
  throw new Error('Missing YouTube API key in environment variables.')
}

export const YOUTUBE_VIDEO_API =
  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=10&maxResults=20&regionCode=IN&videoDuration=short&key=' +
  API_KEY

export const YOUTUBE_SHORTS_API =
  'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=23&maxResults=20&regionCode=IN&videoDuration=short&key=' +
  API_KEY

export const VIDEO_COMMENT_API =
  'https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&key=${API_KEY}'

// export const YOUTUBE_SEARCH_API =
//   'https://thingproxy.freeboard.io/fetch/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='

export const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&key=${API_KEY}&q=`
