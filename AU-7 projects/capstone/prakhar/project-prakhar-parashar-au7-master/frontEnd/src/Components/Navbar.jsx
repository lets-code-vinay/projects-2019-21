import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom'
import {Image} from 'cloudinary-react'
import CreatePost from './CreatePost'
import Requests from './Requests'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import  Button  from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    marginLeft : "40px",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const classes = useStyles();


  const [modalShow, setModalShow] = useState(false);

  const [searchText, setSearchText] = useState("")

  const handleChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearch = () => {
    setModalShow(true) 
    
    axios({

      method : "post",
      url : "/searchUser",
      data : {
        userName : searchText
      }

    }).then(function(response){
      props.showUsers(response.data)
      
    })
  }
  let history = useHistory()
  const handleLogout = () => {
    history.push("/")
      localStorage.clear()
      

  }


  return (
    <>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              
              <SearchIcon />
            
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
                 onChange = {handleChange}/>
                 
          </div>
          <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>

          
          <Typography className={classes.title} variant="h6" noWrap>
            ConnectUS
          </Typography>

                       
                <CreatePost id="createPost"/>

                <Link to={"home"} activeClassName="active"><img src="https://img.icons8.com/bubbles/50/000000/home-page.png"/></Link>  

                <Requests/>

                
             
                 

          <div style={{marginRight : "150px"}}>
          <Link to={{ pathname: '/userProfile', state: { user: props.currentUser._id} }}>
                    <button id="profileButton">
                        <div style={{display : "grid", gridTemplateColumns : "auto auto", gridGap : "25px"}}>
                            <Image publicId={props.currentUser.profilePic} width="40" height="40" radius="100" cloudName="prakhar-parashar"/>
                            <h5>{props.currentUser.userName}</h5>
                        </div>
                    </button>
                    </Link>
                    </div>
                    <Button onClick={handleLogout} variant="contained" color="primary">Logout</Button>
         
        </Toolbar>
      </AppBar>
     
    </div>
    </>
  );
}
