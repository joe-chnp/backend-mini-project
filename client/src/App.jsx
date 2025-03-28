import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';
import { useAuth } from './contexts/authentication';

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp auth={auth.isAuthenticated}/> : <UnauthenticatedApp auth={auth.isAuthenticated}/>
}

export default App;
