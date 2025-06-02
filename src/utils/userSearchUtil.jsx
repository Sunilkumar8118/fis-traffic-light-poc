
export const filterUserByName = (users, term) => {
    if (!term) return users;

    const lowerTerm = term.toLowerCase();
    return users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(lowerTerm)
    );
  };
