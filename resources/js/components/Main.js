import React, { useContext, useLayoutEffect, useState,useEffect } from "react";

import { Form, Input, Button, Space, Divider, Collapse, Select, InputNumber, Table,message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import { capitalize } from "lodash";
import Axios from 'axios';


import { BaseContext } from "./BaseContext";
import './App.scss';


const Main = () => {

  // const { token } = useContext(BaseContext);

  const [listKota, setListKota] = useState(null);
  const [listProvinsi, setListProvinsi] = useState(null);
  const [listTempat, setListTempat] = useState(null);
  const [listKategori, setListKategori] = useState(null);

  const [form_provinsi] = Form.useForm();
  const [form_kota] = Form.useForm();
  const [form_kategori] = Form.useForm();
  const [form_tempat] = Form.useForm();


  useEffect(() => {
    Axios.defaults.xsrfHeaderName = "X-CSRFToken";
    
    // set data provinsi
    Axios({
      method: "get",
      url: "/data/provinsi",
      headers: {      
        "X-CSRF-TOKEN": csrf_token
      }
    })
      .then(response => {
        console.log(response.data.data,"get provinsi");
        setListProvinsi(response.data.data);
      })
      .catch(function (response) {
        console.log(response);
      });

      // set data kota
    Axios({
      method: "get",
      url: "/data/kota",
      headers: {      
        "X-CSRF-TOKEN": csrf_token
      }
    })
      .then(response => {
        console.log(response.data.data,"get kota");
        setListKota(response.data.data);
      })
      .catch(function (response) {
        console.log(response);
      });

       // set data kategori
    Axios({
      method: "get",
      url: "/data/kategori",
      headers: {      
        "X-CSRF-TOKEN": csrf_token
      }
    })
      .then(response => {
        console.log(response.data.data,"get kategori");
        setListKategori(response.data.data);
      })
      .catch(function (response) {
        console.log(response);
      });
    
       // set data tempat
    Axios({
      method: "get",
      url: "/data/tempat",
      headers: {      
        "X-CSRF-TOKEN": csrf_token
      }
    })
      .then(response => {
        console.log(response.data.data,"get tempat");
        setListTempat(response.data.data);
      })
      .catch(function (response) {
        console.log(response);
      });
  
  }, [])


  const { Panel } = Collapse;
  const { Column } = Table;

  const onFinishProvinsi = values => {
    
    let image_url = !values.image_url || values.image_url.length == 0 ? [] : values.image_url;
    console.log(image_url);

    if (values.nama) {
      Axios.defaults.xsrfHeaderName = "X-CSRFToken";

      var bodyFormData = new FormData();
      bodyFormData.append("nama_provinsi", values.nama.toLowerCase());
      bodyFormData.append("image_url", JSON.stringify(image_url));

      Axios({
        method: "post",
        url: "/create/provinsi",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRF-TOKEN": csrf_token
        }
      })
        .then(response => {
          if (response.data.status === "failed") {            
            message.error(response.data.message);
          } else {          
           let neww = listProvinsi ? listProvinsi.slice():[];
           neww.unshift(response.data.data);
            setListProvinsi(neww);           
            message.success(response.data.message);
            form_provinsi.resetFields();
          }

        })
        .catch(function (response) {
          console.log(response);
        });
    }
  };

  const onFinishKota = values => {
    console.log(values);
    let image_url = !values.image_url || values.image_url.length == 0 ? [] : values.image_url;
    if (values.nama) {
      Axios.defaults.xsrfHeaderName = "X-CSRFToken";

      var bodyFormData = new FormData();
      bodyFormData.append("id_provinsi", +values.provinsi);
      bodyFormData.append("nama_kota", values.nama.toLowerCase());
      bodyFormData.append("image_url", JSON.stringify(image_url));

      Axios({
        method: "post",
        url: "/create/kota",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRF-TOKEN": csrf_token
        }
      })
        .then(response => {
          if (response.data.status === "failed") {
            message.error(response.data.message);
          } else {
            let neww = listKota ? listKota.slice():[];
            neww.unshift(response.data.data);
             setListKota(neww);           
             message.success(response.data.message);
             form_kota.resetFields();
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }

  };

  const onFinishKategori = values => {
    console.log('Received values of form:', values.kategori.toLowerCase());


    if (values.kategori) {
      Axios.defaults.xsrfHeaderName = "X-CSRFToken";

      var bodyFormData = new FormData();
      bodyFormData.append("kategori", values.kategori.toLowerCase());

      Axios({
        method: "post",
        url: "/create/kategori",
        data: bodyFormData,
        headers: {      
          "X-CSRF-TOKEN": csrf_token
        }
      })
        .then(response => {
          if (response.data.status === "failed") {
            message.error(response.data.message);
          } else {
           
            let neww = listKategori?listKategori.slice():[];
            neww.unshift(response.data.data);
            
             setListKategori(neww);           
             message.success(response.data.message);
             form_kategori.resetFields();
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }


  };


  const onFinishTempat = values => {
    console.log('Received values of form:', values);

    let image_url = !values.image_url || values.image_url.length == 0 ? [] : values.image_url;
    if (values.kota) {
      Axios.defaults.xsrfHeaderName = "X-CSRFToken";

      var bodyFormData = new FormData();    
      bodyFormData.append("id_kota", +values.kota);
      bodyFormData.append("nama_tempat", values.tempat.toLowerCase());
      bodyFormData.append("alamat", values.alamat);
      bodyFormData.append("biaya", values.Budget);
      bodyFormData.append("hashtag", values.hastag);
      bodyFormData.append("deskripsi",  values.deskripsi);
      bodyFormData.append("id_kategori", values.kategori);
      bodyFormData.append("image_url", JSON.stringify(image_url));

      Axios({
        method: "post",
        url: "/create/tempat",
        data: bodyFormData,
        headers: {        
          "X-CSRF-TOKEN": csrf_token
        }
      })
        .then(response => {
          if (response.data.status === "failed") {
            message.error(response.data.message);
          } else {
            let neww = listTempat?listTempat.slice():[];
            neww.unshift(response.data.data);            
             setListTempat(neww);           
            console.log(response.data.data);
             message.success(response.data.message);
             form_tempat.resetFields();
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }


  };






  return (
    <div className="container slashed">
      <h3 className="hed">Inputan Section</h3>

      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="Inputan Provinsi" key="1" className="site-collapse-custom-panel">

          {/* inputan provinsi */}
          <Form form={form_provinsi} name="dynamic_form_nest_item" onFinish={onFinishProvinsi} autoComplete="off"  >
            <Form.Item
              name="nama"
              label="Nama Provinsi"
              placeholder="Nama Provinsi"
              rules={[{ required: true, message: 'Nama provinsi kosong' }]}
              labelCol={{ span: 4 }}
              labelAlign="left"
            >
              <Input placeholder="Nama provinsi" />
            </Form.Item>
            <Form.List name="image_url">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8, width: '100%' }} align="baseline">
                      <Form.Item
                        {...field}                        
                        label="Link Foto"
                        fieldKey={[field.fieldKey, 'first']}
                        rules={[{ required: true, message: 'nama provinsi kosong' }]}

                        labelAlign="left"
                      >
                        <Input placeholder="Masukkan link foto" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item wrapperCol={{ span: 4 }}>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Tambah Inputan Foto
              </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
            </Form.Item>
          </Form>

        </Panel>
        <Panel header="Inputan Kota" key="2" className="site-collapse-custom-panel">
          <Form form={form_kota} name="kota" onFinish={onFinishKota} autoComplete="off">
            <Form.Item
              name="provinsi"
              label="Pilih Provinsi"
              hasFeedback
              rules={[{ required: true, message: 'Harap pilih Provinsi!' }]}
              labelCol={{ span: 4 }}
              labelAlign="left"
            >
              <Select placeholder="Pronvisi">
              {listProvinsi&&listProvinsi.length !== 0? listProvinsi.map(provinsi=>(
                <Option value={provinsi.id}>{provinsi.provinsi}</Option>
              )) :""}
                
              </Select>
            </Form.Item>
            <Form.Item
              name="nama"
              label="Nama Kota"
              rules={[{ required: true, message: 'Nama Kota kosong' }]}
              labelCol={{ span: 4 }}
              labelAlign="left"
            >
              <Input placeholder="Nama Kota" />
            </Form.Item>
            <Form.List name="image_url">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        
                        label="Link Foto"
                        fieldKey={[field.fieldKey, 'first']}
                        rules={[{ required: true, message: 'nama provinsi kosong' }]}
                        labelAlign="left"
                      >
                        <Input placeholder="Masukkan link foto" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item wrapperCol={{ span: 4 }}>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Tambah Inputan Foto
              </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
            </Form.Item>
          </Form>

        </Panel>


        <Panel header="Inputan kategori" key="3" className="site-collapse-custom-panel">
          <Form form={form_kategori} name="kategori" onFinish={onFinishKategori} autoComplete="off">
            <Form.Item
              name="kategori"
              rules={[{ required: true, message: 'Nama kategori kosong' }]}
              labelCol={{ span: 4 }}
              labelAlign="left"
            >
              <Input placeholder="Nama kategori" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
            </Form.Item>
          </Form>

        </Panel>


        <Panel header="Inputan Tempat Wisata" key="4" className="site-collapse-custom-panel">

          <Form form={form_tempat} name="tempat" onFinish={onFinishTempat} autoComplete="off">
          
            <Form.Item
              name="kota"
              label="Pilih Kota"
              hasFeedback
              rules={[{ required: true, message: 'Harap Pilih Kota!' }]}
              labelCol={{ span: 4 }}
              labelAlign="left"
            >
              <Select placeholder="Kota">
              {listKota&&listKota.length !== 0? listKota.map(kota=>(
                <Option value={kota.id}>{kota.kota}</Option>
              )) :""}
              </Select>
            </Form.Item>

            <Form.Item
              name="tempat"
              label="Nama Tempat"
              rules={[{ required: true, message: 'Nama Tempat kosong' }]}
              labelCol={{ span: 4 }}
              labelAlign="left"
            >
              <Input placeholder="Nama Tempat" />
            </Form.Item>

            <Form.Item name="alamat" label="Alamat" labelCol={{ span: 4 }}
              labelAlign="left" rules={[{ required: true, message: 'Alamat kosong' }]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Estimasi Biaya" labelCol={{ span: 4 }}
              labelAlign="left">
              <Form.Item name="Budget" noStyle
                rules={[{ required: true, message: 'Biaya kosong' }]}

              >
               <Input.TextArea />
              </Form.Item>        
            </Form.Item>

            <Form.Item
              name="hastag"
              label="Nama hastag"
              rules={[{ required: true, message: 'Nama hastag kosong' }]}
              labelCol={{ span: 4 }}
              labelAlign="left"
            >
              <Input placeholder="contoh (banyak input pake koma): kudus,semarang,gunung," />
            </Form.Item>

            <Form.Item name="deskripsi" label="Deskripsi" labelCol={{ span: 4 }}
              labelAlign="left" rules={[{ required: true, message: 'Deskripsi kosong' }]}>
              <Input.TextArea />
            </Form.Item>


            <Form.Item
        name="kategori"
        label="Pilih kategori"
        rules={[{ required: true, message: 'Please select one kategory!', type: 'array' }]}
      >
        <Select mode="multiple" placeholder="Please select category">
        {listKategori&&listKategori.length !== 0? listKategori.map(kategori=>(
                <Option value={kategori.id}>{kategori.kategori}</Option>
              )) :""}
        </Select>
      </Form.Item>


            <Form.List name="image_url">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        
                        label="Link Foto"
                        fieldKey={[field.fieldKey, 'first']}
                        rules={[{ required: true, message: 'nama provinsi kosong' }]}
                      >
                        <Input placeholder="Masukkan link foto" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item wrapperCol={{ span: 4 }}>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Tambah Inputan Foto
              </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
            </Form.Item>
          </Form>

        </Panel>
      </Collapse>

      <h3 className="hedd">Check Table </h3>

      <Collapse
        bordered={false}
        defaultActiveKey={['5']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        className="site-collapse-custom-collapse"
      >
        <Panel header="Table Provinsi" key="5" className="site-collapse-custom-panel">
          {listProvinsi? <Table dataSource={listProvinsi}>
            <Column
              title="Nama Provinsi"
              dataIndex="provinsi"
              key="provinsi"
  
            />
            <Column
              title="Foto"
              dataIndex="foto"
              key="foto"
              render={foto=>{return foto&&foto.length>30? foto.split('').slice(0,15).join(''):foto}}
            />
          </Table>:""} 

        </Panel>

        <Panel header="Table kota" key="6" className="site-collapse-custom-panel">
        {listKota? <Table dataSource={listKota}>
            <Column
              title="Nama Provinsi"
              dataIndex="provinsis_id"
              key="provinsis_id"
              render={id=>
              
              listProvinsi.filter(provinsi=> +provinsi.id===+id)[0].provinsi }

            />
            <Column
              title="Nama Kota"
              dataIndex="kota"
              key="kota"

            />
            <Column
              title="Foto"
              dataIndex="foto"
              key="foto"
              render={urls=>{
                
              }}

            />
          </Table>:""}

        </Panel>


        <Panel header="Table Kategori" key="7" className="site-collapse-custom-panel">
        {listKategori? <Table dataSource={listKategori}>
            <Column
              title="Nama Kategori"
              dataIndex="kategori"
              key="kategori"
            />


          </Table>:""}     

        </Panel>

        <Panel header="Table Tempat" key="8" className="site-collapse-custom-panel">
          {listTempat?<Table dataSource={listTempat}>
            <Column
              title="Nama Kota"
              dataIndex="kota"
              key="kota"
             
            />
            <Column
              title="Nama Tempat"
              dataIndex="tempat"
              key="tempat"
            />
            <Column
              title="Alamat"
              dataIndex="alamat"
              key="alamat"
            />
            <Column
              title="Foto"
              dataIndex="foto"
              key="foto"
            />
            <Column
              title="Biaya"
              dataIndex="biaya"
              key="biaya"
            />
            <Column
              title="Hashtag"
              dataIndex="hashtag"
              key="hashtag"
            />
            <Column 
              title="Deskripsi"
              dataIndex="deskripsi"
              key="deskripsi"
            />

          </Table>:""}

        </Panel>
      </Collapse>


    </div>

  );
};

export default Main;
