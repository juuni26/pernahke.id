import React, { useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { BaseContext } from "../BaseContext";
import Axios from "axios";
import {
    Rate,
    Skeleton,
    message,
    Avatar,
    Button,
    Modal,
    Form,
    Input,
    Radio
} from "antd";

import {
    HeartOutlined,
    UpOutlined,
    DownOutlined,
    HeartFilled,
    PlusOutlined
} from "@ant-design/icons";

import "./Tempat.scss";

import _ from 'lodash';


const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Tambah tips atau review terkait tempat ini"
            okText="tambah"
            cancelText="batal"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: "public"
                }}
            >
                <Form.Item
                    name="review"
                    label="Review"
                    rules={[
                        {
                            required: true,
                            message: "Tolong masukkan review!"
                        }
                    ]}
                >
                    <Input.TextArea rows={6} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const Tempat = () => {
    const [likeState, setLikeState] = useState(null);
    const [visible, setVisible] = useState(false);

    const [score, setScore] = useState(0);
    const [up, setUp] = useState(false);
    const [down, setDown] = useState(false);

    const [tokenStatus, setTokenStatus] = useState(false);

    const [data, setData] = useState(null);
    const [dataReview, setDataReview] = useState(null);
    const [jumlahLike, setJumlahLike] = useState(0);
    const { token, setToken, setUser } = useContext(BaseContext);

    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        Axios.get(`/data/tempat-detail/${id}`).then(resp => {
            setData(resp.data.data[0]);
        });

        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
        let bodyFormData = new FormData();
        let tkn = token ? token : "";
        bodyFormData.append("token", tkn);
        bodyFormData.append("tempat", id);

        Axios({
            method: "post",
            url: "/pengenke",
            data: bodyFormData,
            headers: {
                "X-CSRF-TOKEN": csrf_token
            }
        })
            .then(response => {
                if (response.data.status !== "failed") {                   
                    if (response.data.data.state === "login") {
                        if (response.data.data.status === 1) {
                            setLikeState(true);
                        } else {
                            setLikeState(null);
                        }
                    } else {
                        setLikeState(null);
                    }
                    setJumlahLike(response.data.data.total);
                }
            })
            .then(() => {
                Axios.defaults.xsrfHeaderName = "X-CSRFToken";
                let bodyFormData = new FormData();
                let tkn = token ? token : "";
                bodyFormData.append("token", tkn);
                bodyFormData.append("tempat", id);

                Axios({
                    method: "post",
                    url: "/data/review",
                    data: bodyFormData,
                    headers: {
                        "X-CSRF-TOKEN": csrf_token
                    }
                }).then(response => {
                    if (response.data.status !== "failed") {                        
                        setDataReview(response.data.data);  
                                                                      
                    } else {
                        console.log(response, "test");
                        setDataReview(response.data.data);
                    }
                });
            })
            .catch(function(response) {
                console.log(response);
            });
    }, []);

    const onCreate = values => {
        setVisible(false);
        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
        let bodyFormData = new FormData();
        let tkn = token ? token : "";

        bodyFormData.append("token", tkn);
        bodyFormData.append("tempat", id);
        bodyFormData.append("review", values.review);

        Axios({
            method: "post",
            url: "/review",
            data: bodyFormData,
            headers: {
                "X-CSRF-TOKEN": csrf_token
            }
        })
            .then(response => {
                if (response.data.status !== "failed") {
                    Axios.defaults.xsrfHeaderName = "X-CSRFToken";
                    let bodyFormData = new FormData();
                    let tkn = token ? token : "";
                    bodyFormData.append("token", tkn);
                    bodyFormData.append("tempat", id);

                    Axios({
                        method: "post",
                        url: "/data/review",
                        data: bodyFormData,
                        headers: {
                            "X-CSRF-TOKEN": csrf_token
                        }
                    })
                        .then(response => {
                            if (response.data.status !== "failed") {
                                if (response.data.status === "no_token") {
                                    setDataReview(response.data.data);
                                } else {
                                    setDataReview(response.data.data);
                                }
                            }
                        })
                        .then(() => {
                            message.success(response.data.message);
                        });
                } else {
                    message.error(response.data.message);
                }
            })
            .catch(function(response) {
                console.log("test", response);
            });
    };

    const handleLike = kondisi => {
        let likee = !likeState ? "active" : "inactive";
        // token,status,tempat
        let tkn = token ? token : "";

        if (tkn) {
            Axios.defaults.xsrfHeaderName = "X-CSRFToken";
            let bodyFormData = new FormData();

            bodyFormData.append("token", tkn);
            bodyFormData.append("tempat", id);
            bodyFormData.append("status", likee);

            Axios({
                method: "post",
                url: "/like",
                data: bodyFormData,
                headers: {
                    "X-CSRF-TOKEN": csrf_token
                }
            })
                .then(response => {
                    if (response.data.status !== "failed") {
                        if (response.data.status === "expired") {
                            Axios.defaults.xsrfHeaderName = "X-CSRFToken";

                            var bodyFormData = new FormData();
                            bodyFormData.append("token", token);
                            Axios({
                                method: "post",
                                url: "/logout",
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
                                        message.success(response.data.message);
                                        localStorage.clear();
                                        setToken("");
                                        setUser("");
                                    }
                                })
                                .catch(function(response) {
                                    console.log(response);
                                });
                        } else {
                            if (response.data) {
                                setToken(response.data.token);
                                localStorage.setItem(
                                    "token",
                                    response.data.token
                                );
                                setLikeState(!likeState);
                                if (kondisi === "minus") {
                                    setJumlahLike(+jumlahLike - 1);
                                } else {
                                    setJumlahLike(+jumlahLike + 1);
                                }
                            } else {
                                message.error(response.data.message);
                            }
                        }
                    } else {
                        message.error(response.data.message);
                    }
                })
                .catch(function(response) {
                    console.log(response);
                });
        } else {
            message.error("Harap login terlebih dahulu!");
        }
    };

    const handleUp = (status, review_id) => {
        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
        let bodyFormData = new FormData();
        let tkn = token ? token : "";
        let vote = status === "up" ? "up" : "nothing";

        //
        bodyFormData.append("token", tkn);
        bodyFormData.append("review_id", review_id);
        bodyFormData.append("vote", vote);

        Axios({
            method: "post",
            url: "/reviewvote",
            data: bodyFormData,
            headers: {
                "X-CSRF-TOKEN": csrf_token
            }
        })
            .then(response => {
                if (response.data.status !== "failed") {
                    if (response.data.status === "expired") {
                        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
                        var bodyFormData = new FormData();
                        bodyFormData.append("token", token);
                        Axios({
                            method: "post",
                            url: "/logout",
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
                                    message.success(response.data.message);
                                    localStorage.clear();
                                    setToken("");
                                    setUser("");
                                }
                            })
                            .catch(function(response) {
                                console.log(response);
                            });
                    } else {
                        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
                        let bodyFormData = new FormData();
                        let tkn = token ? token : "";
                        bodyFormData.append("token", tkn);
                        bodyFormData.append("tempat", id);

                        Axios({
                            method: "post",
                            url: "/data/review",
                            data: bodyFormData,
                            headers: {
                                "X-CSRF-TOKEN": csrf_token
                            }
                        }).then(response => {
                            if (response.data.status !== "failed") {
                                if (response.data.status === "no_token") {
                                    setDataReview(response.data.data);
                                } else {
                                    setDataReview(response.data.data);
                                }
                            }
                        });
                    }
                } else {
                    message.error(response.data.message);
                }
            })
            .catch(function(response) {
                console.log(response);
            });
    };

    const handleDown = (status, review_id) => {
        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
        let bodyFormData = new FormData();
        let tkn = token ? token : "";
        let vote = status === "down" ? "down" : "nothing";

        //
        bodyFormData.append("token", tkn);
        bodyFormData.append("review_id", review_id);
        bodyFormData.append("vote", vote);

        Axios({
            method: "post",
            url: "/reviewvote",
            data: bodyFormData,
            headers: {
                "X-CSRF-TOKEN": csrf_token
            }
        })
            .then(response => {
                if (response.data.status !== "failed") {
                    if (response.data.status === "expired") {
                        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
                        var bodyFormData = new FormData();
                        bodyFormData.append("token", token);
                        Axios({
                            method: "post",
                            url: "/logout",
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
                                    message.success(response.data.message);
                                    localStorage.clear();
                                    setToken("");
                                    setUser("");
                                }
                            })
                            .catch(function(response) {
                                console.log(response);
                            });
                    } else {
                        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
                        let bodyFormData = new FormData();
                        let tkn = token ? token : "";
                        bodyFormData.append("token", tkn);
                        bodyFormData.append("tempat", id);

                        Axios({
                            method: "post",
                            url: "/data/review",
                            data: bodyFormData,
                            headers: {
                                "X-CSRF-TOKEN": csrf_token
                            }
                        }).then(response => {
                            if (response.data.status !== "failed") {
                                if (response.data.status === "no_token") {
                                    setDataReview(response.data.data);
                                } else {
                                    setDataReview(response.data.data);
                                }
                            } else {
                                console.log(response.data.data, "wpyys");
                                setDataReview(response.data.data);
                            }
                        });
                    }
                } else {
                    message.error(response.data.message);
                }
            })
            .catch(function(response) {
                console.log(response);
            });
    };

    if (!data) {
        return <Skeleton active />;
    } else {
        return (
            <div>
                <article className="tempat-section">
                    <div className="tempat-banner">
                        <div className="tempat-bg"></div>
                        <img
                            className="tempat-image"
                            src={JSON.parse(data.foto)[0]}
                        />
                        <h3>{data.tempat}</h3>
                    </div>

                    <div className="tempat-like">
                        <div className="like">
                            <HeartFilled
                                style={
                                    likeState
                                        ? {
                                              display: "block",
                                              fontSize: "4rem",
                                              color: "red"
                                          }
                                        : { display: "none" }
                                }
                                onClick={() => {
                                    handleLike("minus");
                                }}
                            />
                            <HeartOutlined
                                style={
                                    likeState
                                        ? { display: "none" }
                                        : {
                                              display: "block",
                                              fontSize: "4rem",
                                              color: "red"
                                          }
                                }
                                onClick={() => {
                                    handleLike("plus");
                                }}
                            />
                        </div>
                        <div className="desc">
                            Like jika <span className="pengenke">PengenKe</span>{" "}
                            sini
                            <br />
                            <i>
                                {jumlahLike} orang{" "}
                                <span className="pengenke">PengenKe</span> sini
                            </i>
                        </div>
                        {/* <div className="rating"><Rate allowHalf defaultValue={5} style={{ background: "#fff" }} allowCle="false" /> </div> */}
                    </div>
                    <p className="tempat-alamat">{data.alamat}</p>
                    <div className="tempat-deskripsi">
                        <div className="deskripsi-detail">
                            <p className="deskripsi-detail-content">
                                <span>Deskripsi</span>
                                {data.deskripsi}
                            </p>
                        </div>
                        <div className="deskripsi-detail">
                            <p className="deskripsi-detail-content">
                                <span>Estimasi Biaya</span>
                                {data.biaya}
                            </p>{" "}
                        </div>
                    </div>
                    <div className="tempat-tag">
                        <h5>TAGS</h5>
                        <div className="tempat-tag-detail">
                            {data.hashtag.split(",").map(d => (
                                <div className="tempat-tag-detail-detail">
                                    {d}
                                </div>
                            ))}
                            {data.kategori.map(k => (
                                <div className="tempat-tag-detail-detail">
                                    {k}
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
                <section className="review-section">
                    <h4>
                        Lihat Kata mereka yang
                        <span className="pernahke"> PernahKe</span> sini
                    </h4>
                    <div
                        style={{
                            textAlign: "left",
                            width: "100%",
                            paddingLeft: "3%"
                        }}
                    >
                        {token ? (
                            <Button
                            size="medium"
                                type="primary"
                                onClick={() => {
                                    setVisible(true);
                                }}
                                
                            >
                                <PlusOutlined /> Mulai Sharing!
                            </Button>
                        ) : (
                            <div
                                style={{
                                    fontStyle: "italic",
                                    fontWeight: "bold",
                                    color: "rgb(5, 38, 146)",
                                    fontSize: "1rem"
                                }}
                            >
                                Ayo login untuk mulai sharing !
                            </div>
                        )}

                        <CollectionCreateForm
                            visible={visible}
                            onCreate={onCreate}
                            onCancel={() => {
                                setVisible(false);
                            }}
                        />
                    </div>

                    {dataReview && dataReview.length > 0 ? (
                        dataReview.map(review => {
                            return (
                                <div className="review-content">
                                    <div className="review-content-left">
                                        <Avatar
                                            style={{
                                                backgroundColor: "darkblue",
                                                verticalAlign: "middle",
                                                fontSize: "2rem"
                                            }}
                                            size={{
                                                xs: 24,
                                                sm: 32,
                                                md: 44,
                                                lg: 64,
                                                xl: 80,
                                                xxl: 100
                                            }}
                                        >
                                            {review.nama &&
                                            review.nama.trim().split(" ")
                                                .length > 1
                                                ? review.nama
                                                      .trim()
                                                      .split(" ")
                                                      .reduce(
                                                          (
                                                              accumulator,
                                                              currentValue
                                                          ) =>
                                                              accumulator[0] +
                                                              currentValue[0]
                                                      )
                                                : review.nama
                                                ? review.nama[0]
                                                : ""}
                                        </Avatar>
                                    </div>
                                    <div className="review-content-center">
                                        <p>


                                        
                                            {_.startCase(_.toLower(review.nama))} | {_.startCase(_.toLower(review.nama))}
                                        </p>
                                        <p>{review.review}</p>
                                    </div>
                                    <div className="review-content-right">                                        
                                        <div className="vote">
                                            <div
                                                className={
                                                    review.vote === "up"
                                                        ? "vote-arrow activee"
                                                        : "vote-arrow"
                                                }
                                                onClick={() => {
                                                    if (review.vote === "up") {
                                                        handleUp(
                                                            "nothing",
                                                            review.id
                                                        );
                                                    } else {
                                                        handleUp(
                                                            "up",
                                                            review.id
                                                        );
                                                    }
                                                }}
                                            >
                                                <UpOutlined
                                                    style={{ fontSize: "2rem" }}
                                                />
                                            </div>
                                            <div className="scoree">
                                                {review.total}
                                            </div>
                                            <div
                                                className={
                                                    review.vote === "down"
                                                        ? "vote-arrow activee"
                                                        : "vote-arrow"
                                                }
                                                onClick={() => {
                                                    if (
                                                        review.vote === "down"
                                                    ) {
                                                        handleDown(
                                                            "nothing",
                                                            review.id
                                                        );
                                                    } else {
                                                        handleDown(
                                                            "down",
                                                            review.id
                                                        );
                                                    }
                                                }}
                                            >
                                                <DownOutlined
                                                    style={{ fontSize: "2rem" }}
                                                />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : dataReview && dataReview.length === 0 ? (
                        <div
                            style={{
                                margin: "4vh 0",
                                fontSize: "1.1rem",
                                color: "gray"
                            }}
                        >
                            Belum ada yang sharing disini, Yuk jadi yang
                            pertama!
                        </div>
                    ) : tokenStatus ? (
                        <Skeleton active />
                    ) : (
                        <div
                            style={{
                                margin: "4vh 0",
                                fontSize: "1.5rem",
                                color: "gray"
                            }}
                        >
                            Belum ada yang sharing disini, Yuk jadi yang
                            pertama!
                        </div>
                    )}
                </section>
            </div>
        );
    }
};

export default Tempat;
