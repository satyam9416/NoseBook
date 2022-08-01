
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/authreducer'
import { shareReducer } from './reducers/shareReducer'
import { getTimelinePostReducer } from './reducers/getPostReducer'
import { updateDataReducer } from './reducers/updateDataReducer'

export const store = configureStore({
    reducer: {
        authReducer,
        shareReducer,
        getTimelinePostReducer,
        updateDataReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})