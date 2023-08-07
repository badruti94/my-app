import {
    Navbar,
    Nav,
    NavItem,
} from 'reactstrap';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()

    const isLogin = localStorage.getItem('login')

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }
    const navElement = <Nav className="me-auto">
        <NavItem>
            <Link className='nav-link link-warning fw-bold' to={'/item'}>Item</Link>
        </NavItem>
        <NavItem>
            <Link className='nav-link link-warning fw-bold' to={'/#'} onClick={handleLogout}>Log out</Link>
        </NavItem>
    </Nav>
    return (
        <div>
            <Navbar color='secondary' >
                {isLogin ? navElement : <Nav><NavItem><Link> &nbsp;</Link></NavItem></Nav>}
            </Navbar>
        </div>
    )
}

export default Header