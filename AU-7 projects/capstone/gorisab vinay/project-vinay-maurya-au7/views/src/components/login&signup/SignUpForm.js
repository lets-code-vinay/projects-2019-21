import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Toast, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import { registerNewUser } from "../../redux/actions/auth-actions/registerNewUser";
import nariyal from '../../images/nariyal.png';

// form validation useing Yup
const validate = () =>
  Yup.object({
    username: Yup.string()
      .min(2, "Must be more than one character")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("This field is required"),
    verifyPassword: Yup.string()
      .min(8, "Must be more than 8 characters")
      .required("This field is required"),
    firstName: Yup.string()
      .min(2, "Must be more than one character")
      .required("This field is required"),
    lastName: Yup.string()
      .min(2, "Must be more than one character")
      .required("This field is required"),
    email: Yup.string()
      .email("Please enter a vaild email")
      .required("This field is required")
  });

function SignUpForm(props) {
  const dispatch = useDispatch();

  const signUp = user => {
    dispatch(registerNewUser(user))
      .then(res => {
        toast.success(res, {
          position: toast.POSITION.BOTTOM_LEFT,
          transition: Slide
        });
        props.history.push("/");
      })
      .catch(err => {
        toast.error(err, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: false
        });
      });
  };
  return (
    <Container fluid>
      <Row style={{backgroundColor: "#F4F0DA"}}>
      <Col md={7} className="signupLeft">
      
        <img src={nariyal} alt="Nariyal pani"/>
        </Col>
      
      <Col md={5} className="signupRight">
      <Formik
        initialValues={{
          username: "",
          password: "",
          verifyPassword: "",
          firstName: "",
          lastName: "",
          email: ""
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting }) => {
          const newUser = {
            username: values.username,
            password: values.password,
            verifyPassword: values.verifyPassword,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email
          };

          signUp(newUser);

          setSubmitting(false);
        }}>
        <div className='signup-form'>
          <Container>
            <Row style={{margin:"0px"}}>
              <Col sm='12' lg='7' className='main-col' style={{padding:"0px", width:"80%"}}>
                <div className='form-container'style={{width: "150%", marginLeft:"-20%"}}>
                  <Form className='form-horizontal'>
                    {/* username input */}
                    <div className='form-group'>
                      <span className='input-icon'>
                        <i className='fa fa-user'></i>
                      </span>
                      <Field
                        name='username'
                        className='form-control'
                        placeholder='Enter username'
                      />
                      <ErrorMessage component={Toast} name='username' />
                    </div>
                    <Row>
                      <Col>
                        <div className='form-group'>
                          <span className='input-icon'>
                            <i className='fa fa-user'></i>
                          </span>
                          <Field
                            type='password'
                            name='password'
                            className='form-control'
                            placeholder='Enter password'
                          />
                          <ErrorMessage component={Toast} name='password' />
                        </div>
                      </Col>
                      <Col>
                        <div className='form-group'>
                          <span className='input-icon'>
                            <i className='fa fa-user'></i>
                          </span>
                          <Field
                            type='password'
                            name='verifyPassword'
                            className='form-control'
                            placeholder='Re Enter password'
                          />
                          <ErrorMessage component={Toast} name='verifyPassword' />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className='form-group'>
                          <span className='input-icon'>
                            <i className='fa fa-user'></i>
                          </span>
                          <Field
                            name='firstName'
                            className='form-control'
                            placeholder='Enter your firstName'
                          />
                          <ErrorMessage component={Toast} name='firstName' />
                        </div>
                      </Col>
                      <Col>
                        <div className='form-group'>
                          <span className='input-icon'>
                            <i className='fa fa-user'></i>
                          </span>
                          <Field
                            name='lastName'
                            className='form-control'
                            placeholder='Enter your lastName'
                          />
                          <ErrorMessage component={Toast} name='lastName' />
                        </div>
                      </Col>
                    </Row>
                    <div className='form-group'>
                      <span className='input-icon'>
                        <i className='fa fa-user'></i>
                      </span>
                      <Field
                        name='email'
                        className='form-control'
                        placeholder='Enter a valid email'
                      />
                      <ErrorMessage component={Toast} name='email' />
                    </div>
                    <div className='forgot-pass'>
                      Already have account, <Link to='/login'>Log in</Link>
                    </div>
                    <Button variant='primary' type='submit'>
                      Register{" "}
                    </Button>{" "}
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Formik>
      </Col>
      </Row>
      
    </Container>
  );
}

export default SignUpForm;
