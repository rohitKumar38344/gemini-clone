import { Main } from "./components/Main/Main";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ContextProvider } from "./context/context";

function App() {
  return (
    <>
      <ContextProvider>
        <Sidebar />
        <Main />
      </ContextProvider>
    </>
  );
}

export default App;
