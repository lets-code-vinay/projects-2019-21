import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Page404 from "./../404";
import DashboardSidebar from "./DashboardSidebar";
import Loader from "react-loader-spinner";
import icecream from '../../images/icecream.jpg'

function Dashboard() {
  const { user, loading } = useSelector(state => state.userrr);

  if (!user && !loading) {
    return <Page404 />;
  } else {
    return (
      <Container fluid className='welcome-dashboard'>
        <Row>
          <Col md='5'>
            <DashboardSidebar />
          </Col>
          {user && (
            <Col className='welcome'>

              {" "}

              <h1>Welcome, {user.firstName}</h1>
                            <img className="dashBoardImage" src={icecream}/>
            </Col>
          )}
          {loading && (
            <Col className='welcome'>
              <Loader
                type='Hearts'
                color='#123'
                height={100}
                width={100}
                className='spinner'
              />
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
