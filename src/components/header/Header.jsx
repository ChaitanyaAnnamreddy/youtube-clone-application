import { Layout, Button, Input, Flex } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { Image } from '@chakra-ui/react'
import YoutubeIcon from '../../assets/youtube.svg'
import { UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useSelector } from 'react-redux' // Import selector to get collapse state
import { Link } from 'react-router'

const { Header } = Layout
const { Search } = Input

const StyledButton = styled(Button)`
  &&&.ant-btn-variant-solid {
    background-color: #001529;
  }
  &&&.ant-btn-primary {
    box-shadow: none;
  }
`

const StyledHeader = styled(Header)`
  &&&.ant-layout-header {
    padding: 0px 10px !important;
    transition: margin-left 0.4s ease, width 0.4s ease; /* Smooth transition */
  }
`

const StyledSearch = styled(Search)`
  &&&.ant-input-group {
    border-start-start-radius: 16px !important;
    border-end-start-radius: 16px !important;
  }

  &&&.ant-input-outlined {
    background-color: hsla(0, 0%, 100%, 0.08);
  }

  .ant-btn {
    border-radius: 16px;
  }

  .ant-btn-variant-solid {
    background-color: hsla(0, 0%, 100%, 0.08);

    &:hover.ant-btn-variant-solid:not(:disabled):not(.ant-btn-disabled):hover {
      background-color: hsla(0, 0%, 100%, 0.16);
      border-color: transparent;
    }
  }
`

const HeaderBar = () => {
  const collapsed = useSelector((state) => state.app.collapsed) // Get collapsed state

  return (
    <StyledHeader
      style={{
        position: 'fixed',
        background: '#001529',
        color: 'white',
        width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)',
        zIndex: 100,
      }}
    >
      <Flex justify="space-between" align="center" style={{ marginTop: '6px' }}>
        <Link to="/">
          <Image
            src={YoutubeIcon}
            alt="Youtube Icon"
            cursor="pointer"
            width={50}
          />
        </Link>

        <StyledSearch
          placeholder="Search"
          enterButton
          style={{ maxWidth: '500px' }}
        />

        <Flex gap={'10px'} justify="center" style={{ marginRight: '20px' }}>
          <StyledButton type="primary" icon={<BellOutlined />} shape="circle" />
          <Button type="primary" icon={<UserOutlined />} shape="circle" />
        </Flex>
      </Flex>
    </StyledHeader>
  )
}

export default HeaderBar
