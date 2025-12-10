// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  adminGetCourses,
  adminCreateCourse,
  adminUpdateCourse,
  adminDeleteCourse,
} from "../services/adminService";
import { createLecture } from "../services/lectureService";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [lectureOpen, setLectureOpen] = useState(false);
  const [lectureCourse, setLectureCourse] = useState(null);
  const [lectureForm, setLectureForm] = useState({
    title: "",
    videoUrl: "",
    content: "",
  });

  const load = async () => {
    try {
      const res = await adminGetCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
      showSnack("Failed to load", "error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const showSnack = (msg, sev = "success") =>
    setSnack({ open: true, message: msg, severity: sev });

  const submitCourse = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminUpdateCourse(editingId, form);
        showSnack("Course updated");
        setEditingId(null);
      } else {
        await adminCreateCourse(form);
        showSnack("Course created");
      }
      setForm({ title: "", description: "", instructor: "" });
      load();
    } catch (err) {
      console.error(err);
      showSnack("Failed", "error");
    }
  };

  const startEdit = (c) => {
    setEditingId(c._id);
    setForm({
      title: c.title,
      description: c.description,
      instructor: c.instructor,
    });
    window.scrollTo(0, 0);
  };
  const remove = async (id) => {
    if (!confirm("Delete course?")) return;
    await adminDeleteCourse(id);
    showSnack("Deleted");
    load();
  };

  // Lectures
  const openLecture = (course) => {
    setLectureCourse(course);
    setLectureOpen(true);
    setLectureForm({ title: "", videoUrl: "", content: "" });
  };
  const submitLecture = async () => {
    try {
      await createLecture(lectureCourse._id, lectureForm);
      showSnack("Lecture added");
      setLectureOpen(false);
      load();
    } catch (err) {
      console.error(err);
      showSnack("Failed to add lecture", "error");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Admin — Manage Courses
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={submitCourse}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <TextField
                label="Title"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <TextField
                label="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <TextField
                label="Instructor"
                value={form.instructor}
                onChange={(e) =>
                  setForm({ ...form, instructor: e.target.value })
                }
              />
              <Button type="submit" variant="contained">
                {editingId ? "Update" : "Create"}
              </Button>
              {editingId && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditingId(null);
                    setForm({ title: "", description: "", instructor: "" });
                  }}
                >
                  Cancel
                </Button>
              )}
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Stack spacing={2}>
        {courses.map((c) => (
          <Card key={c._id}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Typography variant="h6">{c.title}</Typography>
                <Typography variant="body2">{c.description}</Typography>
                <Typography variant="caption">
                  Instructor: {c.instructor}
                </Typography>
              </div>
              <div>
                <Button
                  sx={{ mr: 1 }}
                  variant="outlined"
                  onClick={() => startEdit(c)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ mr: 1 }}
                  variant="contained"
                  onClick={() => openLecture(c)}
                >
                  Add Lecture
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => remove(c._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Lecture Dialog */}
      <Dialog open={lectureOpen} onClose={() => setLectureOpen(false)}>
        <DialogTitle>Add Lecture to {lectureCourse?.title}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 400 }}>
            <TextField
              label="Title"
              value={lectureForm.title}
              onChange={(e) =>
                setLectureForm({ ...lectureForm, title: e.target.value })
              }
            />
            <TextField
              label="Video URL"
              value={lectureForm.videoUrl}
              onChange={(e) =>
                setLectureForm({ ...lectureForm, videoUrl: e.target.value })
              }
            />
            <TextField
              label="Content"
              multiline
              rows={4}
              value={lectureForm.content}
              onChange={(e) =>
                setLectureForm({ ...lectureForm, content: e.target.value })
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLectureOpen(false)}>Cancel</Button>
          <Button onClick={submitLecture} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

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
