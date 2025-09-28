import React, { useState } from "react";
import "./StudentForm.css";

function StudentForm() {
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    photo: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, photo: file }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FormData:", formData);
    alert("Form submitted! Check the console for data");
    setFormData({ rollNumber: "", name: "", photo: null });
    setPreview(null);
  };

  
  return (
    <div className="form-container">
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Photo:</label>
          <input
            type="file"
            name="photo"
            accept="image/*" //
            onChange={handleChange}
            required
          />
        </div>

        {preview && (
          <div className="preview-container">
            <strong>Preview: </strong>
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default StudentForm;

