import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/Layout';
import {Form, Col, Row, Button, Container} from 'react-bootstrap';
import Input from '../../components/UI/Input/index';
import { signup } from '../../actions';

const Signup = (props) =>{
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState('');

    const dispatch = useDispatch()

    const userSignup = (e) =>{
        e.preventDefault();

        const user ={
            firstName, lastName, email, password
        }
        dispatch(signup(user));
    }
    if(auth.authenticate){
        return <Redirect to={`/`}/>
    }
    if(user.loading){
        return <p>Loading...</p>
    }

    return(
        <>
            <Layout>
            <Container>
                {user.message}
               <Row style={{marginTop:'50px'}}>
                   <Col md={{span:6, offset:3}}>
                   <Form onSubmit={userSignup}>
                       <Row>
                           <Col md={6}>
                            <Input 
                                controlId="formBasicEmail" 
                                label="First Name" 
                                type="text"
                                value={firstName}
                                onChange={(e) =>setFirstName(e.target.value)} 

                                placeholder="Enter your first name"/>
                           </Col>

                           <Col md={6}>
                            <Input 
                                constrolId="formBasicEmail" 
                                label="Last Name" 
                                type="text"
                                value={lastName}
                                placeholder="Enter Your last name"
                                onChange= {(e) =>setLastName(e.target.value)}
                                />
                           </Col>
                           
                       </Row>
                    <Input 
                        controlId="formBasicEmail" 
                        label="Email Address" 
                        type="email" 
                        value={email}
                        placeholder="Enter your Email" 
                        onChange={(e)=>setEmail(e.target.value)}
                        />

                    <Input 
                        controlId="formBasicPassword"
                        label="Password"
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) =>setPassword(e.target.value)}
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

export default Signup;