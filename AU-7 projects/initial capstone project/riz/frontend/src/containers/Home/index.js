import React from 'react';
import Layout from '../../components/Layout';
import {Jumbotron, Row, Container, Col} from 'react-bootstrap';
import './style.css'
const Home = (props) =>{
    
    return(
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar" ><b>Side Bar</b></Col>
                    <Col md={10} style={{marginLeft:'auto'}}>Main Body</Col>
                </Row>
            </Container>


                {/* <Jumbotron className="text-center" style={{margin: '5rem',backgroundColor:'white'}}>
                <h1>Welcome to admin dashboard</h1>
                <p>This is random para just for testing pursone. i will delete ut soom . now these i am watcjing new web series of Bobby deol named AASHRAM which is related to hypocrisy of modern babas how they are making fools</p>
                </Jumbotron>
             */}
            
            
        </Layout>
    )
}

export default Home;