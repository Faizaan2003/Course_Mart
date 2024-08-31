import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";
import axios from "axios";
import { Loading } from "../components/Loading.jsx";

function PurchasedCourses() {
  const [courses, setCourses] = useState([]);

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/user/purchasedCourses/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCourses(response.data.purchasedCourses);
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
      <img
        src={course.imageLink}
        style={{ width: "100%", height: "170px", objectFit: "cover" }}
      ></img>
      <Typography variant="subtitle1">{course.description}</Typography>
      <Typography variant="h6"> ₹ {course.price}</Typography>
    </Card>
  );
}

export default PurchasedCourses;
