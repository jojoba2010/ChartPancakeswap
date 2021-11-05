import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    chartData: [{
        updated_at: 0,
        price: 0
    }]
}
const chartInfoSlice = createSlice({
    name: 'chartInfo',
    initialState,
    reducers: {
        addToChart(state, action) {
            state.chartData = [...state.chartData, { ...action.payload.value }]
        }
    }
})
export const chartInfoAction = chartInfoSlice.actions
export default chartInfoSlice.reducer