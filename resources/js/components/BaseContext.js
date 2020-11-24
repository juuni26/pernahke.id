import React, { useState, createContext } from "react";

export const BaseContext = createContext();

export const BaseProvider = (props) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [filee, setFilee] = useState("");
  const [dataa, setDataa] = useState([]);

  const [filterData, setFilterData] = useState(null);
  const [editState, setEditState] = useState(false);


  const [userName, setUserName] = useState(
    localStorage.getItem("user") ? localStorage.getItem("user") : ""
  );

  
//   token admin / token user ?

  const dataBase = {
    token: token,
    setToken: setToken,
    filee:filee,
    setFilee:setFilee,
    userName:userName,
    setUserName:setUserName,
    dataa:dataa,
    setDataa:setDataa,
    filterData:filterData,
    setFilterData:setFilterData,
    editState : editState,
    setEditState:setEditState
  };

  return (
    <BaseContext.Provider value={dataBase}>
      {props.children}
    </BaseContext.Provider>
  );
};
