

// import { useState } from "react";

// function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div>
//       <h1 style={{ color: "#333" }}>Contact Us</h1>

//       <form
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           maxWidth: "400px",
//           gap: "15px"
//         }}
//       >
//         <input
//           style={{ padding: "10px", fontSize: "16px" }}
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={form.name}
//           onChange={handleChange}
//         />

//         <input
//           style={{ padding: "10px", fontSize: "16px" }}
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={form.email}
//           onChange={handleChange}
//         />

//         <textarea
//           style={{ padding: "10px", fontSize: "16px" }}
//           name="message"
//           placeholder="Your Message"
//           rows="4"
//           value={form.message}
//           onChange={handleChange}
//         />

//         <button
//           type="button"
//           style={{
//             padding: "10px",
//             backgroundColor: "#333",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             fontSize: "16px"
//           }}
//           onClick={() => alert("Form submitted (not really, demo only!)")}
//         >
//           Send Message
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Contact;


import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '300px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '300px' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '300px', height: '100px' }}
        />
        <button
          type="submit"
          style={{
            display: 'block',
            margin: '10px auto',
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;