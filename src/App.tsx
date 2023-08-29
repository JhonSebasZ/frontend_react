import Home from "./Components/Home";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { UserProvider } from './Context/UserContext';
import ProductProvider from './Context/ProductContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <Home/>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
