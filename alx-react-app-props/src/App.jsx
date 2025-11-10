// import './App.css'
// import WelcomeMessage from './components/WelcomeMessage'
// import Header from './components/Header'
// import Footer from './components/Footer'
// import MainContent from './components/MainContent'
// import UserProfile from './components/UserProfile'


// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       <WelcomeMessage />
//       <Header />
//       <MainContent />
//       <Footer />
//       <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />

//     </>
//   )
// }

// export default App

import { UserContext } from './components/UserContext';
import ProfilePage from './ProfilePage';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}>

      <ProfilePage userData={userData} />
    </UserContext.Provider>

  );
}

export default App;