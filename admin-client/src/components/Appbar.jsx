import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user.js";
import { userEmailState } from "../store/selectors/userEmail";
import { Loading } from "./Loading.jsx";

function Appbar({}) {
  const navigate = useNavigate();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);

  if (userLoading) {
    return <Loading />;
  }

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>CourseMart</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/admin/addcourse");
                }}
              >
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/admin/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                localStorage.removeItem("alert");
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>CourseMart</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/admin/signup");
              }}
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/admin/signin");
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
