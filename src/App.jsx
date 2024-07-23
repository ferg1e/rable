import Rable from './index.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return <Rable
      data={[
        {
          'id': 1,
          'first': 'Jon',
          'last': 'Doe',
          'city': 'San Diego',
          'state': 'CA',
        },
        {
          'id': 2,
          'first': 'Bon',
          'last': 'Woe',
          'city': 'San Clemente',
          'state': 'CA',
        },
        {
          'id': 3,
          'first': 'Linda',
          'last': 'Watts',
          'city': 'New York',
          'state': 'NY',
        },
      ]}
  />
}

export default App
