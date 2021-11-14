import React, {Component} from 'react';
import Title from './Title.js'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'

export default class Services extends Component{
   state={
       services:[
           {
               icon:<FaCocktail/>,
               title:"Free Cocktails",
               info:"Some gibrish and random text only testing i am using here, and hopefiully it will looks good"
           },
           {
            icon:<FaHiking/>,
            title:"Endless Hikings",
            info:"Some gibrish and random text only testing i am using here, and hopefiully it will looks good"
        },
        {
            icon:<FaShuttleVan/>,
            title:"Free ShuttleVan",
            info:"Some gibrish and random text only testing i am using here, and hopefiully it will looks good"
        },
        {
            icon:<FaBeer/>,
            title:"Strong Antique Beer",
            info:"Some gibrish and random text only testing i am using here, and hopefiully it will looks good"
        }
        ]
   }
   
    render(){
        return(
            <section className="services">
                <Title title="services"/>
                <div className="services-center">
                    {this.state.services.map((item, index)=>{
                        return <article key={index} className="services">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article> 
                    })}
                </div>
            </section>
        )
    }
}