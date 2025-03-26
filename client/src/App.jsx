import AuthenticatedApp from './pages/AuthenticatedApp';
import UnauthenticatedApp from './pages/UnauthenticatedApp';

function App() {
  const auth = true;
  return auth ? <AuthenticatedApp auth={auth}/> : <UnauthenticatedApp auth={auth}/>
}

export default App;
