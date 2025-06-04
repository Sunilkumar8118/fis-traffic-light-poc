import React, { useEffect, useState } from "react";

import { debounce } from "lodash";
import { filterUserByName } from "../../utils/userSearchUtil";

const UserSearch = ({users, onFilter}) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounced = debounce(() => {
      const filtered = filterUserByName(users, searchTerm);
      onFilter(filtered);
    }, 3000);

    debounced();

    return () => debounced.cancel();
  }, [searchTerm, users, onFilter]);

  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        marginBottom: "1rem",
        padding: "0.5rem",
        fontSize: "1rem",
        width: "300px",
      }}
    />
  );
};

export default UserSearch;
