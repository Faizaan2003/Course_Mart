import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { isUserLoading } from "../store/selectors/isUserLoading.js";
import { BASE_URL } from "../config.js";
import axios from "axios";
import { userState } from "../store/atoms/user.js";

export const UserLanding = () => {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Welcome to CourseMart!</Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>
            {!userLoading && !userEmail && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/user/signup");
                    }}
                  >
                    Signup
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    onClick={() => {
                      navigate("/user/signin");
                    }}
                  >
                    Signin
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    style={{ marginLeft: "10px" }}
                    onClick={async () => {
                      const res = await axios.post(
                        `${BASE_URL}/user/login`,
                        {},
                        {
                          headers: {
                            username: "faizaan",
                            password: "123",
                            "Content-type": "application/json",
                          },
                        }
                      );
                      const data = res.data;
                      if (data.token) {
                        localStorage.setItem("token", data.token);
                        // window.location = "/"
                        setUser({
                          userEmail: "faizaan",
                          isLoading: false,
                        });
                        localStorage.setItem("alert", "true");
                        alert(
                          "Note : You are logged in with default credentials to explore application"
                        );
                        navigate("/user");
                      }
                    }}
                  >
                    Guest
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div></div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img
            src={
              "https://plus.unsplash.com/premium_photo-1721579535060-1cb020f041c2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            width={"100%"}
            style={{ objectFit: "cover" }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
