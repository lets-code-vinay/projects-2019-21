import * as React from 'react';
import TextField from '@material-ui/core/TextField'
import './styles/basicInfo.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import {connect} from 'react-redux'




class BasicInfo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            FirstName: "",
            LastName: "",
            CurrentCity: "",
            MobileNo: "",
            gender: "",
            newEmail: ""
        }
    }



    componentWillUnmount() {
        
        this.props.getValues(this.state)
    }




    handleFirstNameChange = (event) => {
        this.setState({ FirstName: event.target.value });

    }

    handleLastNameChange = (event) => {
        this.setState({ LastName: event.target.value });
    }

    handleCurrentCityChange = (event) => {
        this.setState({ CurrentCity: event.target.value });
    }

    handleMobileNoChange = (event) => {
        this.setState({ MobileNo: event.target.value });
    }


    handleGenderChange = (event) => {
        this.setState({ gender: event.target.value });
    };

    handleNewEmailChange = (event) => {
        this.setState({ newEmail: event.target.value });
    }

    
    componentWillUnmount(){
        this.props.getValues(this.state)
    }

    render() {


        return (
            <div>

                <TextField label="FirstName" variant="outlined" onChange={this.handleFirstNameChange} />
                <TextField id="outlined-basic" label="LastName" variant="outlined" onChange={this.handleLastNameChange} />
                <hr></hr>
                <TextField id="currentCity" label="CurrentCity" variant="outlined" onChange={this.handleCurrentCityChange} />
                <hr></hr>
                <TextField id="MobileInput" label="MobileNo" variant="outlined" onChange={this.handleMobileNoChange} />

                <InputLabel id="demo-customized-select-label" style={{ display: "inline" }}>Gender</InputLabel>
                <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={this.state.gender}
                    onChange={this.handleGenderChange}

                >
                    <MenuItem value="Male"><img src="https://img.icons8.com/bubbles/50/000000/male.png"/></MenuItem>
                    <MenuItem value="Female"><img src="https://img.icons8.com/bubbles/50/000000/female.png"/></MenuItem>
                    <MenuItem value="Other"><img src="https://img.icons8.com/dusk/64/000000/gender-equality.png" width="40px" height="40px"/></MenuItem>
                </Select>
                <hr></hr>
                <TextField id="currentCity" label="newEmail" variant="outlined" onChange={this.handleNewEmailChange} defaultValue={this.props.email} />

            </div>

        )
    }
}

const mapState = (state) => {
    return {
        email : state.userReducer.user.email
    }
    
} 

export default connect(mapState, null)(BasicInfo)