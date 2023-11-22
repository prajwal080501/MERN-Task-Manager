import { useContext, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { UserContext } from "./context/UserContext";
function App() {
  const { getUser, user } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }); // empty dependency arrays
  return (
    <div className="w-full h-full ">
      <Toaster />
      <Header />
      <Home />
    </div>
  );
}

export default App;
