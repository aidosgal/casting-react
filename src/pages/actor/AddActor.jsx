import { useState, useEffect } from 'react';
import { Input, Select, Upload, Button, Form, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function AddActor() {
  return (
    <div className="flex">
      <div className=" w-[1200px] mx-auto">
        <a href="/">Назад</a>
        <div className="roboto-light text-2xl">Добавить профиль</div>
        <Form layout="vertical" className="grid grid-cols-2 gap-x-5 mt-5">
          <Form.Item label="Имя" name="name">
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item label="Фамилия" name="surname">
            <Input placeholder="Введите фамилию" />
          </Form.Item>
          <Form.Item label="Возраст" name="age">
            <Input placeholder="Введите возраст" />
          </Form.Item>
          <Form.Item label="Пол" name="sex">
            <Select placeholder="Выберите пол">
              <Option value="male">Мужской</Option>
              <Option value="female">Женский</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Фото" name="photo">
            <Upload>
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
            <Button className="w-96 bg-black" type="primary">Добавить</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
