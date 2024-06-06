"use client";

import React, { useState } from "react";
import axios from "axios";

import "@/styles/App.css";

function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(true); // Editable por defecto
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!isEditing) {
      // Aquí puedes agregar tu lógica para enviar los datos al servidor, por ejemplo:
      axios
        .post("/api/reservation", formData)
        .then((response) => {
          setSuccessMessage("Reservation successful!");
          setShowConfirmation(true);
        })
        .catch((error) => {
          setErrorMessage("Error occurred while making reservation.");
        });
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowConfirmation(false);
  };

  return (
    <div>
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={!isEditing}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={!isEditing}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={!isEditing}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          disabled={!isEditing}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          disabled={!isEditing}
        />
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min="1"
          required
          disabled={!isEditing}
        />
        {!showConfirmation ? (
          <>
            <button type="submit">{isEditing ? "Confirm" : "Reserve"}</button>
            {!isEditing && (
              <button type="button" onClick={handleEdit}>
                Edit
              </button>
            )}
          </>
        ) : (
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        )}
      </form>

      {showConfirmation && (
        <div className="confirmation">
          <h3>Reservation Details</h3>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p>
            <strong>Date:</strong> {formData.date}
          </p>
          <p>
            <strong>Time:</strong> {formData.time}
          </p>
          <p>
            <strong>Guests:</strong> {formData.guests}
          </p>
          <p>{successMessage}</p>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default ReservationForm;
