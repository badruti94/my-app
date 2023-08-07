import React, { useState } from 'react'
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from 'reactstrap'
import Layout from '../components/Layout'
import { API } from '../config/api'
import { useNavigate } from 'react-router-dom'
import { SwalFire, SwalLoading } from '../utils/Swal'

const LoginPage = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const swalLoading = SwalLoading()

        try {
            console.log('tesss');
            const result = await API.post('/login', formData)
            swalLoading.close()
            localStorage.setItem('login', true)
            localStorage.setItem('token', result.data.data.token)
            localStorage.setItem('username', result.data.data.user.username)

            navigate('/item')
        } catch (error) {
            swalLoading.close()
            SwalFire('error', error.response.data.message)
        }
    }

    return (
        <Layout>
            <Card
                style={{
                    width: '25rem',
                    margin: '5rem auto',
                }}
            >
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="password"
                                type="password"
                                valid={formData.password}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <Button color='success' type='submit'>
                            Login
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </Layout>
    )
}

export default LoginPage