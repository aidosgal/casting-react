import React, { useState } from 'react';
import { Input, Select, Upload, Button, Form, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function AddActor() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ file, fileList }) => {
    setFileList(fileList);
    return false;
  };

  const handleSubmit = async (values) => {
    console.log('Form Values:', values); // Log the form values to the console
    const formData = new FormData();
    for (const key in values) {
      if (key != 'uploaded_image') {
        formData.append(key, values[key]);
      }
    }

    fileList.forEach((file, index) => {
      console.log(file)
      formData.append(`uploaded_images[${index}]`, file.originFileObj);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/actor-create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Actor profile added successfully!');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.log(error.response); 
    }
  };
 

  const dateValidator = (rule, value) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!value || dateRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Date must be in the format YYYY-MM-DD');
  };

  return (
    <div className="flex">
      <div className="w-[1200px] mx-auto">
        <a href="/">Назад</a>
        <div className="roboto-light text-2xl">Добавить профиль</div>
        <Form
          form={form}
          layout="vertical"
          className="grid grid-cols-2 gap-x-5 mt-5"
          onFinish={handleSubmit}
        >
          <Form.Item label="Имя" name="name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item label="Фамилия" name="surname" rules={[{ required: true, message: 'Please enter the surname' }]}>
            <Input placeholder="Введите фамилию" />
          </Form.Item>
          <Form.Item label="Возраст" name="age" rules={[{ required: true, message: 'Please enter the age' }]}>
            <Input placeholder="Введите возраст" />
          </Form.Item>
          <Form.Item label="Пол" name="sex" rules={[{ required: true, message: 'Please select the gender' }]}>
            <Select placeholder="Выберите пол">
              <Option value="male">Мужской</Option>
              <Option value="female">Женский</Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="Дата рождения" 
            name="birth_date" 
            rules={[
              { required: true, message: 'Please enter the birth date' },
              { validator: dateValidator }
            ]}
          >
            <Input placeholder="Введите дату рождения в формате YYYY-MM-DD" />
          </Form.Item>
          <Form.Item label="Фото" name="uploaded_image">
            <Upload
              multiple
              beforeUpload={handleUpload}
              fileList={fileList}
              onRemove={(file) => {
                setFileList(fileList.filter((item) => item.uid !== file.uid));
              }}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Рост" name="height">
            <Input placeholder="Введите рост" />
          </Form.Item>
          <Form.Item label="Вес" name="weight">
            <Input placeholder="Введите вес" />
          </Form.Item>
          <Form.Item label="Цвет волос" name="hair_color">
            <Input placeholder="Введите цвет волос" />
          </Form.Item>
          <Form.Item label="Типаж" name="type">
            <Input placeholder="Введите типаж" />
          </Form.Item>
          <Form.Item label="Размер одежды" name="clothes_size">
            <Input placeholder="Введите размер одежды" />
          </Form.Item>
          <Form.Item label="Язык" name="language">
            <Select placeholder="Выберите язык">
              <Option value="Русский">Русский</Option>
              <Option value="Английский">Английский</Option>
              <Option value="Казахский">Казахский</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Город" name="city">
            <Input placeholder="Введите город" />
          </Form.Item>
          <Form.Item label="Опыт" name="filming_experience">
            <Input placeholder="Введите опыт" />
          </Form.Item>
          <Form.Item label="Инстаграм" name="inst_link">
            <Input placeholder="Введите ссылку на инстаграм" />
          </Form.Item>
          <Form.Item label="Видео" name="video_link">
            <Input placeholder="Введите ссылку на видео" />
          </Form.Item>
          <Form.Item label="Описание" name="comment">
            <TextArea placeholder="Введите описание" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button className="w-96 bg-black" type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}