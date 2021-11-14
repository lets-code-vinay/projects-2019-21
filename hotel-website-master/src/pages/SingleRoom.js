import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero' 
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../Context'
import { description } from 'joi';
//import Navbar from '../components/Navbar'

export default class SingleRoom extends Component{
    constructor(props){
        super(props)
  //      console.log(this.props)
        this.state={
            slug:this.props.match.params.slug,
            defaultBcg
        };
}
static contextType = RoomContext;
//    componentDidMount(){ }
    render(){
        const {getRoom} = this.comtext;
        const room = getRoom(this.state.slug);
        console.log(room )
        if(!room){
            return( <div className="error">
                <h2>No room found</h2>
            <Link to="/" className="btn-primary">Back to rooms</Link>
            </div>
            );
        }
        const {name,description,capacity, size, price,extras, breakfast, pets, images} = room;
        return(
            <Hero hero="roomsHero" >
                <Banner title={`${name} room`}>
                     <Link to='/room' className="btn-primary" >Back to rooms</Link>
                </Banner>
            </Hero>
        )
        }
}
