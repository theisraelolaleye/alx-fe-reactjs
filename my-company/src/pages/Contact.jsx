import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 style={{ color: "#333" }}>Contact Us</h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          gap: "15px"
        }}
      >
        <input
          style={{ padding: "10px", fontSize: "16px" }}
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={{ padding: "10px", fontSize: "16px" }}
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          style={{ padding: "10px", fontSize: "16px" }}
          name="message"
          placeholder="Your Message"
          rows="4"
          value={form.message}
          onChange={handleChange}
        />

        <button
          type="button"
          style={{
            padding: "10px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
          onClick={() => alert("Form submitted (not really, demo only!)")}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
