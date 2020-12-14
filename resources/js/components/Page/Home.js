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

import { Link } from "react-router-dom";

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
import {BaseContext} from '../BaseContext';

import { Link as Pointer, animateScroll as scroll } from "react-scroll";

import "./Home.scss";

const Home = () => {
    const myRef = useRef(null);

    const { token } = useContext(BaseContext);

    const executeScroll = () => myRef.current.scrollIntoView();

    const [placeholder, setPlaceholder] = useState("");
    const [slider, setSlider] = useState(1);
    const [provinsiSlide, setProvinsiSlide] = useState(1);
    const [provinsi, setProvinsi] = useState(null);

    const [kota, setKota] = useState(null);
    const [kotaSlide, setKotaSlide] = useState(1);

    const [tempat, setTempat] = useState(null);

    const [kotaName, setKotaName] = useState("Kota");
    const [tempatName, setTempatName] = useState("");

    const [gerak, setGerak] = useState(null);
    // state search

    const [searchState, setSearchState] = useState(null);
    const [listSearch, setListSearch] = useState([]);

    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState(null);

    const [searchPage, setSearchPage] = useState(1);

    const handleChange = e => {
        setSearchValue(e.target.value);
    };

    const handleSearch = e => {
        e.preventDefault();
        if (searchValue) {
            Axios.defaults.xsrfHeaderName = "X-CSRFToken";

            var bodyFormData = new FormData();
            bodyFormData.append("search", searchValue);

            Axios({
                method: "post",
                url: "/search",
                data: bodyFormData,
                headers: {
                    "X-CSRF-TOKEN": csrf_token
                }
            })
                .then(response => {
                    console.log(response);
                    if (response.data.status === "failed") {
                        message.error(response.data.message);
                    } else {
                        setSearchResult(response.data.data);
                        setSearchState(true);
                    }
                })
                .catch(function(response) {
                    console.log(response);
                });
        }
    };

    const prevSearch = () => {
        if (searchResult.length > 3 && searchPage !== 1) {
            setSearchPage(searchPage - 1);
        }
    };

    const nextSearch = () => {
        if (
            searchResult.length > 3 &&
            searchPage !== Math.ceil(searchResult.length / 3)
        ) {
            setSearchPage(searchPage + 1);
        }
    };

    //  end search

    const slideLeft = () => {

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
            +kotaSlide - 1 === 0 ? Math.ceil(kota.length / 10) : kotaSlide - 1;
        setKotaSlide(newSlider);
    };

    const slideRightKota = () => {
        let newSlider =
            +kotaSlide + 1 === Math.ceil(kota.length / 10) + 1
                ? 1
                : kotaSlide + 1;
        setKotaSlide(newSlider);
    };

    const handleToKota = (id, provinsi_nama) => {
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

    const handleToTempat = (id, kota_nama) => {
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

        Axios.get("/data/listsearch").then(response => {
            if (response.data.message !== "failed") {
                // var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
                let result = Object.keys(response.data.data).map(
                    key => response.data.data[key]
                );
                setListSearch(result);
            }
        });

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
            <div
                className="search-result"
                style={searchState ? { display: "block" } : { display: "none" }}
            >
                <div
                    className="top-leftt"
                    onClick={() => {
                        setSearchState(null);
                    }}
                >
                    <CloseOutlined />
                </div>
                <section className="search-result-list">
                    {searchResult.length > 0
                        ? // check datanya
                          searchResult.length < 3
                            ? searchResult.map(data => {
                                  return (
                                      <div className="single-result">
                                          <Link to={`/tempat/${data.id}`}>
                                              <h6>{data.tempat}</h6>
                                          </Link>
                                          <div className="single-result-content">
                                              <img
                                                  src={JSON.parse(data.foto)[0]}
                                              />
                                              <p>
                                                  {data.deskripsi &&
                                                  data.deskripsi.length > 200
                                                      ? data.deskripsi
                                                            .split("")
                                                            .slice(0, 200)
                                                            .join("") + "..."
                                                      : data.deskripsi}
                                                  <Link
                                                      to={`/tempat/${data.id}`}
                                                  >
                                                      <span className="see-more">
                                                          See more
                                                      </span>
                                                  </Link>
                                              </p>
                                          </div>
                                      </div>
                                  );
                              })
                            : // searchresult lebih dari 3
                              searchResult
                                  .slice(searchPage * 3 - 3, searchPage * 3)
                                  .map(data => {
                                      return (
                                          <div className="single-result">
                                              <Link to={`/tempat/${data.id}`}>
                                                  <h6>{data.tempat}</h6>
                                              </Link>
                                              <div className="single-result-content">
                                                  <img
                                                      src={
                                                          JSON.parse(
                                                              data.foto
                                                          )[0]
                                                      }
                                                  />
                                                  <p>
                                                      {data.deskripsi &&
                                                      data.deskripsi.length >
                                                          200
                                                          ? data.deskripsi
                                                                .split("")
                                                                .slice(0, 200)
                                                                .join("") +
                                                            "..."
                                                          : data.deskripsi}
                                                      <Link
                                                          to={`/tempat/${data.id}`}
                                                      >
                                                          <span className="see-more">
                                                              See more
                                                          </span>
                                                      </Link>
                                                  </p>
                                              </div>
                                          </div>
                                      );
                                  })
                        : "Search not found, try other keyword !"}

                    <div className="leftt" onClick={prevSearch}>
                        <ArrowLeftOutlined /> Sebelumnya
                    </div>
                    <div className="middlee">
                        {searchPage} dari{" "}
                        {searchResult.length > 3
                            ? Math.ceil(searchResult.length / 3)
                            : "1"}{" "}
                        halaman{" "}
                    </div>
                    <div className="rightt" onClick={nextSearch}>
                        Selanjutnya <ArrowRightOutlined />
                    </div>
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
                            autoComplete="off"
                            onChange={handleChange}
                        />
                        <button className="samping-input">
                            <SearchOutlined />
                        </button>
                        <datalist id="data" style={{ width: "100%" }}>
                            {listSearch.length > 0
                                ? listSearch.map(l => (
                                      <option value={l}>{l}</option>
                                  ))
                                : ""}
                        </datalist>
                    </form>
                </div>
                <div style={{ textAlign: "left" }}>
                    {token?<Link to="saran-inputan">
                        <span className="sarantempat">
                            Mau saranin tempat yang belum ada, klik disini !
                        </span>
                    </Link>:
                    <span className="sarantempat" onClick={()=>{message.error("Harap login terlebih dahulu!")}}>
                    Mau saranin tempat yang belum ada, klik disini !
                </span> }
                    
                </div>

                <Pointer
                    activeClass="active"
                    to="prov"
                    spy={true}
                    smooth={true}
                    offset={-200}
                    duration={500}
                >
                <div className="btmm1">Bingung? Ayo explore Indonesia !</div>

              
                    <div className="arrow bounce btmm" 
                    >
                        <span>
                            <ArrowDownOutlined style={{ color: "#fff" }} />
                        </span>
                    </div>
                </Pointer>
            </div>

            <div className="whole-section">
                {/* section provinsi */}
                <section
                    className={
                        slider === 1
                            ? "section provinsi active"
                            : "section provinsi"
                    }
                >
                    <div className="leftDir" onClick={slideLeft}>
                        <LeftOutlined style={{ fontSize: "2rem" }} />
                    </div>
                    <div className="rightDir" onClick={slideRight}>
                        <RightOutlined style={{ fontSize: "2rem" }} />
                    </div>

                    <h5 className="area-title" ref={myRef} id="prov">
                        Provinsi
                    </h5>

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
                                                    handleToKota(
                                                        provinsi.id,
                                                        provinsi.provinsi
                                                    );
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
                                                    handleToKota(
                                                        provinsi.id,
                                                        provinsi.provinsi
                                                    );
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
                    <div
                        style={{
                            position: "absolute",
                            left: "2vw",
                            top: "2vh",
                            fontSize: "1.2rem",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            setSlider(1);
                        }}
                    >
                        <Button>Kembali ke Provinsi</Button>
                    </div>
                    <div className="leftDir" onClick={slideLeftKota}>
                        <LeftOutlined style={{ fontSize: "2rem" }} />
                    </div>
                    <div className="rightDir" onClick={slideRightKota}>
                        <RightOutlined style={{ fontSize: "2rem" }} />
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
                                        onClick={() => {
                                            handleToTempat(kota.id, kota.kota);
                                        }}
                                    >
                                        <img
                                            className="card-image"
                                            src={url}
                                            alt={nama + " foto"}
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
                            ? "section tempat active"
                            : "section tempat"
                    }
                >
                    <div
                        style={{
                            position: "absolute",
                            left: "2vw",
                            top: "2vh",
                            fontSize: "1.2rem",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            setSlider(2);
                        }}
                    >
                        <Button>Kembali ke Kota</Button>
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            left: "10vw",
                            top: "2vh",
                            fontSize: "1.2rem",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            setSlider(1);
                        }}
                    >
                        <Button>Kembali ke Provinsi</Button>
                    </div>
                    <div className="leftDir" onClick={slideLeftKota}>
                        <LeftOutlined style={{ fontSize: "2rem" }} />
                    </div>
                    <div className="rightDir" onClick={slideRightKota}>
                        <RightOutlined style={{ fontSize: "2rem" }} />
                    </div>
                    <h5 className="area-title">Tempat di {tempatName}</h5>

                    <div className="picture-list">
                        {tempat && tempat.length > 0 ? (
                            tempat.map(tempat => {
                                let nama = tempat.tempat;
                                let url = JSON.parse(tempat.foto)[0];
                                return (
                                    <Link to={`/tempat/${tempat.id}`}>
                                        <div className="card">
                                            <img
                                                className="card-image"
                                                src={url}
                                                alt={nama + " foto"}
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
