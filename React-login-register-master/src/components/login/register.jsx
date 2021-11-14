import React from 'react';
import registerImg from "../../images/girlwithcomp.png"


export class Register extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                <div className="base-container" ref={this.props.containerRef}>
                    <div className="header">Register</div>
                        <div className="content">
                            <div className="image">
                                <img src ={registerImg} />
                            </div>
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="userName">username</label>
                                    <input type="text" name="username" placeholder="Enter Username"/>
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" placeholder="Enter Email"/>
                                </div>
                            </div>
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" placeholder="Enter password"/>
                                </div>
                            </div>
                    </div>
                    <div className="footer">
                        <button type="button" className="btn">Register</button>
                    </div>
                </div>
        )
    }
} 