import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Actor() {

  const { id } = useParams();

  const [ actor, setActor] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/actor/${id}`);
        const data = await response.json();
        setActor(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{id}</h1>
      <p>{actor.name}</p>
    </div>
  );
}
