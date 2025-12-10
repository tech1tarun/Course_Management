// src/pages/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { getMyCourses } from "../services/studentService";
import { Container, Typography, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  const load = async () => {
    try {
      const res = await getMyCourses();
      setCourses(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">My Courses</Typography>
      {courses.length === 0 ? (
        <Typography sx={{ mt: 2 }}>
          You are not enrolled in any course.
        </Typography>
      ) : (
        courses.map((c) => (
          <Card key={c._id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6">
                <Link to={`/courses/${c._id}`}>{c.title}</Link>
              </Typography>
              <Typography variant="body2">{c.description}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}
