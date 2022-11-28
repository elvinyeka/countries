import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, ProtectedRoute, SharedLayout } from './pages';
import CountryDetail from './pages/countryDetail/CountryDetail';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#4158d0',
            color: '#fff',
          },
          error: {
            duration: 3000,
            theme: {
              primary: '#eb2f06',
              secondary: 'black',
            },
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/country/:countryId" element={<CountryDetail />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
