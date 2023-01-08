const Notice = ({ message }) => {
  const noticeStyle = {
    color: message.color,
    font: 20,
    backgroundColor: '#E7E1E0',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message.state === null) {
    return null
  }
  return (
    <div className='notification' style={noticeStyle}>
      {message.state}
    </div>

  )
}

export default Notice