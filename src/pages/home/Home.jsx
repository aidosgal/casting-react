import { useState, useEffect } from 'react';
import { MdOutlineMovie } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { Space, Switch, Table } from 'antd';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import * as XLSX from 'xlsx';
import { useRef } from 'react';

const columns = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    width: 100,
  },
  {
    title: 'Фамилия',
    dataIndex: 'surname',
    key: 'surname',
    fixed: 'left',
    width: 150, 
  },
  {
    title: 'Возраст',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Дата рождения',
    dataIndex: 'birth_date',
    key: 'birth_date',
  },
  {
    title: 'Пол',
    dataIndex: 'sex',
    key: 'sex',
  },
  {
    title: 'Рост',
    dataIndex: 'height',
    key: 'height',
  },
  {
    title: 'Вес',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Цвет волос',
    dataIndex: 'hair_color',
    key: 'hair_color',
  },
  {
    title: 'Типаж',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Размер одежды',
    dataIndex: 'clothes_size',
    key: 'clothes_size',
  },
  {
    title: 'Язык',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'Город',
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Опыт работы',
    dataIndex: 'filming_experience',
    key: 'filming_experience',
  },
  {
    title: 'Инстраграм',
    dataIndex: 'inst_link',
    key: 'inst_link',
  },
  {
    title: 'Ссылка на видео',
    dataIndex: 'video_link',
    key: 'video_link',
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'Действие',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (_, record) => <a href={`/actor/${record.id}`}>Перейти</a>,
  },
];

const columnTranslations = {
  name: 'Имя',
  surname: 'Фамилия',
  age: 'Возраст',
  sex: 'Пол',
  height: 'Рост',
  weight: 'Вес',
  hair_color: 'Цвет волос',
  type: 'Типаж',
  clothes_size: 'Размер одежды',
  language: 'Язык',
  city: 'Город',
  filming_experience: 'Опыт работы',
  inst_link: 'Инстраграм',
  video_link: 'Ссылка на видео',
  comment: 'Комментарий',
  birth_date: 'Дата рождения',
  id: "ID"
};

export default function Home() {
  const [data, setData] = useState([]);
  const selectedRowsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/actor-list/');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const exportData = selectedRowsRef.current.length > 0 ? selectedRowsRef.current : data;
  
    const translatedData = exportData.map(item => {
      const translatedItem = {};
      Object.keys(item).forEach(key => {
        translatedItem[columnTranslations[key]] = item[key];
      });
      return translatedItem;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(translatedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Models");
    XLSX.writeFile(workbook, "models.xlsx");
  };
  

  return (
    <div className="roboto-regular">
      <div className="text-2xl">Таблица учета моделей</div> 
      <div className="flex gap-5 text-sm">
        <button 
          className="mt-5 bg-black text-white px-10 py-2 rounded-lg"
          onClick={() => location.href = '/add-actor'}
        >Добавить</button>
        <button
          className="mt-5 border border-black px-10 py-2 rounded-lg"
          onClick={handleExport}
        >Выгрузить Excel</button>
      </div>
      <input placeholder="Поиск..." className="mt-4 border border-gray-300 rounded-lg px-5 w-full py-2"/>
      <div className="flex">
        <Table
          columns={columns}
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              selectedRowsRef.current = selectedRows;
            },
          }}
          dataSource={data}
          className="mt-5"
          pagination={{ pageSize: 6 }}
          scroll={{
            x: 3000,
          }}
          rowKey="id"
        />      
        <div className="w-full">
          <div>Фильтры</div>
        </div>
      </div>
    </div>
  );
}
