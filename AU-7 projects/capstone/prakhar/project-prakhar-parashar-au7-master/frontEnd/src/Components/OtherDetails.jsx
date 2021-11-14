import * as React from 'react';
import TextField from '@material-ui/core/TextField'
import './styles/basicInfo.css'
import { useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { useState } from 'react'
import Button from '@material-ui/core'

class OtherDetails extends React.Component {
    

    state = {
      hobbies : [],
      currentHobbie : "",
      relationshipStatus : "",
      randomVal : 0
    }





   

   handleHobbieChange = (event) => {
    this.setState({currentHobbie : event.target.value})

  }
 
  

   handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.setState({hobbies : [...this.state.hobbies, this.state.currentHobbie]})
      this.setState({currentHobbie : ""})
      event.target.value = ""
    }

  }
  
  deleteHobby = (event) => {
    this.state.hobbies.splice( event.currentTarget.id, 1)
    this.setState({hobbies : this.state.hobbies})
    this.state.randomVal = this.state.randomVal+1
    this.setState({randomVal : this.state.randomVal})    
  }
  
  handleRelationshipStatusChange = (event) => {
    this.setState({relationshipStatus : event.target.value});
  };

  componentWillUnmount() {
    this.props.getValues(this.state)
  }

  
  render() {
  return (
    <div style={{ marginBottom: "50px" }}>

      <InputLabel id="demo-customized-select-label" style={{ display: "inline" }}>Relationship Status</InputLabel>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={this.state.relationshipStatus}
        onChange={this.handleRelationshipStatusChange}>

        <MenuItem value="Single"><img src="https://img.icons8.com/bubbles/50/000000/salary-male.png" /></MenuItem>
        <MenuItem value="Commited"><img src="https://img.icons8.com/bubbles/50/000000/couple-lock.png" /></MenuItem>
        <MenuItem value="It's Complicated"><img src="https://img.icons8.com/emoji/48/000000/woman-shrugging.png" width="35px" height="35px"/></MenuItem>
      </Select>

      <hr></hr>

      <div id="Hobbies" style={{ position: "relative" }}>
      <h3>Got Hobbies?</h3>
      <TextField label="Add Hobby" variant="outlined" onChange={this.handleHobbieChange} onKeyPress={this.handleKeyPress} />
      <br></br> <br></br>

      {this.state.hobbies.map((hobbie, index) => <div key = {index} style={{ display: "inline" }}><div style={{ display: "inline", padding: "10px", borderRadius: "50px", backgroundColor: "#ccffff", border: "1px solid blue" }}>&nbsp; &nbsp;{hobbie}&nbsp; &nbsp;
      <button onClick={this.deleteHobby} style={{padding: "0", margin: "0"}} id={index} ><img src="https://img.icons8.com/doodle/48/000000/delete-sign.png" width="20px" height="20px"/></button>
      </div>&nbsp; &nbsp; &nbsp; &nbsp;</div>)}

      </div>


    </div>

  )
}
}
export default OtherDetails