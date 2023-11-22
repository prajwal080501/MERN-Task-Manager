import Header from './components/Header'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast";
function App() {

  return (
    <div className="w-full h-full ">
      <Toaster />
      <Header />
      <Home />
    </div>
  )
}

export default App
