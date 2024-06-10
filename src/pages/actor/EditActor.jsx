import React, { useState, useEffect } from 'react';
import { Input, Select, Upload, Button, Form, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function EditActor() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { id } = useParams();
  const [actor, setActor] = useState([]);
  const [loading, setLoading] = useState(true);

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
    console.log(formData);
    try {
      const response = await axios.post(`http://92.46.41.236:8000/api/actor-update/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Actor profile added successfully!');
      form.resetFields();
      setFileList([]);
      location.href = "/"
    } catch (error) {
      console.log(error.response); 
    }
  };

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`http://92.46.41.236:8000/api/actor/${id}`);
              let fetchedData = response.data;
              setActor(fetchedData);
              setLoading(false);
          } catch (error) {
              console.log(error)
          }
      }
      fetchData();
  }, []);

  
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const dateValidator = (rule, value) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!value || dateRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Дата рождения должна быть в формате YYYY-MM-DD');
  };

  return (
    <>
    {loading === false && (
    <div className="flex">
      <div className="sm:w-[1200px] w-full sm:mx-auto">
        <a href="/">Назад</a>
        <div className="roboto-light text-2xl">Изменить {actor.name}</div>
        <Form
          form={form}
          layout="vertical"
          className="sm:grid sm:grid-cols-2 sm:gap-x-5 mt-5"
          onFinish={handleSubmit}
          initialValues={{
            name: actor.name || '',
            surname: actor.surname || '',
            age: actor.age || '',
            sex: actor.sex || '',
            birth_date: actor.birth_date || '',
            height: actor.height || '',
            weight: actor.weight || '',
            hair_color: actor.hair_color || '',
            type: actor.type || '',
            clothes_size: actor.clothes_size || '',
            language: actor.language || '',
            city: actor.city || '',
            filming_experience: actor.filming_experience || '',
            inst_link: actor.inst_link || '',
            video_link: actor.video_link || '',
            comment: actor.comment || ''
          }}
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
              <Option value="м">Мужской</Option>
              <Option value="ж">Женский</Option>
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
          <Form.Item label="Рост" name="height">
            <Input placeholder="Введите рост" />
          </Form.Item>
          <Form.Item label="Вес" name="weight">
            <Input placeholder="Введите вес" />
          </Form.Item>
          <Form.Item label="Цвет волос" name="hair_color"> <Input placeholder="Введите цвет волос" /> </Form.Item>
          <Form.Item label="Типаж" name="type">
            <Input placeholder="Введите типаж" />
          </Form.Item>
          <Form.Item label="Размер одежды" name="clothes_size">
            <Input placeholder="Введите размер одежды" />
          </Form.Item>
          <Form.Item label="Язык" name="language">
            <Input placeholder="Введите языки" />
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
            <Button className="w-full sm:w-96 bg-black" type="primary" htmlType="submit">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    )}
    </>
  );
}
