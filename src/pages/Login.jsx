import { useState, useEffect } from 'react';
import { Button, Form, Input, Checkbox } from 'antd';

export default function Login() {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(login === 'admin' && password === 'admin'){
      localStorage.setItem('isAuth', true);
      location.href = '/';
    }
  }, [login, password]);

  return (
    <div className="flex h-[700px]">
      <div className="mx-auto my-auto">
        <div className="text-center mb-10">Авторизация</div>
        <Form
          name="basic"
          initialValues={{ remember: true }} 
          className="mx-auto w-72"
        >
          <Form.Item
            name="username"
            onChange={(e) => setLogin(e.target.value)}
            rules={[{ required: true, message: 'Введите логин!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
