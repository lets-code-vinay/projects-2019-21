import React, { Component } from 'react'
import Post from '../Components/Post'
import { connect } from 'react-redux'
import {getAllPostsAction} from '../redux/Actions/postActions' 
import {getLoggedInUserInfo} from '../redux/Actions/userActions'
import {Image} from 'cloudinary-react'
import PhotosUploader from '../Components/photoUploader';
import './styles/Home.css'
import { Link } from 'react-router-dom'
import FriendRequest from '../Components/friendRequests'
import Navbar from '../Components/Navbar'
import SearchModal from '../Components/userSearchModal'



class Postpage extends Component {

    constructor() {
        super()
        this.state = {
             imageAttr : "",
             modalShow : false,
             searchedUsers : []
        }
    }

    
    toPost =() => {
       this.props.getAllPostsAction()
    }


    componentDidMount() {
        this.props.getAllPostsAction()
        this.props.getLoggedInUserInfo(this.props.currentUser._id)
        console.log("mounted")
    }
  
     showUsers = (data) => {
          this.setState({searchedUsers : data})
          this.setState({modalShow : true})
     }
   

    render() {

        
      
      console.log(this.props.Posts[0])
      const Posts = this.props.Posts[0]
      console.log(Posts)
        return (
            <div>
                <Navbar currentUser = {this.props.currentUser} showUsers={this.showUsers}/>
                

                 <div style={{marginTop : "40px"}}>

                 <SearchModal searchedUsers={this.state.searchedUsers}
                 show={this.state.modalShow}
                 onHide={() => this.setState({modalShow : false})}
             />
           
                { 

                    this.props.Posts.length !== 0
                        
                        ?
                        Posts.reverse().map(post =>
                            <div style={{marginTop : "20px"}}>
                             <Post key={post._id} post={post} toPost = {this.toPost}/>
                             </div>)
                        :
                        null }
                        </div>
                        </div>
        
        )



    }
}

const mapState = (state) => {
    return {
        Posts: state.postReducer,
        currentUser : state.userReducer.user
    }
}

const mapDispatch = {
    getAllPostsAction : getAllPostsAction,
    getLoggedInUserInfo : getLoggedInUserInfo
}

export default connect(mapState, mapDispatch)(Postpage)