import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState();
  const [published, setPublished] = useState();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          varint={"outlined"}
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            value={price}
            //placeholder="none"
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
            size={"large"}
            variant="contained"
            onClick={async () => {
              await axios.post(
                `${BASE_URL}/admin/courses`,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published,
                  price,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              alert("Added course!");

              setTitle("");
              setDescription("");
              setImage("");
              setPrice(0);
              setPublished(false);
            }}
          >
            Add course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
