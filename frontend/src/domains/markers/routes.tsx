import { Route, Routes } from "react-router-dom";
import MapPage from "./pages/Map/MapPage";

export default () => (
  <Routes>
    <Route path="/" element={<MapPage />} />
  </Routes>
)