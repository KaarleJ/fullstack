import { Alert } from 'react-bootstrap'

const Notice = ({ message }) => {
  if (message.state === null) {
    return null
  }
  let variant=''
  if ( message.color === 'green' ) {
    variant = 'success'
  } else if (message.color === 'red') {
    variant = 'danger'
  }
  return (
    <Alert variant={variant}>
      {message.state}
    </Alert>
  )
}

export default Notice
