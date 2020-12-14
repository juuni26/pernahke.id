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
import { BaseContext } from "../BaseContext";

import "./Home.scss";

const Saran = () => {

    const [listKota, setListKota] = useState(null);
    const [listKategori, setListKategori] = useState(null);
    const { token, setToken, setUser } = useContext(BaseContext);
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 12,
                offset: 4,
            },
        },
    };


    useEffect(() => {

        // set data kota
        Axios({
            method: "get",
            url: "/data/kota",
            headers: {
                "X-CSRF-TOKEN": csrf_token
            }
        })
            .then(response => {
                console.log(response.data.data, "get kota");
                setListKota(response.data.data);
            })
            .catch(function (response) {
                console.log(response);
            });


        Axios({
            method: "get",
            url: "/data/kategori",
            headers: {
                "X-CSRF-TOKEN": csrf_token
            }
        })
            .then(response => {
                console.log(response.data.data, "get kategori");
                setListKategori(response.data.data);
            })
            .catch(function (response) {
                console.log(response);
            });


    }, [])

    const onFinishTempat = (values) => {
        console.log(values);
        const {kota,alamat,deskripsi,tempat,kategori} = values;      
        Axios.defaults.xsrfHeaderName ="X-CSRFToken";
                                        var bodyFormData = new FormData();
                                        bodyFormData.append("kota",kota );
                                        bodyFormData.append("alamat",alamat );
                                        bodyFormData.append("deskripsi",deskripsi);
                                        bodyFormData.append("tempat",tempat );
                                        bodyFormData.append("kategori",kategori );
                                        bodyFormData.append("token",token );


                                        Axios({
                                            method: "post",
                                            url: "/sarantempat",
                                            data: bodyFormData,
                                            headers: {
                                                "X-CSRF-TOKEN": csrf_token
                                            }
                                        })
                                            .then(response => {
                                                console.log(response);
                                                if (
                                                    response.data.status ===
                                                    "failed"
                                                ) {
                                                    message.error(
                                                        response.data.message
                                                    );
                                                } else {
                                                    form.resetFields();
                                                    message.success(
                                                        response.data.message
                                                    );
                                                    
                                                }
                                            })
                                            .catch(function(response) {
                                                console.log(response);
                                            });
    };

    return (
        <div className="homepagee" style={{ width: "80%", margin: "0 10%" }}>

            <Form name="tempat" form={form}  onFinish={onFinishTempat} autoComplete="off"
                {...formItemLayout}
            >

                <Form.Item
                    name="kota"
                    label="Pilih Kota"
                    hasFeedback
                    rules={[{ required: true, message: 'Harap Pilih Kota!' }]}
                    labelCol={{ span: 4 }}
                    labelAlign="left"
                >
                    <Select>
                        {listKota && listKota.length !== 0 ? listKota.map(kota => (
                            <Option value={kota.id}>{kota.kota}</Option>
                        )) : ""}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="tempat"
                    label="Nama Tempat"
                    rules={[{ required: true, message: 'Nama Tempat kosong' }]}
                    labelCol={{ span: 4 }}
                    labelAlign="left"
                >
                    <Input />
                </Form.Item>

                <Form.Item name="alamat" label="Alamat" labelCol={{ span: 4 }}
                    labelAlign="left" rules={[{ required: true, message: 'Alamat kosong' }]}>
                    <Input.TextArea />
                </Form.Item>



                <Form.Item name="deskripsi" label="Deskripsi" labelCol={{ span: 4 }}
                    labelAlign="left" rules={[{ required: true, message: 'Deskripsi kosong' }]}>
                    <Input.TextArea />
                </Form.Item>


                <Form.Item labelCol={{ span: 4 }} labelAlign="left"
                    name="kategori"
                    label="Pilih kategori"
                    rules={[{ required: true, message: 'tolong pilih salah satu kategori!', type: 'array' }]}
                >
                    <Select mode="multiple" >
                        {listKategori && listKategori.length !== 0 ? listKategori.map(kategori => (
                            <Option value={kategori.kategori}>{kategori.kategori}</Option>
                        )) : ""}
                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout} style={{textAlign:"left",width:"100%"}}>
                    <Button type="primary" htmlType="submit">
                        Submit
      </Button>
                </Form.Item>
            </Form>

        </div>
    )

};

export default Saran;
