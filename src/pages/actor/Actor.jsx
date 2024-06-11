import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'antd';
import axios from 'axios';

export default function Actor() {

  const { id } = useParams();

    const [ actor, setActor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [aimages, setAimages] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://92.46.41.236:8000/api/actor/${id}`);
        const data = await response.json();
        setActor(data);
        setAimages(data.images);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

    const handleDelete = async () => {
        try{
            const response = await axios.delete(`http://92.46.41.236:8000/api/actor-delete/${id}`);
            console.log(response)
            if(response.status === 200){
                location.href="/"
            }
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div>
        <a href="/">Назад</a> 
        <div className="sm:hidden">
        {loading ? (
            <div>Загрузка</div>
        ) : (
        <Carousel className="py-5">
                {aimages.map(item => (
                    <div>
                        <img className="w-full h-[500px] object-cover" src={`http://92.46.41.236:8000/${item.image}`} />
                        <a className="w-full mt-5 block text-center py-2 border border-black rounded-lg" href={`http://92.46.41.236:8000/${item.image}`} download>Сохранить</a>
                    </div>
                ))}
        </Carousel>
        )}
        </div>
        <div className="sm:gap-5 hidden sm:flex">
        {loading == true ? (
            <div>Загрузка</div>
        ) : (
            <>
                {aimages.map(item => (
                <div>
                    <img className="w-96 h-[500px] object-cover" src={`http://92.46.41.236:8000/${item.image}`} />
                    <a className="w-96 mt-5 block text-center py-2 border border-black rounded-lg" href="#">Сохранить</a>
                </div>
                ))}
            </>
        )}
        </div>
        <div className="flex gap-5">
            <button className="w-full bg-black text-white rounded-lg py-2" onClick={() => location.href=`/edit-actor/${id}`}>Изменить</button>
            <button className="w-full border border-black text-black rounded-lg py-2" onClick={handleDelete}>Удалить</button>
        </div>
        <p className="text-black text-xl sm:mt-5 mt-5">{actor.name} {actor.surname}</p>
        <div className="sm:grid sm:grid-cols-2 sm:gap-5">
            <p className="text-gray-500">Дата рождения: <span className="text-black">{actor.birth_date}</span></p>
            <p className="text-gray-500">Возраст: <span className="text-black">{actor.age}</span></p>
            <p className="text-gray-500">Пол: <span className="text-black">{actor.sex}</span></p>
            <p className="text-gray-500">Рост: <span className="text-black">{actor.height}</span></p>
            <p className="text-gray-500">Вес: <span className="text-black">{actor.weight}</span></p>
            <p className="text-gray-500">Тип: <span className="text-black">{actor.type}</span></p>
            <p className="text-gray-500">Цвет волос: <span className="text-black">{actor.hair_color}</span></p>
            <p className="text-gray-500">Размер одежды: <span className="text-black">{actor.clothes_size}</span></p>
            <p className="text-gray-500">Язык: <span className="text-black">{actor.language}</span></p>
            <p className="text-gray-500">Город: <span className="text-black">{actor.city}</span></p>
            <p className="text-gray-500">Опыт съемок: <span className="text-black">{actor.filming_experience}</span></p>
            <p className="text-gray-500">Ссылка на Instagram: <span className="text-black"><a href={actor.inst_link}>{actor.inst_link}</a></span></p>
            <p className="text-gray-500">Ссылка на видео: <span className="text-black"><a href={actor.video_link}>{actor.video_link}</a></span></p>
            <p className="text-gray-500">Комментарий: <span className="text-black">{actor.comment}</span></p>
          </div>
    </div>
  );
}
