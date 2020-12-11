import React, { useState, useContext } from "react";
import { Layout, Menu, message, Button } from "antd";
import { BaseContext } from "./BaseContext";
import {
    AimOutlined,
    HomeOutlined,
    CaretRightOutlined,
    GithubOutlined,
    CopyrightOutlined,
    MailOutlined,
    InstagramOutlined,
    WhatsAppOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./App.scss";
import Axios from "axios";
import Logo from './pernahke.png'

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutContent = props => {
    const [collapsed, setCollapsed] = useState(false);

    const { token, setToken, setUser, user } = useContext(BaseContext);

    return (
        <div className="layoutt">
            <nav className="navbarr">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} />
                    </Link>
                    <div className="logo-text">
                        <h1 style={{textAlign:"left",width:"100%",fontWeight:"bolder"}}>
                            PernahKe
                        </h1>
                        <p style={{fontStyle:"italic"}}>Tempat sharing pengalaman wisata di Indonesia </p>
                    </div>
                </div>
                <div className="userr">
                    <ul>
                        {token ? (
                            <li>
                                <Button
                                    primary
                                    style={{backgroundColor:"#32324e",color:"#fff",textTransform:"uppercase",fontStyle:"italic"}}
                                    onClick={() => {
                                        Axios.defaults.xsrfHeaderName =
                                            "X-CSRFToken";

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
                                                if (
                                                    response.data.status ===
                                                    "failed"
                                                ) {
                                                    message.error(
                                                        response.data.message
                                                    );
                                                } else {
                                                    message.success(
                                                        response.data.message
                                                    );
                                                    localStorage.clear();
                                                    setToken("");
                                                    setUser("");
                                                }
                                            })
                                            .catch(function(response) {
                                                console.log(response);
                                            });
                                    }}
                                >
                                    Logout
                                </Button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login">
                                    <Button primary  style={{backgroundColor:"#32324e",color:"#fff",textTransform:"uppercase",fontStyle:"italic"}}>Login</Button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            <div className="containerr">{props.children}</div>
            <footer>
                <div className="footer">
                    <div className="footer-section">
                        <p className="footer-title">Kontak kami</p>
                        <p className="footer-icon">
                            <a href="mailto:hwijaya91@gmail.com"><MailOutlined /> hwijaya91@gmail.com</a>
                        </p>
                        <p className="footer-icon">
                            <a href="mailto:junio.akarda26@gmail.com"><MailOutlined /> junio.akarda26@gmail.com</a>
                        </p>
                    </div>
                    <div className="footer-section">
                        <p className="footer-title">Social Media</p>
                        <p className="footer-icon">
                           <a href="https://www.instagram.com/jun.akarda/" target="_blank"><InstagramOutlined /> Juuni26</a> 
                        </p>
                        <p className="footer-icon">
                           <a href="https://wa.me/qr/6AN3MPFDJHBMK1" target="_blank"><WhatsAppOutlined /> 08129230983 (Handi)</a>
                        </p>
                    </div>
                </div>
                <h5 className="footer-middle">pernahke @2020</h5>
            </footer>
        </div>
        // <Layout style={{ minHeight: "100vh" }}>
        //   <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        //     <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        //       <Menu.Item key="1" icon={<HomeOutlined />}>
        //         <Link to="/">Home</Link>
        //       </Menu.Item>
        //       <SubMenu key="sub1" icon={<CaretRightOutlined />} title="Movie">
        //         <Menu.Item key="2">
        //           <Link to="/movie_list">Movie List</Link>
        //         </Menu.Item>
        //         {token ? (
        //           <Menu.Item key="3">
        //             <Link to="/movie_editor">Movie Editor</Link>
        //           </Menu.Item>
        //         ) : (
        //             ""
        //           )}
        //       </SubMenu>
        //       <SubMenu key="sub2" icon={<AimOutlined />} title="Game">
        //         <Menu.Item key="4">
        //           <Link to="/game_list">Game List</Link>
        //         </Menu.Item>
        //         {token ? (
        //           <Menu.Item key="5">
        //             <Link to="/game_Editor">Game Editor</Link>
        //           </Menu.Item>
        //         ) : (
        //             ""
        //           )}
        //       </SubMenu>
        //     </Menu>
        //   </Sider>

        //   <Layout className="site-layout" login={token}>
        //     <HeaderLayout login={token} user={user} />
        //     <Content style={{ background: "#14274e", padding: "1px 0" }} >{props.children}</Content>
        //     <Footer style={{
        //       textAlign: "center", color: '#f1f6f9',
        //       backgroundColor: '#14274e',  height: "10vh"
        //     }}>
        //       <footer>
        //         <span><Link to={{ pathname: "https://github.com/juuni26" }} target="_blank"><GithubOutlined />Junio Akarda </Link> <CopyrightOutlined /> 2020 </span>
        //       </footer>
        //     </Footer>
        //   </Layout>
        // </Layout>
    );
};

export default LayoutContent;
