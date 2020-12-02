import React, { useContext, useLayoutEffect, useState, useEffect } from "react";

import {
    Form,
    Input,
    Button,
    Space,
    Divider,
    Collapse,
    Select,
    InputNumber,
    Table,
    message
} from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined,
    CaretRightOutlined
} from "@ant-design/icons";
import { capitalize } from "lodash";
import Axios from "axios";

import "./Home.scss";

const Home = () => {

    const [placeholder,setPlaceholder ] = useState("");

    useEffect(()=>{

        const txt = "cari tempat yang kamu mau";
        let txtLen = txt.length;
        setPlaceholder('|');  
        let i =0;
        let itt = setInterval(function () {            
            
                 
                if (+i == txtLen) {
                                
                    setPlaceholder(txt);          
                    clearTimeout(itt);                        
                      
                }
                else {
                    setPlaceholder(txt.substring(0, i)+"|");   
                }         
                i++;
            
    
        }, 140);
        

    },[]);

    return (
        <div className="homepagee">
            <h1>Indonesia Travel Companion</h1>
            <p>
                Mau liburan ?<br />
                Butuh Referensi?
            </p>
            <div>
                <p>Lihat kata mereka yang pernah ke </p>
                <form>
                   
                        <input type="text" name="name" placeholder={placeholder} />                   
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};

export default Home;
