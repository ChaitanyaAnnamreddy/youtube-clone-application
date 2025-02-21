import { Divider, Menu, Button } from 'antd'
import {
  HomeOutlined,
  PlayCircleOutlined,
  DesktopOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
  LikeOutlined,
  ScissorOutlined,
  FireOutlined,
  ShoppingOutlined,
  SoundOutlined,
  SpotifyOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCollapsed } from '../../utils/store/appSlice'
import { Link } from 'react-router'

const StyledDivider = styled(Divider)`
  background-color: rgba(255, 255, 255, 0.6);
`

const StyledMenu = styled(Menu)`
  background-color: rgb(0, 21, 41);
  color: white !important;

  .ant-menu-item-group-title {
    padding: 8px 26px;
    color: white !important;
  }

  &&&.ant-menu-light .ant-menu-item {
    color: white !important;
  }

  &&&.ant-menu-light .ant-menu-item-selected {
    color: #1677ff !important;
    background-color: rgba(255, 255, 255, 0.08) !important;
  }

  .ant-menu-item-disabled {
    padding-left: 16px !important;
    height: 6px !important;
  }

  .ant-menu-item-active {
    background-color: rgba(255, 255, 255, 0.08) !important;
  }
`
const StyledButton = styled(Button)`
  &&&.ant-btn-variant-solid {
    background-color: #001529;
  }

  &&&.ant-btn-primary {
    box-shadow: none;
  }
`

const items = [
  {
    key: '1',
    icon: (
      <Link to="/">
        <HomeOutlined />
      </Link>
    ),
    label: 'Home',
  },
  {
    key: '2',
    icon: (
      <Link to="/shorts/Ou6UMyShozg">
        <DesktopOutlined />
      </Link>
    ),
    label: 'Shots',
  },
  { key: '3', icon: <PlayCircleOutlined />, label: 'Subscription' },
  { key: 'custom-divider-1', label: <StyledDivider />, disabled: true }, // Styled Divider
  {
    key: 'g1',
    label: 'You',
    type: 'group',
    children: [
      { key: '5', icon: <HistoryOutlined />, label: 'History' },
      { key: '6', icon: <UnorderedListOutlined />, label: 'Playlist' },
      { key: '7', icon: <VideoCameraOutlined />, label: 'Your Videos' },
      { key: '8', icon: <ClockCircleOutlined />, label: 'Watch Later' },
      { key: '9', icon: <LikeOutlined />, label: 'Liked Videos' },
      { key: '10', icon: <ScissorOutlined />, label: 'Clips' },
    ],
  },
  { key: 'custom-divider-2', label: <StyledDivider />, disabled: true }, // Styled Divider
  {
    key: 'g2',
    label: 'Explore',
    type: 'group',
    children: [
      { key: '11', icon: <FireOutlined />, label: 'Trending' },
      { key: '12', icon: <ShoppingOutlined />, label: 'Shopping' },
      { key: '13', icon: <SoundOutlined />, label: 'Music' },
      { key: '14', icon: <SpotifyOutlined />, label: 'Podcasts' },
    ],
  },
]

const LeftNav = () => {
  const collapsed = useSelector((state) => state.app.collapsed)
  const dispatch = useDispatch()
  return (
    <>
      <div
        style={{
          width: collapsed ? '80px' : '200px',
          position: 'fixed',
          top: '16px',
          left: '0',
          height: 'calc(100vh - 16px)',
          background: 'rgb(0, 21, 41)',
          color: 'white',
          overflowY: 'auto',
          transition: 'width 0.4s ease',
        }}
      >
        <StyledButton
          type="primary"
          onClick={() => dispatch(toggleCollapsed(!collapsed))}
          style={{ marginBottom: 16, marginLeft: '10px' }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </StyledButton>
        <StyledMenu
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
    </>
  )
}

export default LeftNav
