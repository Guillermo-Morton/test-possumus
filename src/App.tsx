import { AuthProvider } from "./context/Auth.Provider";
import { CharactersProvider } from "./context/Characters.Provider";
import Router from "./router";
function App() {
  return (
      <AuthProvider>
        <CharactersProvider>
          <Router/>
        </CharactersProvider>
      </AuthProvider>
  );
}

export default App;
