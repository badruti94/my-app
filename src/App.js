import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ItemPage from './pages/ItemPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/item",
    element: <ItemPage />
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
