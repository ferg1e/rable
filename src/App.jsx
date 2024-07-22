import FluffyTable from './index.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return <FluffyTable
      data={[
        {
          'first': 'Jon',
          'last': 'Doe',
          'city': 'San Diego',
          'state': 'CA',
        },
        {
          'first': 'Bon',
          'last': 'Woe',
          'city': 'San Clemente',
          'state': 'CA',
        },
        {
          'first': 'Linda',
          'last': 'Watts',
          'city': 'New York',
          'state': 'NY',
        },
      ]}
  />
}

export default App
