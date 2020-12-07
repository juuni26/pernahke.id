import React, { useContext, useLayoutEffect, useState, useEffect, useRef } from "react";

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
    message,
    Skeleton
} from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined,
    CaretRightOutlined,
    SearchOutlined
    ,
    ArrowDownOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import { capitalize } from "lodash";
import Axios from "axios";

import "./Home.scss";

const Home = () => {
    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView()   


    const [placeholder, setPlaceholder] = useState("");
    const [slider, setSlider] = useState(1);
    const [provinsiSlide, setProvinsiSlide] = useState(1);
    const [provinsi, setProvinsi] = useState(null);
    const [kota, setKota] = useState(null);
    const [gerak, setGerak] = useState(null);

    const slideLeft = () => {
        // let newSlider = +slider - 1 === 0 ? 3 : slider - 1;
        // setSlider(newSlider);

        let newSlider =
            +provinsiSlide - 1 === 0
                ? Math.ceil(provinsi.length / 10)
                : provinsiSlide - 1;
        setProvinsiSlide(newSlider);
    };

    const slideRight = () => {
        let newSlider =
            +provinsiSlide + 1 === Math.ceil(provinsi.length / 10) + 1
                ? 1
                : provinsiSlide + 1;
        setProvinsiSlide(newSlider);
    };

    const handleToKota = id => {
        Axios.get(`/data/kota-provinsi/${id}`).then(response => {
            console.log(response, id, "id");
            if (response.data.status === "failed") {
                message.error(response.data.message);
            } else {
                setKota(response.data.data);
                setSlider(2);
                message.succes;
            }
        });
    };

    useEffect(() => {
        Axios.get("/data/provinsi").then(response => {
            console.log(provinsi, "1");
            setProvinsi(response.data.data);
            console.log(provinsi, "2");
            console.log(response.data.data.slice(+1 * 10 - 10, +1 * 10));
            localStorage.setItem("provinsi", "true");
        }).then(() => {
            console.log(provinsi);
        })



        const txt = "cari tempat yang kamu mau";
        let txtLen = txt.length;
        setPlaceholder("|");
        let i = 0;
        let itt = setInterval(function () {
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
            <div className="search-section">
                <div className="main-search">
                    <h5>Lihat kata mereka yang pernah ke ... </h5>
                    <form>
                        <input type="text" name="name" placeholder={placeholder} /><span className="samping-input"><SearchOutlined /></span>
                        {/* <input type="submit" value="Submit" /> */}
                    </form>
                </div>

                <div className="btmm1">
                    Bingung? ayo eksplore Indonesia !
</div>

                <div class="arrow bounce btmm" onClick={executeScroll}>
                    <span><ArrowDownOutlined /></span>
                </div>
            </div>
            <div className="whole-section" ref={myRef}>
                <section
                    className={
                        slider === 1
                            ? "section provinsi active"
                            : "section provinsi"
                    }
                >
                    <div className="leftDir" onClick={slideLeft}>
                        <LeftOutlined />
                    </div>
                    <div className="rightDir" onClick={slideRight}>
                        <RightOutlined />
                    </div>
                    <h5>Provinsi Section</h5>

                    <div className="picture-list">
                        {/* 1, 44 */}

                        {provinsi && provinsi.length > 0 ? (
                            provinsiSlide ===
                                Math.ceil(provinsi.length / 10) ? (
                                    provinsi
                                        .slice(
                                            +provinsiSlide * 10 - 10,
                                            +provinsi.length
                                        )
                                        .map(provinsi => {
                                            let nama = provinsi.provinsi;
                                            let url = JSON.parse(provinsi.foto)[0];
                                            return (
                                                <div
                                                    className="card"
                                                    onClick={() => {
                                                        handleToKota(provinsi.id);
                                                    }}

                                                >
                                                    <img
                                                        className="card-image"
                                                        src={url}
                                                        alt={url}

                                                    />
                                                    <div className="content">
                                                        <h4>{nama}</h4>
                                                    </div>
                                                </div>
                                            );
                                        })
                                ) : (
                                    Array.from(provinsi)
                                        .slice(
                                            +provinsiSlide * 10 - 10,
                                            +provinsiSlide * 10
                                        )
                                        .map(provinsi => {
                                            let nama = provinsi.provinsi;
                                            let url = JSON.parse(provinsi.foto)[0];
                                            return (
                                                <div
                                                    className="card"
                                                    onClick={() => {
                                                        handleToKota(provinsi.id);
                                                    }}
                                                >
                                                    <img
                                                        className="card-image"
                                                        src={url}
                                                        alt={url}
                                                        onClick={() => {
                                                            handleToKota(
                                                                provinsi.id
                                                            );
                                                        }}
                                                    />
                                                    <div className="content">
                                                        <h4>{nama}</h4>
                                                    </div>
                                                </div>
                                            );
                                        })
                                )
                        ) : (
                                <Skeleton />
                            )}
                    </div>
                </section>

                <section
                    className={
                        slider === 2 ? "section kota active" : "section kota"
                    }
                >
                    <div className="leftDir" onClick={slideLeft}>
                        <LeftOutlined />
                    </div>
                    <div className="rightDir" onClick={slideRight}>
                        <RightOutlined />
                    </div>
                    <h5>kota Section</h5>

                    <div className="picture-list">
                        {kota && kota.length > 0 ? (
                            kota.map(kota => {
                                let nama = kota.kota;
                                let url = JSON.parse(kota.foto)[0];
                                return (
                                    <div
                                        className="card"
                                        onClick={() => {
                                            handleToKota(kota.id);
                                        }}
                                    >
                                        <img
                                            className="card-image"
                                            src={url}
                                            alt={url}
                                        />
                                        <div className="content">
                                            <h4>{nama}</h4>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                                <Skeleton />
                            )}
                    </div>
                </section>

                <section
                    className={
                        slider === 3
                            ? "section wisata active"
                            : "section wisata"
                    }
                >
                    <div className="leftDir" onClick={slideLeft}>
                        <LeftOutlined />
                    </div>
                    <div className="rightDir" onClick={slideRight}>
                        <RightOutlined />
                    </div>
                    <h5>Wisata Section</h5>
                </section>
            </div>
        </div>
    );
};

export default Home;
