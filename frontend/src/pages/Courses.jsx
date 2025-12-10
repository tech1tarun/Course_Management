// src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import { API } from "../api";
import { Link } from "react-router-dom";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const load = async () => {
    try {
      const res = await API.get("/api/courses");
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to load courses", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Courses
      </Typography>
      <Grid container spacing={2}>
        {courses.map((c) => (
          <Grid item xs={12} md={6} lg={4} key={c._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  <Link to={`/courses/${c._id}`}>{c.title}</Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {c.description}
                </Typography>
                <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                  Instructor: {c.instructor}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
