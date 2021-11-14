import * as React from 'react';
import TextField from '@material-ui/core/TextField'
import './styles/basicInfo.css'
import Button from '@material-ui/core/Button'
import {useState} from 'react'



 class WorkAndEducation extends React.Component {
      

    state = {
         moreField : false,
         Position : "",
         companyName : "",
         pastExperiences : "",
         Education1 : "",
         institutionName1 : "",
         Education2 : "",
         institutionName2 : ""
    }
    

    handlePositionChange = (event) => {
        this.setState({ Position: event.target.value });
    };

    handleCompanyNameChange = (event) => {
        this.setState({ companyName: event.target.value });
    };

    handlepastExperiencesChange = (event) => {
        this.setState({ pastExperiences: event.target.value });
    };

    handleEducation1Change = (event) => {
        this.setState({ Education1: event.target.value });
    };

    handleInstitutionName1Change = (event) => {
        this.setState({ institutionName1: event.target.value });
    };
    

    handleEducation2Change = (event) => {
        this.setState({ Education2: event.target.value });
    };

    handleInstitutionName2Change = (event) => {
        this.setState({ institutionName2: event.target.value });
    };
     

    componentWillUnmount() {
        this.props.getValues(this.state)
    }

    render() {

        return (
            <div>
            
            <TextField  label="Position" variant="outlined" onChange = {this.handlePositionChange}/>
            <TextField id="outlined-basic" label="Company Name" variant="outlined" onChange = {this.handleCompanyNameChange}/>
            <hr></hr>
            <TextField id="currentCity" label="Past Experiences" variant="outlined" onChange = {this.handlepastExperiencesChange}/>
            <hr></hr>
            <TextField  label="Education" variant="outlined" onChange = {this.handleEducation1Change}/>
            <TextField id="outlined-basic" label="Institution Name" variant="outlined" onChange = {this.handleInstitutionName1Change}/>
            <Button onClick={() => this.setState({moreField : true})}>Add More</Button>
            <hr></hr>
            {(this.state.moreField) &&
            <div>
            <TextField  label="Education" variant="outlined" onChange = {this.handleEducation2Change}/>
            <TextField id="outlined-basic" label="Institution Name" variant="outlined" onChange = {this.handleInstitutionName2Change}/>
            </div>
            }
            
            
        </div>
    
        )

    }
   
}

export default WorkAndEducation