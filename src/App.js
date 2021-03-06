import './styles/globalStyles.css'
import { BrowserRouter as Router } from 'react-router-dom'

import Header from './components/Header'
import Routes from './Routes'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;
