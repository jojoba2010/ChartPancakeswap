import { useEffect, useState } from "react"
import { Line } from 'react-chartjs-2'
import { setDataToChart } from '../store/actions/chart'
import { useDispatch, useSelector } from 'react-redux'

const ChartTracking = () => {
    const dispatch = useDispatch()
    const { chartData } = useSelector(state => state.chartInfo)
    const [start, setStart] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
        let intervalId = null;
        if (start) {
            intervalId = setInterval(() => {
                setDataToChart(dispatch, token)
            }, 6000)
        }
        return () => clearInterval(intervalId);
    }, [start])

    const convertToStandardDateTime = (unix_timestamp) => {
        if (unix_timestamp === 0)
            return 0
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(unix_timestamp)
    }
    const data = {
        labels: chartData.map(label => convertToStandardDateTime(label.updated_at)),
        datasets: [
            {
                label: 'YOLO',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 2,
                pointHitRadius: 10,
                data: chartData.map(data => data.price)
            }
        ]
    };

    const tokenChange = (event) => {
        setToken(event.target.value)
    }
    const startHandler = () => {

        setStart(!start)
    }

    return <div>
        <label for='token'>Token : </label>
        <input
            id='token'
            type='text'
            onChange={tokenChange}
            value={token}
            autoFocus
            style={{ width: 340 }} />
        <button
            onClick={startHandler}
            disabled={token.length < 20 && !start}>{start ? 'Stop' : 'Start'} </button>
        <Line data={data} />
    </div>
}
export default ChartTracking