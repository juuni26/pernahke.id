import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

import {
    Rate
} from "antd";

import {
    HeartOutlined, UpOutlined, DownOutlined, HeartFilled
} from "@ant-design/icons";


import "./Tempat.scss";

const Tempat = () => {
    const [likeState, setLikeState] = useState(null);
    const [score, setScore] = useState(0);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const { id } = useParams();

    return (
        <div>
            <article className="tempat-section">
                <div className="tempat-banner">
                    <img
                        className="tempat-image"
                        src="https://statik.tempo.co/data/2017/10/26/id_657847/657847_720.jpg"
                    />
                    <h3>Ancol</h3>
                </div>

                <div className="tempat-like">
                    <div className="like">
                        <HeartFilled style={likeState ? { display: "block", fontSize: "5rem", color: "red" } : { display: "none" }} onClick={() => { setLikeState(!likeState) }} />
                        <HeartOutlined style={likeState ? { display: "none" } : { display: "block", fontSize: "5rem", color: "red" }} onClick={() => { setLikeState(!likeState) }} />
                    </div>
                    <div className="desc">Like untuk <span className="pengenke">PengenKe</span><br /><i>1000 orang <span className="pengenke">PengenKe</span> sini</i></div>
                    <div className="rating"><Rate allowHalf defaultValue={5} style={{ background: "#fff" }} allowCle="false" /> </div>
                </div>
                <p className="tempat-alamat">Jl. KH Asnawi 20 HW, Polytron kudus</p>
                <div className="tempat-deskripsi">
                    <div className="deskripsi-detail"><p className="deskripsi-detail-content"><span>Deskripsi</span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p></div>
                    <div className="deskripsi-detail"><p className="deskripsi-detail-content"><span>Estimasi Biaya</span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p> </div>
                </div>
                <div className="tempat-tag">
                    <h5>TAGS</h5>
                    <div className="tempat-tag-detail">
                        <div className="tempat-tag-detail-detail">testing</div>
                        <div className="tempat-tag-detail-detail">testing</div>
                        <div className="tempat-tag-detail-detail">testing</div>
                        <div className="tempat-tag-detail-detail">testing</div>
                        <div className="tempat-tag-detail-detail">testing</div>
                        <div className="tempat-tag-detail-detail">testing</div>




                    </div>
                </div>
                {/* <h3>ID: {id}</h3> */}
            </article>
            <section className="review-section">
                <h4>Lihat Kata mereka yang <span className="pernahke">PernahKe</span> sini</h4>
                <div className="review-content">
                    <div className="review-content-left"><img src="https://i.pinimg.com/originals/74/cc/f2/74ccf28d88b3606d073f20fe70e53539.png" /></div>
                    <div className="review-content-center"><p>Nama lengkap | Tanjung Priok Jakarta </p>
                        <p>This is mantep banget ajibbb</p>
                    </div>
                    <div className="review-content-right"><p>rate time</p>
                        <div className="vote">
                            <div className={up ? "vote-arrow activee" : "vote-arrow"} onClick={() => {
                                setUp(!up)
                                if (!up) {
                                    if (down) {
                                        setScore(score + 2);
                                    } else {
                                        setScore(score + 1);
                                    }
                                }
                                else {
                                    setScore(score - 1);
                                }
                                setDown(false);

                            }}><UpOutlined style={{ fontSize: "2rem" }} /></div>
                            <div className="scoree">{score}</div>
                            <div className={down ? "vote-arrow activee" : "vote-arrow"} onClick={() => {
                                setDown(!down);
                                if (!down) {
                                    if (up) {
                                        setScore(score - 2);
                                    } else {
                                        setScore(score - 1);
                                    }
                                }
                                else {
                                    setScore(score + 1);
                                }


                                setUp(false);
                            }}><DownOutlined style={{ fontSize: "2rem" }} /></div>
                        </div>
                    </div>
                </div>


            </section>
        </div>
    );
};

export default Tempat;
