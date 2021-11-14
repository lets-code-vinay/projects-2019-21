import React ,{useState, useEffect}from 'react'
import { postLiked, sendComment } from '../redux/Actions/postActions'
import {connect} from 'react-redux'
import {Image} from 'cloudinary-react'
import {useSelector} from 'react-redux'
import ProfileButton from './profileButton'
import  Button  from '@material-ui/core/Button';
import  TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {storePostsInRedux} from '../redux/Actions/postActions'
import { CodeSharp } from '@material-ui/icons'

const Post = (props) =>  {
    

    const dispatch = useDispatch()
         
    const {post} = props

    const [isLiked, setIsLiked] = useState(false)
    const [isComment, setIsComment] = useState(false)
    const [commentText, setCommentText] = useState("")
    const currentUser = useSelector(state => state.userReducer.user)
    const [likes, setLikes] = useState(0)
   
   useEffect(()=> {
       setLikes(post.Likes)
   }, [])

     
   const postStyle = {
       padding : "50px",
       marginLeft : "300px",
       boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.4)",
       width : "630px"
   }


  const handleLike = () => {
      if(!isLiked) {
        setLikes(likes+1)

        setIsLiked(true) 
      axios({
        method : "post",
        url : "/liked",
        data : {
            post : post._id,
            userName : currentUser.userName,
            profilePic : currentUser.profilePic,
            userId : currentUser._id 
        }
    })
}
    else {
        setIsLiked(false)
        setLikes(likes-1)
        axios({
            method : "post",
            url : "/unLiked",
            data : {
                post : post._id,
                userName : currentUser.userName,
                profilePic : currentUser.profilePic,
                userId : currentUser._id 
            }
        })

    }
      

  }

  const handleComment = () => {
      (!isComment) ? 
       setIsComment(true) : setIsComment(false)
  }



  const handleCommented = () => {
      setCommentText("")
      axios({
          method : "post",
          url : "/comment",
          data : {
              commentText : commentText,
              post : post._id,
              userName : currentUser.userName,
              profilePic : currentUser.profilePic,
              userId : currentUser._id 
          }
      }).then(function(response) {
          console.log(response.data)
          dispatch(storePostsInRedux(response.data))
      } )

  }
       







       return(


        <div style= {postStyle}>
         <div style={{width : "100px"}}>
        <div style={{display : "grid", gridTemplateColumns : "auto auto", gridGap : "300px"}}>

        
         <ProfileButton user={post.user} /> 
        <div>
        {/* <div> {String(post.DateTime).slice(0,10)}</div> */}
        <img src="https://img.icons8.com/cute-clipart/64/000000/clock.png" width="40px" height="40px"/>
        <span>{String(post.DateTime).slice(11,16)}</span>
        </div>
        </div>
         </div>
        <h5 style ={{margin : "40px"}}>{post.postText}</h5>
        <Image cloudName = "prakhar-parashar" publicId = {post.assetId} width="500px" height="500px"/>
       <div style={{display : "grid", margin: "40px",gridTemplateColumns : "auto auto", gridGap : "200px"}}>
       




       <Button variant="contained" color = "primary" onClick = {handleComment}>Comments</Button>
       
       <button style={{outline : "none"}} onClick={handleLike}> {(!isLiked) ? <> <img src="https://img.icons8.com/carbon-copy/100/000000/filled-like.png" width="40px" height="40px"/></>
       :
       <img src="https://img.icons8.com/plasticine/100/000000/filled-like.png" width="40px" height="40px"/> }
           <span>{likes}</span></button>
       </div>




       <div>
           {

           (isComment) ? 
           <>
       <TextField
          id="filled-textarea"
          label="Comment"
          placeholder="Share your opinion about this post"
          multiline
          variant="filled"
          style = {{width : "400px"}}
          value = {commentText}
         onChange = {(e) => {setCommentText(e.target.value) }}
        />

        
        <Button onClick={handleCommented}  variant="contained" color="primary" size="small" >Comment</Button>
        
           <div style={{marginLeft : "100px", marginTop : "50px"}}>
           {post.Comments.map(comment => <div>

               <div style={{display :"grid", gridTemplateColumns : "auto auto"}}>
               <div>
            
            <Link to={{ pathname: '/userProfile', state: { user: comment.userId} }}>
                       
                        <div id="userInfo">
                  
                            <Image id="profilePic" publicId={comment.profilePic} width="50" height="50"  cloudName="prakhar-parashar"/>
                             <div>
                            <h5 style={{marginTop : "20px"}} id="userName">{comment.userName}</h5>
                            
                            </div>
                        </div>
                        </Link>
                           
                        <p>{comment.commentText}</p>

                        </div>
                         


                        </div>
                        
                        <hr></hr>


           </div>)}
           </div>
           

        </>
        
        
        : null
           }
       </div>


       
    


        
        
        
        
    </div>
       )
   }






const passDispatchMethodsToProps = {
    postLiked : postLiked,
    sendComment : sendComment
}
    



 export default connect (null, passDispatchMethodsToProps)(Post)