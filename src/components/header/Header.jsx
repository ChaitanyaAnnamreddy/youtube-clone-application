import { Layout, Button, Input, Flex, Dropdown, Menu, Spin } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { Image } from '@chakra-ui/react'
import YoutubeIcon from '../../assets/youtube.svg'
import { UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { useMediaQuery } from 'react-responsive'
import { useState, useEffect } from 'react'
import { YOUTUBE_SEARCH_API } from '../../utils/constants'
import { SearchOutlined } from '@ant-design/icons'

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

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown {
    min-width: 340px !important;
  }
`

const HeaderBar = () => {
  const isTablet = useMediaQuery({ maxWidth: 768 })
  const isMobile = useMediaQuery({ maxWidth: 480 })

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleMenuClick = () => {
    setDropdownOpen(false)
  }

  useEffect(() => {
    const getSearchResults = async () => {
      if (!searchQuery) {
        setSearchResults([])
        return
      }

      setLoading(true)

      try {
        const response = await fetch(
          YOUTUBE_SEARCH_API + encodeURIComponent(searchQuery)
        )
        const jsonData = await response.json()

        if (jsonData.items) {
          setSearchResults(jsonData)
        } else {
          setSearchResults([])
        }
      } catch (error) {
        console.error('Error fetching search results:', error)
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }

    // Debounce API call
    const timer = setTimeout(() => {
      getSearchResults()
    }, 200)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const collapsed = useSelector((state) => state.app.collapsed)
  const items = searchResults?.items || []

  const menu = (
    <Menu onClick={handleMenuClick}>
      {loading ? (
        <Menu.Item key="loading">
          <Spin /> Searching...
        </Menu.Item>
      ) : items?.length > 0 ? (
        items.map((result) => (
          <Menu.Item key={result.id.videoId || result.id.channelId}>
            <Link to={`/watch/${result.id.videoId}`}>
              <span
                style={{
                  display: 'inline-block',
                  maxWidth: '310px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  verticalAlign: 'middle',
                }}
              >
                <SearchOutlined />
                {result.snippet.title}
              </span>
            </Link>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item key="no-results">No results found</Menu.Item>
      )}
    </Menu>
  )

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
        <StyledDropdown
          overlay={menu}
          trigger={['click']}
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
        >
          <StyledSearch
            allowClear
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            enterButton
            style={{ maxWidth: isTablet || isMobile ? '50%' : '400px' }}
          />
        </StyledDropdown>

        <Flex gap={'10px'} justify="center" style={{ marginRight: '20px' }}>
          <StyledButton type="primary" icon={<BellOutlined />} shape="circle" />
          <Button type="primary" icon={<UserOutlined />} shape="circle" />
        </Flex>
      </Flex>
    </StyledHeader>
  )
}

export default HeaderBar
