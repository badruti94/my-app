import { useDispatch, useSelector } from "react-redux"
import { Form, FormGroup, Input } from "reactstrap"
import { setFilteredItems, setSearch } from "../redux/itemsSlice"


const SearchItem = () => {
  const items = useSelector((state) => state.items.value)
  const search = useSelector((state) => state.items.search)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value))
    const newItems = items.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
    dispatch(setFilteredItems(newItems))
  }

  return (
    <Form className='mb-5'>
      <FormGroup>
        <Input
          id="search"
          name="search"
          placeholder="Search Item"
          type="text"
          value={search}
          onChange={handleChange}
          
        />
      </FormGroup>
    </Form>
  )
}

export default SearchItem