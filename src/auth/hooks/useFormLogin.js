import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { datos } from '../controller'

export const useFormLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPasword] = useState('')
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChangeDatas = (e) => {
    (e.target.name === 'email')
      ? setEmail(e.target.value)
      : setPasword(e.target.value)
  }

  const handleLogin = (e) => {
    setLoading(true)
    e.preventDefault();
    setTimeout(async () => {
      try {
        const { token } = await datos({
          email,
          password,
        })

        token
          ? setTimeout(() => {
            setLoading(false);
            localStorage.setItem('user', JSON.stringify(token));
            navigate('coffee');
          }, 2000)
          : setTimeout(() => {
            setLoading(false);
          }, 2000);

      } catch (e) {
        setLoading(false);
        setEmail('');
        setPasword('');
        setMessage(e.response.data?.msg === undefined ? e.response.data?.err.errors[0].msg : e.response.data?.msg);
        setTimeout(() => {
          setMessage();
        }, 3000);
      }
    }, 100);
  }

  return {
    loading,
    password,
    email,
    message,
    handleChangeDatas,
    handleLogin,
  }
}
