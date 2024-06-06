import { useState, useEffect } from 'react';
import { MdOutlineMovie } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { Space, Switch, Table } from 'antd';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import * as XLSX from 'xlsx';

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
    render: () => <a>Изменить</a>,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default function Home() {

  const [data, setData] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch('http://127.0.0.1:8000/api/actor-list/')
        .then((resp) => resp.json())
        .then(function(data){
          setData(data);
        })
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); 

  const handleExport = () => {
    const exportData = data;
    const worksheet = XLSX.utils.json_to_sheet(exportData);
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
        <button onClick={handleExport} className="mt-5 border border-black px-10 py-2 rounded-lg">Выгрузить Excel</button>
      </div>
      <Table
        columns={columns}
        rowSelection={{
          ...rowSelection,
        }}
        dataSource={data}
        className="mt-5"
        scroll={{
          x: 3000,
        }}
      />      
    </div>
  );
}
