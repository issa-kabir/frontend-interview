import "./App.css";
import { useState } from "react";
import Applications from "./Applications";
import Header from "./Header";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const handleSetPageNumber = (num: number) => {
    setPageNumber(num);
  }
  
  return (
    <div className="App">
      <Header pageNumber={pageNumber} />
      <Applications pageNumber={pageNumber} setPageNumber={handleSetPageNumber} />
    </div>
  );
}

export default App;
