import React from 'react'
import UserContext from './UserContext';

const UserProfile = () => {
  const user = React.useContext(UserContext);
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
};

export default UserProfile