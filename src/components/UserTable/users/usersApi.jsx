
import axios from 'axios';

export const fetchUsersAPI = async () => {
  const res = await axios.get('https://dummyjson.com/users');
  return res.data.users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    address: `${user.address.address}, ${user.address.city}`,
    email: user.email,
    phone: user.phone,
    image: user.image,
    birthDate: user.birthDate
  }));
};
