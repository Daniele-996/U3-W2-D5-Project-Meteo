import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNavbar from "./component/MyNavbar";
import Footer from "./component/Footer";
import Home from "./component/Home";
import Details from "./component/Details";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [goToDetails, setGoToDetails] = useState(false);

  useEffect(() => {
    if (goToDetails) {
      const timeout = setTimeout(() => setGoToDetails(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [goToDetails]);

  return (
    <Router>
      {goToDetails && <Navigate to="/details" replace />}
      <MyNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              city={city}
              setCity={setCity}
              setLat={setLat}
              setLon={setLon}
              setGoToDetails={setGoToDetails}
            />
          }
        />
        <Route
          path="/details"
          element={<Details lat={lat} lon={lon} city={city} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
