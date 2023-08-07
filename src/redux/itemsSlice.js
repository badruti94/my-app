import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
    filteredItems: [],
    page: 1,
    search: '',
}

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.value = action.payload
            state.filteredItems = action.payload
        },
        setFilteredItems: (state, action) => {
            state.filteredItems = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        },
    }
})

export const { setItem, setFilteredItems, setPage, setSearch } = itemsSlice.actions

export default itemsSlice.reducer