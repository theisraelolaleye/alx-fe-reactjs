import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Username is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: Yup.string().trim().required('Password is required'),
})

const initialValues = {
  username: '',
  email: '',
  password: '',
}

const FormikForm = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log('Registration data (Formik):', values)
    alert('Registration successful!')
    resetForm()
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form noValidate style={{ maxWidth: 420, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center' }}>Register (Formik)</h2>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: 6 }}>Username</label>
          <Field
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            style={{ width: '100%', padding: 8 }}
          />
          <ErrorMessage name="username" component="small" style={{ color: 'red' }} />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            style={{ width: '100%', padding: 8 }}
          />
          <ErrorMessage name="email" component="small" style={{ color: 'red' }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
          <Field
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            style={{ width: '100%', padding: 8 }}
          />
          <ErrorMessage name="password" component="small" style={{ color: 'red' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: 10 }}>Register</button>
      </Form>
    </Formik>
  )
}

export default FormikForm
