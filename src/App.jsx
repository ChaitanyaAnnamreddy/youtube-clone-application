import { Provider } from 'react-redux'
import appStore from './utils/store/appStore'
import LayoutComponent from './Layout'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Body from './components/content/Body'
import WatchVideo from './components/content/WatchVideo'
import WatchShorts from './components/content/WatchShorts'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LayoutComponent />,
    errorElement: <div>Something went wrong</div>,
    children: [
      {
        path: '/',
        element: <Body />,
        errorElement: <div>Something went wrong</div>,
      },
      {
        path: '/watch/:id',
        element: <WatchVideo />,
        errorElement: <div>Something went wrong</div>,
      },
      {
        path: '/shorts/:id',
        element: <WatchShorts />,
        errorElement: <div>Something went wrong</div>,
      },
    ],
  },
])

const App = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  )
}

export default App
