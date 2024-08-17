import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";
import axios from "axios";

function PublishedCourses() {
  const [courses, setCourses] = useState([]);

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/user/courses/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCourses(response.data.courses);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

export function Course({ course }) {
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

      <Button
        variant="contained"
        size="large"
        style={{ marginTop: "10px" }}
        onClick={async () => {
          try {
            const response = await axios.post(
              `${BASE_URL}/user/courses/${course._id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            alert(response.data.message);
          } catch (err) {
            alert(err.response.data.message);
          }
        }}
      >
        Buy
      </Button>
    </Card>
  );
}

export default PublishedCourses;
