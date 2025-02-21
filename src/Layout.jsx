import HeaderBar from './components/header/Header'
import LeftNav from './components/left-nav/LeftNav'
import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import { Outlet } from 'react-router'

const { Sider, Content } = Layout

const LayoutComponent = () => {
  const collapsed = useSelector((state) => state.app.collapsed)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <LeftNav />
      </Sider>
      <Layout>
        <HeaderBar />
        <Content
          style={{
            margin: '64px 0px 0px',
            backgroundColor: 'rgb(0, 21, 41)',
            minHeight: '100%',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default LayoutComponent
