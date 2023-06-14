import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./page/home/Home";
import { Read } from "./page/read/Read";
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/read/:id"  element={<Read/>}></Route>
</Routes>
</BrowserRouter>
  );
}

export default App;
