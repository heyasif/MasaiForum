import { Routes, Route } from "react-router-dom";
import NavBar from "../NavBar";

import SignInSide from "../components/SignIn";
import SignUp from "../components/SingUp";
import Private from "./Private";
import Home from "../components/Home";

const AllRoutes = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
