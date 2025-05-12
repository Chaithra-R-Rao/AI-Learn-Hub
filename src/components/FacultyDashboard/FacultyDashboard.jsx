import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FacultyDashboard.css";
const FacultyDashboard = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [courses, setCourses] = useState([]);
  const [author, setAuthor] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const formRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      setAuthor(user.name);
    } else {
      toast.error("No logged-in user found. Please log in.");
    }
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get("http://localhost:5000/courses")
      .then((res) => setCourses(res.data))
      .catch(() => toast.error("Failed to fetch courses."));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse((prev) => ({ ...prev, image: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course.title || !course.description || !course.price || !course.image) {
      toast.warning("All fields are required.");
      return;
    }

    const payload = {
      title: course.title,
      description: course.description,
      price: course.price,
      author,
      image: course.image,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/courses/${editingId}`, payload);
        toast.success("Course updated successfully!");
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/courses", payload);
        toast.success("Course added successfully!");
      }

      setCourse({ title: "", description: "", price: "", image: null });
      setPreview(null);
      fetchCourses();
    } catch (error) {
      toast.error("Failed to save course.");
    }
  };

  const handleEdit = (course) => {
    setCourse({
      title: course.title,
      description: course.description,
      price: course.price,
      image: course.image,
    });
    setPreview(course.image);
    setEditingId(course.id);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/courses/${courseToDelete}`);
      toast.success("Course deleted successfully!");
      fetchCourses();
    } catch {
      toast.error("Failed to delete course.");
    } finally {
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div ref={formRef}>
        <h2 className="text-center text-primary mb-3">
          {editingId ? "Editing Course" : "Add New Course"}
        </h2>

        <form onSubmit={handleSubmit} className="faculty-dashboard p-4 shadow-lg rounded bg-light">
          <div className="mb-3">
            <label className="form-label">Course Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={course.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={course.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Price ($)</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={course.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Course Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input type="text" className="form-control" value={author} disabled />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editingId ? "Update Course" : "Add Course"}
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h4 className="mb-3">Your Courses</h4>
        <div className="row">
          {courses.filter((c) => c.author === author).length === 0 ? (
            <p>You have not added any courses yet.</p>
          ) : (
            courses
              .filter((c) => c.author === author)
              .map((c) => (
                <div className="col-md-4 mb-4" key={c.id}>
                  <div className="card h-100 shadow-sm">
                    {c.image && (
                      <img
                        src={c.image}
                        className="card-img-top"
                        alt="Course"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{c.title}</h5>
                      <p className="card-text">{c.description}</p>
                      <p className="card-text"><strong>Price:</strong> ${c.price}</p>
                      <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-warning px-4" onClick={() => handleEdit(c)}>Edit</button>
                        <button className="btn btn-danger px-4" onClick={() => handleDeleteClick(c.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this course?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyDashboard;
