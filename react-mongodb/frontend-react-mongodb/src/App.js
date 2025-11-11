// src/App.js
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Importamos useAuth
import ClientesManager from './components/ClientesManager';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'; // Asegúrate de que este import existe para los estilos

function App() {
  // Obtenemos la función logout de nuestro contexto de autenticación
  const { logout } = useAuth();
  // Obtenemos la función navigate para redirigir
  const navigate = useNavigate();

  // Creamos una función manejadora para el logout
  const handleLogout = () => {
    logout(); // Limpia el token
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <div className="App">
      <Routes>
        {/* Ruta pública para el login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta principal protegida */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <header className="app-header">
                <h1>Gestión de Clientes (Administrador)</h1>
                {/* Aquí está nuestro nuevo botón de Logout */}
                <button onClick={handleLogout} className="logout-button">
                  Cerrar Sesión
                </button>
              </header>
              <main>
                <ClientesManager />
              </main>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;