import { Provider } from 'react-redux'
import appStore from './utils/store/appStore'
import LayoutComponent from './Layout'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Body from './components/content/Body'
import WatchVideo from './components/content/WatchVideo'
import WatchShorts from './components/content/WatchShorts'
import ErrorComponent from './components/ErrorComponent'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LayoutComponent />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/',
        element: <Body />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/watch/:id',
        element: <WatchVideo />,
        errorElement: <ErrorComponent />,
      },
      {
        path: '/shorts/:id',
        element: <WatchShorts />,
        errorElement: <ErrorComponent />,
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
