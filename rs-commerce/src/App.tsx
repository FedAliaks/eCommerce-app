import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import routes from 'utils/routes';
import Layout from 'components/layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<Layout>{route.component}</Layout>} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
