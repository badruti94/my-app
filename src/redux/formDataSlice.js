import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        id: '',
        name: '',
        stock: '',
        buyPrice: '',
        sellPrice: '',
        image: '',
        imgUrl: '',
    }
}

export const formDataSlice = createSlice({
    name: 'formData',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setFormData } = formDataSlice.actions

export default formDataSlice.reducer