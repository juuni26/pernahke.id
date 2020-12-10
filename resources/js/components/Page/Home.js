import React, {
    useContext,
    useLayoutEffect,
    useState,
    useEffect,
    useRef
} from "react";

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
    Link   
} from "react-router-dom";


import {
    MinusCircleOutlined,
    PlusOutlined,
    CaretRightOutlined,
    CloseOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined,
    SearchOutlined,
    ArrowDownOutlined,
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import { capitalize } from "lodash";
import Axios from "axios";

import "./Home.scss";

const Home = () => {
    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();

    const [placeholder, setPlaceholder] = useState("");
    const [slider, setSlider] = useState(1);
    const [provinsiSlide, setProvinsiSlide] = useState(1);
    const [provinsi, setProvinsi] = useState(null);
    
    const [kota, setKota] = useState(null);
    const [kotaSlide, setKotaSlide] = useState(1);

    const [tempat, setTempat] = useState(null);

    const [kotaName,setKotaName] = useState("Kota");
    const [tempatName,setTempatName] = useState("");

    const [gerak, setGerak] = useState(null);
    const [searchState,setSearchState] = useState(null);

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


    const slideLeftKota = () => {
        // let newSlider = +slider - 1 === 0 ? 3 : slider - 1;
        // setSlider(newSlider);

        let newSlider =
            +kotaSlide - 1 === 0
                ? Math.ceil(kota.length / 10)
                : kotaSlide - 1;
        setKotaSlide(newSlider);
    };

    const slideRightKota = () => {
        let newSlider =
            +kotaSlide + 1 === Math.ceil(kota.length / 10) + 1
                ? 1
                : kotaSlide + 1;
        setKotaSlide(newSlider);
    };


    const handleSearch = e =>{
        e.preventDefault();
        setSearchState(true);
    }

    const handleToKota = (id,provinsi_nama) => {
        Axios.get(`/data/kota-provinsi/${id}`).then(response => {        
            if (response.data.status === "failed") {
                message.error(response.data.message);
            } else {                
                setKota(response.data.data);
                setSlider(2);
                setKotaName(provinsi_nama);
            }
        });
    };

    const handleToTempat = (id,kota_nama) => {
        Axios.get(`/data/kota-tempat/${id}`).then(response => {        
            if (response.data.status === "failed") {
                message.error(response.data.message);
            } else {                
                setTempat(response.data.data);
                setSlider(3);
                setTempatName(kota_nama);
            }
        });
    };

    useEffect(() => {
        Axios.get("/data/provinsi")
            .then(response => {
                setProvinsi(response.data.data);
                localStorage.setItem("provinsi", "true");
            })
            .then(() => {});

        const txt = "Cari tempat yang kamu mau ...";
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
            <div className="search-result" style={searchState? {display: "block"}:{display: "none"} } >
                <div className="top-leftt"onClick={()=>{setSearchState(null)}}>
                <CloseOutlined />
                </div>
                <section className="search-result-list">
                    <div className="single-result">
                        <h6>Ancol, Jakarta utara</h6>
                        <div className="single-result-content">
                            <img src="https://images.bisnis-cdn.com/posts/2020/06/30/1259392/bio-ancol-3.jpg" />
                            <p>
                                loremi ipsffafu afafkfkfkefkof efoekfoefkoefksa
                                fkfa loremi ipsffafu afafkfkfkefkof
                                efoekfoefkoefksa fkfa loremi ipsffafu
                                afafkfkfkefkof efoekfoefkoefksa fkfa ...{" "}
                                <span className="see-more">See more</span>
                            </p>
                        </div>
                    </div>

                    <div className="single-result">
                        <h6>Ancol, Jakarta utara</h6>
                        <div className="single-result-content">
                            <img src="https://images.bisnis-cdn.com/posts/2020/06/30/1259392/bio-ancol-3.jpg" />
                            <p>
                                loremi ipsffafu afafkfkfkefkof efoekfoefkoefksa
                                fkfa loremi ipsffafu afafkfkfkefkof
                                efoekfoefkoefksa fkfa loremi ipsffafu
                                afafkfkfkefkof efoekfoefkoefksa fkfa ...{" "}
                                <span className="see-more">See more</span>
                            </p>
                        </div>
                    </div>

                    <div className="single-result">
                        <h6>Ancol, Jakarta utara</h6>
                        <div className="single-result-content">
                            <img src="https://images.bisnis-cdn.com/posts/2020/06/30/1259392/bio-ancol-3.jpg" />
                            <p>
                                loremi ipsffafu afafkfkfkefkof efoekfoefkoefksa
                                fkfa loremi ipsffafu afafkfkfkefkof
                                efoekfoefkoefksa fkfa loremi ipsffafu
                                afafkfkfkefkof efoekfoefkoefksa fkfa ...{" "}
                                <span className="see-more">See more</span>
                            </p>
                        </div>
                    </div>

                    <div className="leftt"><ArrowLeftOutlined /> Sebelumnya</div>
                    <div className="middlee">Halaman 1</div>
                    <div className="rightt">Selanjutnya <ArrowRightOutlined /></div>
                </section>
            </div>

            <div className="search-section">
                <div className="main-search">
                    <h5>Lihat kata mereka yang pernah ke ... </h5>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            name="name"
                            placeholder={placeholder}
                            list="data"
                        />
                        <button className="samping-input">
                            <SearchOutlined />
                        </button>
                        <datalist id="data">
                            <option value="test ">test</option>
                        </datalist>
                    </form>
                </div>

                <div className="btmm1">Bingung? Ayo explore Indonesia !</div>

                <div className="arrow bounce btmm" onClick={executeScroll}>
                    <span>
                        <ArrowDownOutlined style={{color:"#fff"}} />
                    </span>
                </div>
            </div>



            <div className="whole-section" >

                {/* section provinsi */}
                <section
                    className={
                        slider === 1
                            ? "section provinsi active"
                            : "section provinsi"
                    }
                >
                    <div className="leftDir" onClick={slideLeft}>
                        <LeftOutlined style={{fontSize:"2rem"}} />
                    </div>
                    <div className="rightDir" onClick={slideRight}>
                        <RightOutlined style={{fontSize:"2rem"}} />
                    </div>
                    <h5 className="area-title" ref={myRef}>Provinsi</h5>

                    <div className="picture-list">
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
                                                    handleToKota(provinsi.id,provinsi.provinsi);
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
                                provinsi
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
                                                    handleToKota(provinsi.id,provinsi.provinsi);
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
                            )
                        ) : (
                            <Skeleton />
                        )}
                    </div>
                </section>


{/* section kota */}
                <section
                    className={
                        slider === 2 ? "section kota active" : "section kota"
                    }
                >
                    <div className="leftDir" onClick={slideLeftKota}>
                        <LeftOutlined style={{fontSize:"2rem"}} />
                    </div>
                    <div className="rightDir" onClick={slideRightKota}>
                        <RightOutlined style={{fontSize:"2rem"}} />
                    </div>
                <h5 className="area-title">Kota di {kotaName}</h5>

                    <div className="picture-list">
                        {kota && kota.length > 0 ? (
                            kota.map(kota => {
                                let nama = kota.kota;
                                let url = JSON.parse(kota.foto)[0];
                                return (
                                                                 
                                    <div
                                        className="card"    
                                        onClick={()=>{
                                            handleToTempat(kota.id,kota.kota);
                                        }}                                  
                                    >                                        
                                        <img
                                            className="card-image"
                                            src={url}
                                            alt={nama+" foto"}
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
                        slider === 3 ? "section tempat active" : "section tempat"
                    }
                >
                    <div className="leftDir" onClick={slideLeftKota}>
                        <LeftOutlined style={{fontSize:"2rem"}} />
                    </div>
                    <div className="rightDir" onClick={slideRightKota}>
                        <RightOutlined style={{fontSize:"2rem"}} />
                    </div>
                <h5 className="area-title">Tempat di kota {tempatName}</h5>

                    <div className="picture-list">
                        {tempat && tempat.length > 0 ? (
                            tempat.map(tempat => {
                                let nama = tempat.tempat;
                                let url = JSON.parse(tempat.foto)[0];
                                return (
                                    
                                <Link to={`/tempat/${tempat.id}`}>
                                    <div
                                        className="card"                                      
                                    >                                        
                                        <img
                                            className="card-image"
                                            src={url}
                                            alt={nama+" foto"}
                                        />
                                        <div className="content">
                                            <h4>{nama}</h4>
                                        </div>
                                    </div>
                                    </Link>
                                );
                            })
                        ) : (
                            <Skeleton />
                        )}
                    </div>
                </section>


            </div>
        </div>
    );
};

export default Home;
