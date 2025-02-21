import { useEffect } from 'react'
import { useParams } from 'react-router' // Fix: useParams should come from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../utils/store/videoComments'

// Corrected API call
const VideoComments = () => {
  const { id } = useParams() // Get videoId from URL params
  const dispatch = useDispatch()

  const videoComments = useSelector((state) => state.videoComments.items)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${id}&maxResults=15&key=${
            import.meta.env.VITE_YOUTUBE_API_KEY
          }`
        )
        const data = await response.json()
        dispatch(setItems(data.items))
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchComments()
  }, [dispatch, id])

  return (
    <section className="antialiased">
      <div className="mx-1">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            {videoComments?.length || 0} Comments
          </h2>
        </div>

        {/* Comment Input Box */}
        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="2"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900"
          >
            Post comment
          </button>
        </form>

        {/* Comments List */}
        {videoComments?.map((comment) => {
          const { id, snippet } = comment
          const topComment = snippet?.topLevelComment?.snippet

          return (
            <article key={id} className="p-4 text-base  rounded-lg">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    className="mr-2 w-6 h-6 rounded-full"
                    src={topComment?.authorProfileImageUrl}
                    alt={topComment?.authorDisplayName}
                  />
                  <p className="text-sm text-gray-900 dark:text-white font-semibold">
                    {topComment?.authorDisplayName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {new Date(topComment?.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400">
                {topComment?.textDisplay}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default VideoComments
