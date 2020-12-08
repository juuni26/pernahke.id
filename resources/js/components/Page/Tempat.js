import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

import {Rate    
} from "antd";

import {
    HeartOutlined
} from "@ant-design/icons";


import "./Tempat.scss";

const Tempat = () => {
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
                    <div className="like"><Rate count={1} character={<HeartOutlined />}/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ></div>
                    <div className="desc">Like jika kalian PengenKe <br/>
                        1000 orang  PengenKe sini</div>
                    <div className="rating"><Rate allowHalf defaultValue={2.5} /> </div>
                </div>
                <p>alamat</p>
                <div>
                    <div>Deskripsi</div>
                    <div>Estimasi Biaya</div>
                </div>
                <div>
                    <h5>TAGS</h5>
                    <div> koawkwkwkwk</div>
                </div>
                <div>swipe down untuk liat orang</div>
                {/* <h3>ID: {id}</h3> */}
            </article>
            <section>
                <h4>Review orang yang PernahKesini</h4>
                <div>isi review</div>
            </section>
        </div>
    );
};

export default Tempat;
