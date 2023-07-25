import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Login from './screens/Login';
import SubmitForm from './screens/Register';
import Logout from './screens/logout'
import Account from './screens/Account';
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <a href="/">Pipcorn</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:name" element={<ProductScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SubmitForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/account" element={<Account />} />
            

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;





