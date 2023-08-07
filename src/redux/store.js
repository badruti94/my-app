import { configureStore } from '@reduxjs/toolkit'
import itemModalReducer from './itemModalSlice'
import itemsSliceReducer from './itemsSlice'
import formDataReducer from './formDataSlice'

export const store = configureStore({
    reducer: {
        itemModal: itemModalReducer,
        items: itemsSliceReducer,
        formData: formDataReducer,
    },
})