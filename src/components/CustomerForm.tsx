import React, { useState } from "react";
import axios from "axios";

const CustomerForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/customers", { name, email, address });
      setName("");
      setEmail("");
      setAddress("");
      // You can add a success message or redirect here
    } catch (error) {
      console.error("Error creating customer", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;