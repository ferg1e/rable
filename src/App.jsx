import Rable from './index.jsx'
import { data } from './data.js';
import './App.css'

function App() {
  return <Rable
      data={data}
      readOnly={false}
  />
}

export default App
