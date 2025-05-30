
// src/components/UserModal.jsx
const UserModal = ({ user }) => {
    return (
      <div>
        <h2>{user.firstName} {user.lastName}</h2>
        <img src={user.image} alt={user.firstName} style={{ width: '100px' }} />
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Birth Date:</strong> {user.birthDate}</p>
        <p><strong>Address:</strong> {user.address}, {user.city}</p>
      </div>
    );
  };
  
  export default UserModal;
  