import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/HomeCard"
import Word from "./pages/Word"
import BSOD from "./pages/BSOD"
import CustomCursor from "./components/common/CustomCursor"

function App() {

  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word" element={<Word />} />
        <Route path="/bsod" element={<BSOD />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
