import { Button, Result } from 'antd'
import styled from 'styled-components'

const StyledResult = styled(Result)`
  margin-top: 100px;

  .ant-result-title {
    color: #f1f1f1 !important;
  }

  .ant-result-subtitle {
    color: #aaaaaa !important;
  }
`

const ErrorComponent = () => (
  <StyledResult
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" href="/">
        Back Home
      </Button>
    }
  />
)

export default ErrorComponent
