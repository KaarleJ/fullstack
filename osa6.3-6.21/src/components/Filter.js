import { useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    filter === '' ? dispatch(newFilter(null)) : dispatch(newFilter(filter))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter