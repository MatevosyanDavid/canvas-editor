import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Paint from 'Pages/Paint';

import { routes } from 'Routes';

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
