import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import configAxios from './api/axiosConfiguration'
const ChartTracing = lazy(() => import('./components/chart-tracing/ChartTracing'))
configAxios()
const App = () => {
  return (
    <Suspense fallback={<div></div>}>
      <BrowserRouter>
        <Routes>
          <Route path={"/chart-tracking"} element={<ChartTracing />} />
          <Route path={"/"} element={<ChartTracing />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App;
