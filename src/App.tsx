// import { AuthProvider } from "./context/Auth.Provider";
import { CharactersProvider } from "./context/Characters.Provider";
import Router from "./router";
import Header from "./components/Header";
function App() {
  return (
      // <AuthProvider>
        <CharactersProvider>
          <Header/>
          <Router/>
        </CharactersProvider>
      // </AuthProvider>
  );
}

export default App;
