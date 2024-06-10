import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Actor from './pages/actor/Actor';
import Layout from './components/Layout';
import AddActor from './pages/actor/AddActor';
import Login from './pages/Login';
import EditActor from './pages/actor/EditActor';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/actor/:id',
        element: <Actor/>,
      },
      {
        path: '/add-actor',
        element: <AddActor/>,
      },
      {
        path: '/edit-actor/:id',
        element: <EditActor/>,
      },
      {
        path: '/login',
        element: <Login/>,
      },
    ],
  },
]);
    
export default router;
