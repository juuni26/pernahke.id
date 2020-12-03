import React, { useState, createContext } from "react";

export const BaseContext = createContext();

export const BaseProvider = (props) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const [user, setUser] = useState(
    localStorage.getItem("user") ? localStorage.getItem("user") : ""
  );

  // const [dataa, setDataa] = useState([]);

  // const [filterData, setFilterData] = useState(null);
  // const [editState, setEditState] = useState(false);


  // const [userName, setUserName] = useState(
  //   localStorage.getItem("user") ? localStorage.getItem("user") : ""
  // );

  
//   token admin / token user ?

  const dataBase = {
    token: token,
    setToken: setToken,
    user:user,
    setUser:setUser
  };

  return (
    <BaseContext.Provider value={dataBase}>
      {props.children}
    </BaseContext.Provider>
  );
};
