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
    CaretRightOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import { capitalize } from "lodash";
import Axios from "axios";

import "./Home.scss";

const Home = () => {
    const [placeholder, setPlaceholder] = useState("");
    const [slider,setSlider] = useState(1);

    const slideLeft = ()=>{
        let newSlider=  +slider-1===0 ?3:slider-1;
        setSlider(newSlider);
    };

    const slideRight = ()=>{
        let newSlider=  +slider+1===4 ?1:slider+1;
        setSlider(newSlider);
    }
     


    useEffect(() => {
        const txt = "cari tempat yang kamu mau";
        let txtLen = txt.length;
        setPlaceholder("|");
        let i = 0;
        let itt = setInterval(function() {
            if (+i == txtLen) {
                setPlaceholder(txt);
                clearTimeout(itt);
            } else {
                setPlaceholder(txt.substring(0, i) + "|");
            }
            i++;
        }, 140);
    }, []);

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

            <div className="whole-section">
            
                <section className={slider===1?"section provinsi active":"section provinsi"} >
                    <div className="leftDir" onClick={slideLeft}>                    
                    <LeftOutlined />
                    </div>
                    <div className="rightDir" onClick={slideRight}><RightOutlined /></div>
                    <h5>Provinsi Section</h5>
                    
                </section>

                <section className={slider===2?"section kota active":"section kota"}>
                <div className="leftDir" onClick={slideLeft}>                    
                    <LeftOutlined />
                    </div>
                    <div className="rightDir" onClick={slideRight}><RightOutlined /></div>
                    <h5>kota Section</h5>
                </section>

                <section className={slider===3?"section wisata active":"section wisata"}>
                <div className="leftDir" onClick={slideLeft}>                    
                    <LeftOutlined />
                    </div>
                    <div className="rightDir" onClick={slideRight}><RightOutlined /></div>
                    <h5>Wisata Section</h5>
                </section>
            </div>
        </div>
    );
};

export default Home;
