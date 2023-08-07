import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
    edit: false,
    id: 0,
}

export const itemModalSlice = createSlice({
    name: 'itemModal',
    initialState,
    reducers: {
        toggle: (state) => {
            state.value = !state.value
        },
        itemModalEdit: (state, action) => {
            state.edit = true
            state.id = action.payload
        },
        itemModalAdd: (state) => {
            state.edit = false
        }
    }
})

export const { toggle, itemModalAdd, itemModalEdit } = itemModalSlice.actions

export default itemModalSlice.reducer