import './App.css'
import RegistrationForm from './components/RegistrationForm.jsx'
import FormikForm from './components/formikForm.js'

function App() {
  return (
    <>
      <div style={{ display: 'grid', gap: 24, marginTop: 24 }}>
        <RegistrationForm />
        <FormikForm />
      </div>
    </>
  )
}

export default App
