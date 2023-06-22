import "./App.scss";
import AppRouter from "./routes/AppRouter";
import { roles } from "./constants/constantFunction";
import Header from "./app/components/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function App() {
  let location = useLocation();

  const [headerImage, setHeaderImage] = useState("");

  return (
    <div className="App">
      {location.pathname !== "/login" && <Header headerImage={headerImage} />}
      <AppRouter roles={() => roles()} setHeaderImage={setHeaderImage} />
    </div>
  );
}

export default App;
