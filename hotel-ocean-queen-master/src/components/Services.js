import React, {Component} from 'react';
import Title from './Title';
import {FaCocktail,FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';  

export default class Services extends Component {
    state={
            services:[
                {
                    icon:<FaCocktail />,
                    title:"Free cocktail",
                    info:"Cocktail Testing icon and other stuufs =, only and only testing aqualute bootllle box us not a jagya.."
                },
                {
                    icon:<FaHiking />,
                    title:"On the mountains",
                    info:"On the mountains,Testing icon and other stuufs =, only and only testing aqualute bootllle box us not a jagya.."
                },
                {
                    icon:<FaShuttleVan />,
                    title:"To and From ride",
                    info:" 4X4 Testing icon and other stuufs =, only and only testing aqualute bootllle box us not a jagya.."
                },
                {
                    icon:<FaBeer />,
                    title:"Strong and Antique Beer",
                    info:"Dounble Malter Testing icon and other stuufs =, only and only testing aqualute bootllle box us not a jagya.."
                }
            ]  
    };
    render(){
        return(
            <section className="services">
                <Title title="service" />
                <div className="services-center">
                    {this.state.services.map((item, index)=>{
                        return (
                            <article className="service" key={index} >
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                        )
                    })}
                </div>
            </section>

            )        
    }
 }