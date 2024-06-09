import { useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Slider, Select } from 'antd';
import axios from 'axios';
import * as XLSX from 'xlsx';

const { Search } = Input;
const { Option } = Select;

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
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    age: [0, 100],
    language: "",
    height: [100, 250],
    weight: [30, 150],
    sex: ""
  });
  const selectedRowsRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://92.46.41.236:8000/api/actor-list/');
        console.log(response)
        let fetchedData = response.data;

        // Apply filters
        fetchedData = fetchedData.filter(item =>
          item.age >= filters.age[0] && item.age <= filters.age[1] &&
          item.height >= filters.height[0] && item.height <= filters.height[1] &&
          item.weight >= filters.weight[0] && item.weight <= filters.weight[1]
        );

        if (filters.language) {
          fetchedData = fetchedData.filter(item => item.language.toLowerCase().includes(filters.language.toLowerCase()));
        }
        if (filters.sex) {
          fetchedData = fetchedData.filter(item => item.sex.toLowerCase().includes(filters.sex.toLowerCase()));
        }

        // Apply search
        if (search) {
          fetchedData = fetchedData.filter(item =>
            Object.values(item).some(val =>
              String(val).toLowerCase().includes(search.toLowerCase())
            )
          );
        }

        setData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, filters]);

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

  const handleFilterChange = (key, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
  };

  return (
    <div className="roboto-regular">
      <div className="text-2xl">Таблица учета моделей</div>
      <div className="flex gap-5 text-sm">
        <Button 
          className="mt-5"
          type="primary"
          onClick={() => location.href = '/add-actor'}
        >Добавить</Button>
        <Button
          className="mt-5"
          onClick={handleExport}
        >Выгрузить Excel</Button>
      </div>
      <Search
        placeholder="Поиск..."
        className="mt-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="p-5 mt-5 border border-gray-300 rounded-lg">
        <div>Фильтры</div>
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <div>Возраст</div>
            <Slider
              range
              min={0}
              max={100}
              value={filters.age}
              onChange={(value) => handleFilterChange("age", value)}
            />
          </div>
          <div className="flex-1">
            <div>Рост</div>
            <Slider
              range
              min={100}
              max={250}
              value={filters.height}
              onChange={(value) => handleFilterChange("height", value)}
            />
          </div>
          <div className="flex-1">
            <div>Вес</div>
            <Slider
              range
              min={30}
              max={150}
              value={filters.weight}
              onChange={(value) => handleFilterChange("weight", value)}
            />
          </div>
          <div className="flex-1">
            <div>Пол</div>
            <Select
              className="w-full"
              placeholder="Пол"
              value={filters.sex}
              onChange={(value) => handleFilterChange("sex", value)}
            >
              <Option value="">Все</Option>
              <Option value="male">Мужской</Option>
              <Option value="female">Женский</Option>
            </Select>
          </div>
          <div className="flex-1">
            <div>Язык</div>
            <Select
              className="w-full"
              placeholder="Язык"
              value={filters.language}
              onChange={(value) => handleFilterChange("language", value)}
            >
              <Option value="">Все</Option>
              <Option value="russian">Русский</Option>
              <Option value="english">Английский</Option>
              <Option value="other">Другой</Option>
            </Select>
          </div>
        </div>
      </div>
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
    </div>
  );
}
