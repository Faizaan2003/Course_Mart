import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import { BASE_URL } from "../config.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";

function UserSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div
        style={{
          paddingTop: 110,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to CourseMart. Sign in below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(evant11) => {
              let elemt = evant11.target;
              setEmail(elemt.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />

          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              try {
                const res = await axios.post(
                  `${BASE_URL}/user/login`,
                  {},
                  {
                    headers: {
                      username: email,
                      password: password,
                      "Content-type": "application/json",
                    },
                  }
                );
                const data = res.data;

                if (data.token) {
                  localStorage.setItem("token", data.token);
                  // window.location = "/"
                  setUser({
                    userEmail: email,
                    isLoading: false,
                  });
                  navigate("/user");
                  localStorage.setItem("alert", "true");
                }
              } catch (err) {
                alert(err.response.data.message);
                navigate("/user/signin");
              }
            }}
          >
            {" "}
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default UserSignin;
