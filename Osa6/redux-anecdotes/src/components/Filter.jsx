import { useDispatch } from "react-redux";
import { setFilter } from '../slices/filterSlice';

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    // input-kentän arvo muuttujassa event.target.value
    console.log(e.target.value);

    dispatch(setFilter(e.target.value))
    
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