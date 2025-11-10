import { createContext } from "react";


const UserContext = createContext();

export default UserContext;

// export const UserProvider = ({ children, user }) => {
//   return (
//     <UserContext.Provider value={user}>
//       {children}
//     </UserContext.Provider>
//   );
// }