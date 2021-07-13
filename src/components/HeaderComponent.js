import React from 'react';
import { Container } from 'react-bootstrap';

function HeaderComponent() {
    return (
        <div>
            <Container className="my-5 text-center">
                <h2 style={{backgroundColor:"orange"}}>Aplikasi Penampil Data</h2>
            </Container>
        </div>
    )
}

export default HeaderComponent;
