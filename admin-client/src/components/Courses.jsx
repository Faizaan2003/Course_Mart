import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";
import axios from "axios";
import { userEmailState } from "../store/selectors/userEmail.js";
import { useRecoilValue } from "recoil";
import { Loading } from "./Loading.jsx";

function Courses() {
  const [courses, setCourses] = useState([]);

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/admin/courses/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCourses(response.data.courses);
  };

  useEffect(() => {
    init();
  }, []);

  if (courses.length == 0) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return (
          <Course course={course} setCourses={setCourses} courses={courses} />
        );
      })}
    </div>
  );
}

export function Course({ course, setCourses, courses }) {
  const userEmail = useRecoilValue(userEmailState);
  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        //minHeight: 200,
        padding: 20,
        textAlign: "center",
      }}
    >
      <Typography variant="h5">{course.title}</Typography>
      <Typography variant="subtitle1">{course.description}</Typography>
      <img
        src={course.imageLink}
        style={{ width: "100%", height: "170px", objectFit: "cover" }}
      ></img>
      <Typography variant="h6"> ₹ {course.price}</Typography>
      <Typography variant="h6">
        {course.published ? "Published Successfully!" : "Not yet published!"}
      </Typography>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          size="large"
          style={{ marginTop: "10px" }}
          onClick={() => {
            window.location = "/admin/course/" + course._id;
          }}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          size="large"
          style={{ marginTop: "10px" }}
          onClick={async () => {
            if (userEmail == "faizaan") {
              alert("you can't delete with default credentials!");
            } else {
              try {
                const response = await axios.delete(
                  `${BASE_URL}/admin/delete/${course._id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                alert(response.data.message);
                setCourses(
                  courses.filter((course1) => course1._id !== course._id)
                );
              } catch (err) {
                alert(err.response.data.message);
              }
            }
          }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
