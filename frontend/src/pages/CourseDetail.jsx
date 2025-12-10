// src/pages/CourseDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";
import {
  enrollCourse,
  getLecturesForStudentCourse,
} from "../services/studentService";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const load = async () => {
    try {
      const res = await API.get(`/api/courses/${id}`);
      setCourse(res.data);
    } catch (err) {
      console.error(err);
    }
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.enrolledCourses && user.enrolledCourses.includes(id)) {
      setEnrolled(true);
      await loadLectures();
    }
  };

  const loadLectures = async () => {
    try {
      const res = await getLecturesForStudentCourse(id);
      setLectures(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await enrollCourse(id);
      // update localUser copy
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user) {
        user.enrolledCourses = user.enrolledCourses || [];
        if (!user.enrolledCourses.includes(id)) user.enrolledCourses.push(id);
        localStorage.setItem("user", JSON.stringify(user));
      }
      setEnrolled(true);
      setSnack({
        open: true,
        message: "Enrolled successfully",
        severity: "success",
      });
      loadLectures();
    } catch (err) {
      console.error(err);
      setSnack({
        open: true,
        message: err.response?.data?.message || "Enroll failed",
        severity: "error",
      });
    }
  };

  if (!course)
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{course.title}</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        {course.description}
      </Typography>
      <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
        Instructor: {course.instructor}
      </Typography>

      <div style={{ marginTop: 16 }}>
        {!enrolled ? (
          <Button variant="contained" onClick={handleEnroll}>
            Enroll
          </Button>
        ) : (
          <Typography>You are enrolled</Typography>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <Typography variant="h6">Lectures</Typography>
        {lectures.length === 0 ? (
          <Typography>No lectures available.</Typography>
        ) : (
          lectures.map((l) => (
            <Card key={l._id} sx={{ mt: 1 }}>
              <CardContent>
                <Typography variant="subtitle1">{l.title}</Typography>
                {l.videoUrl && (
                  <a href={l.videoUrl} target="_blank" rel="noreferrer">
                    Open Video
                  </a>
                )}
                <Typography variant="body2">{l.content}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
