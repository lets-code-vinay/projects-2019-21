import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { Redirect } from 'react-router-dom';
import {login} from '../../actions';

const Signin = (props) =>{
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");  
    const [error, setError ] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    

    const userLogin = (e) => {
        e.preventDefault();

        const user = {
            email,password
        }
        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to = {`/`}/>
    }
    return(
     <>
        <Layout>
           <Container>
               <Row style={{marginTop:'50px'}}>
                   <Col md={{span:6, offset:3}}>
                   <Form onSubmit = {userLogin}> 
                       <Input 
                        controlId="formBasicEmail"
                        label="Email Address"
                        type="email"
                        value ={email}
                        placeholder="Enter your Email address"
                        classNmae="text-muted"
                        
                        onChange={(e)=> setEmail(e.target.value)}
                       />

                <Input 
                    controlId="formBasicPassword"
                    label="Password"
                    type="password"
                    value={password}
                    placeholder="Enter your password here"
                    className="text-muted"
                    onChange={(e) => setPassword(e.target.value)}
                />


                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
                   
                   </Col>
               </Row>
            </Container> 
        </Layout>
     </>

        )
}
export default Signin