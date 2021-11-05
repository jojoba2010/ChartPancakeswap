import { chartInfoAction } from '../reducers'
import * as API from '../../../api'
export const setDataToChart = async (dispatch, token) => {
    let response = await API.getPriceForChart(token)
    console.log(response)
    let data = {
        updated_at: response.data.updated_at,
        price: response.data.data.price
    }
    console.log(data)
    dispatch(chartInfoAction.addToChart({
        value: data
    }))
}