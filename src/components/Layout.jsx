import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
            <footer
                className='bg-secondary text-center fw-bold py-2'
                style={{ marginTop: '15rem' }} >
                <p>Badru &copy; 2023</p>
            </footer>
        </React.Fragment>
    )
}

export default Layout