import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import "./Assets/css/styles.css"
import 'swiper/css';
import 'swiper/css/pagination';
import Manual from "./Pages/Manual";
import Templates from "./Pages/Templates";
import EditTemplate from "./Pages/EditTemplate";
import History from "./Pages/History";
import AddTemplate from "./Pages/AddTemplate";
import DetailHistory from "./Pages/DetailHistory";
import Profiles from "./Pages/Profiles";
import EditProfile from "./Pages/EditProfile";
import AddProfile from "./Pages/AddProfile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Homepage from "./Pages/Homepage";
import Pricing from "./Pages/Pricing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manual-job-proposal" element={<Manual />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/add/template" element={<AddTemplate />} />
          <Route path="/edit/template/:id" element={<EditTemplate />} />
          <Route path="/history" element={<History />} />
          <Route path="/history/details" element={<DetailHistory />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/edit/profile/:id" element={<EditProfile />} />
          <Route path="/add/profile" element={<AddProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
