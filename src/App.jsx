import { Provider } from 'react-redux'
import appStore from './utils/store/appStore'
import LayoutComponent from './Layout'

const App = () => {
  return (
    <Provider store={appStore}>
      <LayoutComponent style={{ minHeight: '100vh' }} />
    </Provider>
  )
}

export default App
