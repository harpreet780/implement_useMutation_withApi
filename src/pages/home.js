import axios from 'axios';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Input, Label } from 'reactstrap';

const Home = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleApi = async (data) => {
        return axios.post('https://dummyjson.com/auth/login', data).then((res)=> 
        console.log(res.data,"resss"))
        .catch((error)=>{
            console.log(error)
        })
    }
    const { isLoading, isError, error, mutate } = useMutation((data) => handleApi(data))
    const handleSubmit = (data) => {
         data = {
            username: formData.username,
            password: formData.password
        }
        mutate(data)
        console.log(data,"data")
    }
    return (
        <div className="pageWrapper">
            <div className="formWrap">
                <h2 className='text-center text-decoration-underline'>Form With UseMutation</h2>
                <Label>Username:</Label>
                <Input
                    type="username"
                    name="username"
                    className="input"
                    value={formData.username}
                    onChange={(e) => handleData(e)}
                />
                <Label>Password:</Label>
                <Input
                    type="password"
                    name="password"
                    className="input"
                    value={formData.password}
                    onChange={(e) => handleData(e)}
                />
                <div className='d-flex justify-content-center align-items-center'>
                    <button className='submitBtn profileBtn'
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
                {isLoading ? <p className="text-center mt-3"><em>"no found data"</em></p> : null}
                {
                    isError
                        ? <p className="text-center mt-3"><em>"something wrong"</em></p> : ""
                }
            </div>
        </div>
    )
}

export default Home