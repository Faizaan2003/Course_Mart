import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import UserAppBar from "./userComponents/UserAppBar.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Appbar from "./components/Appbar.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Courses from "./components/Courses";
import Course from "./components/Course";
import { Landing } from "./components/Landing.jsx";
import { userState } from "./store/atoms/user.js";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { BASE_URL } from "./config.js";
import { useEffect } from "react";
import Home from "./Home.jsx";
import { UserLanding } from "./userComponents/UserLanding.jsx";
import UserSignup from "./userComponents/UserSignup.jsx";
import UserSignin from "./userComponents/UserSignin.jsx";
import PublishedCourses from "./userComponents/PublishedCourses.jsx";
import PurchasedCourses from "./userComponents/PurchasedCourses.jsx";

function App() {
  return (
    <RecoilRoot>
      <div
        style={{
          maxWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: "#eeeeee",
        }}
      >
        <Router>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/user/*"} element={<UserRoutes />} />
            <Route path={"/admin/*"} element={<AdminRoutes />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitAdmin() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
      localStorage.setItem("alert", "true");
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
      if (localStorage.getItem("alert") == "true") {
        alert("Please log in!");
        navigate("/admin/signin");
      }
      navigate("/admin");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

function AdminRoutes() {
  const location = useLocation();
  return (
    <div>
      <Appbar />
      <InitAdmin />
      <Routes location={location} key={location.key}>
        <Route path={"/addcourse"} element={<AddCourse />} />
        <Route path={"/course/:courseId"} element={<Course />} />
        <Route path={"/courses"} element={<Courses />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/"} element={<Landing />} />
      </Routes>
    </div>
  );
}

function UserRoutes() {
  const location = useLocation();
  return (
    <div>
      <UserAppBar />
      <InitUser />
      <Routes location={location} key={location.key}>
        <Route path={"/"} element={<UserLanding />} />
        <Route path={"/signup"} element={<UserSignup />} />
        <Route path={"/signin"} element={<UserSignin />} />
        <Route path={"/courses"} element={<PublishedCourses />} />
        <Route path={"/purchasedcourses"} element={<PurchasedCourses />} />
      </Routes>
    </div>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const init = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
      localStorage.setItem("alert", "true");
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
      if (localStorage.getItem("alert") == "true") {
        alert("Please log in!");
        navigate("/user/signin");
      }
      navigate("/user");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
