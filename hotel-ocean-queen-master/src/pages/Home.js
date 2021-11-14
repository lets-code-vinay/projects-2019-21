import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom'
import FeaturedRooms from '../components/FeaturedRoom';
import Button from '../components/StyledHero'
import Services from '../components/Services';

const Home = () => {
    return(
        <div>
            <Hero hero="defaultHero">
                <Banner title="Luxurious Room" subtitle="Delux rooms at $299">
                    <Link to="/rooms" className="btn-primary" > Our Rooms</Link>
                </Banner>
            </Hero>
            <Services />
            <FeaturedRooms />

        </div>
    )
}

export default Home;