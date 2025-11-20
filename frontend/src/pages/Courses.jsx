import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getCourses as apiGetCourses,
  createCourse as apiCreateCourse,
  updateCourse as apiUpdateCourse,
  deleteCourse as apiDeleteCourse,
} from "../services/courseService";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // form
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
  });
  const [editingId, setEditingId] = useState(null);

  // UI
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await apiGetCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
      showSnack("Failed to load courses", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const showSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiUpdateCourse(editingId, form);
        showSnack("Course updated", "success");
        setEditingId(null);
      } else {
        await apiCreateCourse(form);
        showSnack("Course created", "success");
      }
      setForm({ title: "", description: "", instructor: "" });
      loadCourses();
    } catch (err) {
      console.error(err);
      showSnack("Operation failed", "error");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await apiDeleteCourse(toDeleteId);
      showSnack("Course deleted", "success");
      setConfirmOpen(false);
      setToDeleteId(null);
      loadCourses();
    } catch (err) {
      console.error(err);
      showSnack("Delete failed", "error");
    }
  };

  // DataGrid columns
  const columns = useMemo(
    () => [
      { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
      {
        field: "description",
        headerName: "Description",
        flex: 2,
        minWidth: 200,
      },
      { field: "instructor", headerName: "Instructor", flex: 1, minWidth: 140 },
      {
        field: "actions",
        headerName: "Actions",
        width: 180,
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          const row = params.row;
          return (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                color="warning"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEdit(row)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => confirmDelete(row._id)}
              >
                Delete
              </Button>
            </Stack>
          );
        },
      },
    ],
    []
  );

  // Prepare rows for DataGrid (DataGrid expects `id` field)
  const rows = courses.map((c) => ({
    id: c._id,
    _id: c._id,
    title: c.title,
    description: c.description,
    instructor: c.instructor,
  }));

  // client-side quick filter (search)
  const filteredRows = rows.filter((r) => {
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return (
      String(r.title || "")
        .toLowerCase()
        .includes(q) ||
      String(r.description || "")
        .toLowerCase()
        .includes(q) ||
      String(r.instructor || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Manage Courses
      </Typography>

      {/* Form */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
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
                sx={{ minWidth: 240 }}
              />
              <TextField
                label="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                sx={{ minWidth: 300 }}
              />
              <TextField
                label="Instructor"
                value={form.instructor}
                onChange={(e) =>
                  setForm({ ...form, instructor: e.target.value })
                }
                sx={{ minWidth: 200 }}
              />

              <Button
                type="submit"
                variant="contained"
                color={editingId ? "warning" : "primary"}
              >
                {editingId ? "Update" : "Add Course"}
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

      {/* Controls: search */}
      <Box
        sx={{ mb: 2, display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <TextField
          placeholder="Search by title, description or instructor..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ width: 400 }}
          size="small"
        />
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          paginationModel={{ pageSize: 10 }}
          loading={loading}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 200 },
            },
          }}
        />
      </Box>

      {/* Delete confirmation */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this course? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
