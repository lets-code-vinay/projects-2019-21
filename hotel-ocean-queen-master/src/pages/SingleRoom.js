import React, {Component} from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context'
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
    constructor(props){
        super(props);
        console.log(this.props)
        this.state={
            slug:this.props.match.params.slug,
            defaultBcg: defaultBcg
        }
    }
 
static contextType= RoomContext;
    // componentDidMount(){
    //         console.log('component did mount', this.props)
    // }

    render(){
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        console.log('checking rendering singleroom', room);
if(!room){
    return <div className="error">
        <h2>  no such room found!!!</h2>
        <Link t0 ='/rooms' className="btn-primary" >Back to rooms</Link>
    </div>

}
const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
const [mainImg, ...defaultImg] = images;
   console.log('consoling single room default inage', defaultImg);
    return(
        <>
        <StyledHero img={mainImg || this.state.defaultBcg } >
            <Banner title={`${name} room`}>
                <Link to="/rooms" className="btn-primary">Back To rooms</Link> 
            </Banner>
        </StyledHero>            
        <section className="single-room">
            <div className='single-room-images'>
                {defaultImg.map((item, index) => {
 return              <img key={index} src={item} alt={name}/>
                })}

            </div>
                <div clasName="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description} </p>
                    </article>

                    <article className="info">
                        <h3>info</h3>
                        <h6>price : ${price} </h6>
                        <h6>Size : ${size}SQFT </h6>
                        <h6>Max Capacity :{
                            capacity > 1 ? `${capacity} people`: `${capacity} person`} </h6>
                        <h6>{pets ? "Pets Allowed" : "no Pets allowed" }</h6>
                        <h6> {breakfast && "free breakfast included"}</h6>
                    </article>
                </div>
        </section>
        <section className="room-extras">
                        <h6>Extras</h6>
                        <ul>
                            {extras.map((item, index)=>{
                                return <li key={index}>- {item}</li>
                            })}
                        </ul>
        </section>

    </>
        );
    }
}