import React, { useContext, useLayoutEffect,useState } from "react";

import { Form, Input, Button, Space, Divider, Collapse,Select, InputNumber,} from 'antd';
import { MinusCircleOutlined, PlusOutlined, CaretRightOutlined } from '@ant-design/icons';
import { capitalize } from "lodash";
import Axios from 'axios';


import { BaseContext } from "./BaseContext";
import './App.scss';


const Main = () => {

  // const { token } = useContext(BaseContext);

  const [listKota,setListKota] = useState(null);
  const [listProvinsi,setListProvinsi] = useState(null);
  const [listTempat,setListTempat] = useState(null);

  const { Panel } = Collapse;

  const onFinishProvinsi = values => {
    console.log('Received values of form:', values);
    let image_url = !values.image_url || values.image_url.length ==0 ? []:  values.image_url;
console.log(image_url);

    if(values.nama){
      Axios.defaults.xsrfHeaderName = "X-CSRFToken";

      var bodyFormData = new FormData();
      bodyFormData.append("nama_provinsi",_.startCase(_.toLower(values.nama)));  
      bodyFormData.append("image_url",JSON.stringify(image_url));  

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
                  message.success(response.data.message);                  
              }
              
          })
          .catch(function (response) {
              console.log(response);
          });
    }    
  };

  const onFinishKota = values => {

    let image_url = !values.image_url || values.image_url.length ==0 ? []:  values.image_url;
    if(values.nama){
      Axios.defaults.xsrfHeaderName = "X-CSRFToken";

      var bodyFormData = new FormData();
      bodyFormData.append("nama_provinsi",_.startCase(_.toLower(values.provinsi)));  
      bodyFormData.append("nama_kota",_.startCase(_.toLower(values.nama)));  
      bodyFormData.append("image_url",JSON.stringify(image_url));  

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
                  message.success(response.data.message);                  
              }              
          })
          .catch(function (response) {
              console.log(response);
          });
    }    
   
  };
  const onFinishTempat = values => {
    console.log('Received values of form:', values);

    let image_url = !values.image_url || values.image_url.length ==0 ? []:  values.image_url;
    if(values.kota){
      Axios.defaults.xsrfHeaderName = "X-CSRFToken";

      var bodyFormData = new FormData();
      bodyFormData.append("nama_provinsi",_.startCase(_.toLower(values.provinsi)));  
      bodyFormData.append("nama_kota",_.startCase(_.toLower(values.kota)));  
      bodyFormData.append("nama_tempat",_.startCase(_.toLower(values.tempat)));  
      bodyFormData.append("alamat",values.alamat);  
      bodyFormData.append("budget",values.Budget); 
      bodyFormData.append("deskripsi",values.deskripsi);  
      bodyFormData.append("image_url",JSON.stringify(image_url));  

      Axios({
          method: "post",
          url: "/create/tempat",
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
                  message.success(response.data.message);                  
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
          <Form name="dynamic_form_nest_item" onFinish={onFinishProvinsi} autoComplete="off"  >
            <Form.Item
              name="nama"
              label="Nama Provinsi"
              placeholder="Nama Provinsi"
              rules={[{ required: true, message: 'Nama provinsi kosong' }]}
              labelCol={{span:4}}
              labelAlign="left"
            >
              <Input placeholder="Nama provinsi" />
            </Form.Item>
            <Form.List name="image_url">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8,width:'100%' }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'first']}
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
          <Form name="kota" onFinish={onFinishKota} autoComplete="off">
            <Form.Item
              name="provinsi"
              label="Pilih Provinsi"
              hasFeedback
              rules={[{ required: true, message: 'Harap pilih Provinsi!' }]}
              labelCol={{span:4}}
              labelAlign="left"
            >
              <Select placeholder="Pronvisi">
                <Option value="china">China</Option>                
              </Select>
            </Form.Item>
            <Form.Item
              name="nama"
              label="Nama Kota"              
              rules={[{ required: true, message: 'Nama Kota kosong' }]}
              labelCol={{span:4}}
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
                        name={[field.name, 'first']}
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
        <Panel header="Inputan Tempat Wisata" key="3" className="site-collapse-custom-panel">

        <Form name="tempat" onFinish={onFinishTempat} autoComplete="off">
            <Form.Item
              name="provinsi"
              label="Pilih Provinsi"
              hasFeedback
              rules={[{ required: true, message: 'Harap Pilih Provinsi!' }]}
              labelCol={{span:4}}
              labelAlign="left"
            >
              <Select placeholder="Pronvisi">
                <Option value="china">China</Option>                
              </Select>
            </Form.Item>
            <Form.Item
              name="kota"
              label="Pilih Kota"
              hasFeedback
              rules={[{ required: true, message: 'Harap Pilih Kota!' }]}
              labelCol={{span:4}}
              labelAlign="left"
            >
              <Select placeholder="Kota">
                <Option value="china">Bekasi</Option>                
              </Select>
            </Form.Item>
            <Form.Item
              name="tempat"
              label="Nama Tempat"              
              rules={[{ required: true, message: 'Nama Tempat kosong' }]}
              labelCol={{span:4}}
              labelAlign="left"
            >
              <Input placeholder="Nama Tempat" />
            </Form.Item>
            <Form.Item name="alamat" label="Alamat"   labelCol={{span:4}}
              labelAlign="left" rules={[{ required: true, message: 'Alamat kosong' }]}>
        <Input.TextArea />        
      </Form.Item>

      <Form.Item label="Estimasi Biaya" labelCol={{span:4}}
              labelAlign="left">
        <Form.Item name="Budget" noStyle 
        rules={[{ required: true, message: 'Biaya kosong' }]}
        
        >
          <InputNumber min={1000} />
        </Form.Item>
        <span className="ant-form-text"> Rupiah</span>
      </Form.Item>

            <Form.Item name="deskripsi" label="Deskripsi"   labelCol={{span:4}}
              labelAlign="left" rules={[{ required: true, message: 'Deskripsi kosong' }]}>
        <Input.TextArea />        
      </Form.Item>


            <Form.List name="image_url">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'first']}
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


    </div>

  );
};

export default Main;
