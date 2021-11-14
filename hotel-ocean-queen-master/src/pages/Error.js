import React from 'react';
import Hero from '../components/Hero'
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
export default function Error(){
    return(
    <div>
        <Hero >
            <Banner className="banner" title="404  " subtitle="!!! Oops no page found !!!">
                <Link to='/' className="btn-primary">Return to HomePage</Link>
            </Banner>    
        </Hero>
    </div>)
}