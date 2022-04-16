import { Route, Routes } from "react-router";
import "./App.css";
import { BookDetails, Home, Search } from "./Pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
}


export default App;
