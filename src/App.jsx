import { useEffect } from "react";
import { getCategories } from "./services/categoryService";

function App() {
  useEffect(() => {
    getCategories().then((data) => console.log(data));
  }, []);
  return <div>Hello</div>;
}

export default App;
