import { configureStore } from '@reduxjs/toolkit'
import chartInfo from './reducers/chartInfo'

const store = configureStore({
    reducer: {
        chartInfo: chartInfo,
        // posts: postsReducer,
    },
})

export default store