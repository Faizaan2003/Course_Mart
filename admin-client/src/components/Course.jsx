import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { Loading } from "./Loading";
import { BASE_URL } from "../config.js";
import { courseState } from "../store/atoms/course";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  courseTitle,
  coursePrice,
  isCourseLoading,
  courseImage,
  coursePublished,
} from "../store/selectors/course";

function Course() {
  let { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin/course/${courseId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCourse({ isLoading: false, course: res.data.course });
      })
      .catch((e) => {
        setCourse({ isLoading: false, course: null });
      });
  }, []);

  if (courseLoading) {
    return <Loading />;
  }

  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        maxWidth: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);

  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(
    courseDetails.course.description
  );
  const [image, setImage] = useState(courseDetails.course.imageLink);
  const [price, setPrice] = useState(courseDetails.course.price);
  const [published, setPublished] = useState(courseDetails.course.published);

  // useEffect(() => {
  //   setTitle(courseDetails.course.title);
  //   setDescription(courseDetails.course.description);
  //   setImage(courseDetails.course.imageLink);
  //   setPrice(courseDetails.course.price);
  //   setPublished(courseDetails.course.published);
  // }, [courseDetails]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />
          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />
          <div style={{ marginBottom: "15px" }}>
            <Typography
              variant="subtitle1"
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              Published :
            </Typography>
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="trueFalse"
                value="true"
                checked={published === true}
                onChange={(event) => {
                  setPublished(event.target.value === "true");
                }}
              />
              <Typography
                variant="subtitle1"
                style={{ display: "inline-block" }}
              >
                True
              </Typography>
            </label>

            <label>
              <input
                type="radio"
                name="trueFalse"
                value="false"
                checked={published === false}
                onChange={(event) => {
                  setPublished(event.target.value === "true");
                }}
              />
              <Typography
                variant="subtitle1"
                style={{ display: "inline-block" }}
              >
                False
              </Typography>
            </label>
          </div>

          <Button
            variant="contained"
            onClick={async () => {
              axios.put(
                `${BASE_URL}/admin/courses/` + courseDetails.course._id,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published,
                  price,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              let updatedCourse = {
                _id: courseDetails.course._id,
                title: title,
                description: description,
                imageLink: image,
                published,
                price,
              };
              setCourse({ course: updatedCourse, isLoading: false });
              alert("course updated successfully");
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard() {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  const published = useRecoilValue(coursePublished);
  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={imageLink} style={{ width: 350 }} />
        <div style={{ marginLeft: 10 }}>
          <Typography style={{ textAlign: "center" }} variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1">
            {published ? "Successfully Published" : "Not Published yet"}
          </Typography>
          <Price />
        </div>
      </Card>
    </div>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);
  return (
    <>
      <Typography variant="subtitle1">
        <b>Rs: {price} </b>
      </Typography>
    </>
  );
}

export default Course;
