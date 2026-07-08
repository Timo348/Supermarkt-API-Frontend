import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Header from './components/Header.jsx';
import OffersPage from './pages/OffersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Laden...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<OffersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

export default App;
