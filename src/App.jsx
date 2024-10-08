import Rable from './index.jsx'
import { dataArrays, dataObjects } from './data.js';
import './App.css'

function App() {
  return <>
    <Rable data={dataArrays} readOnly={false}/>
    <br/><br/>
    <Rable data={dataObjects} readOnly={false}/>
  </>
}

export default App
