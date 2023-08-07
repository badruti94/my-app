import { API, getConfig } from "../config/api"
import { setItem, setPage, setSearch } from "../redux/itemsSlice"

const fetchItems = async (dispatch) => {
    try {
        const config = await getConfig()
        const result = await API.get('/items', config)
        dispatch(setItem(result.data.data.items))
        dispatch(setPage(1))
        dispatch(setSearch(''))
    } catch (error) {
        console.log(error);
    }
}

export { fetchItems }