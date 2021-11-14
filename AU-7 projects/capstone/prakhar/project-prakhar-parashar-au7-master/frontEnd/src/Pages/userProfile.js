import React, { useEffect, useState } from 'react'
import './styles/userProfile.css'
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'cloudinary-react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Coverflow from 'react-coverflow';
import Post from '../Components/Post'
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar'


const UserProfile = (props) => {

    const [profileInfo, setProfileInfo] = useState({})
    const [userPosts, setUserPosts] = useState([])
    const [userPhotos, setUserPhotos] = useState([])
    const currentUser = props.location.state.user
   const userLoggedIn = useSelector(state => state.userReducer.user)
   const [addFriend, setAddFriend] = useState(false)

    useEffect(() => {
        console.log(currentUser)
        axios.get('/getProfile', {
            params: {
                userId: currentUser
            }
        })
            .then(function (response) {

                console.log(response.data)
                if(response.data.profileInfo !== null) {
                    const { basicInfoValues, workAndEducationValues, otherDetailsValues, userId} = response.data.profileInfo
                
                setProfileInfo({ ...profileInfo, ...basicInfoValues, ...workAndEducationValues, ...otherDetailsValues, ...userId, ...response.data.profileInfo})
                setUserPosts(response.data.posts)
                const photos = response.data.posts.filter(post =>   post.assetId !== "")
                console.log(photos)
                setUserPhotos(photos)
                    
                }
                
                })

          
                

            
    }, [])

    const handleAddFriend = () => {
        console.log(userPosts)
        setAddFriend(true)

           axios({
               method : "post",
               url : "/friendRequest",
               data : {
                   sender : userLoggedIn._id,
                   reciever : profileInfo.userId._id
               }
           }).then(function(response) {
               console.log(response.data)
           })
                 
    }

    return (



        <>

<Navbar currentUser = {userLoggedIn} /> 
            {
                (Object.keys(profileInfo).length != 0) ?
                    <div>
                    <div id="profileContainer">
                        <div>

                        
                        <div id="profile">
                            
                            <Image publicId={profileInfo.profilePic} cloudName="prakhar-parashar" height="250" width = "200px"/>
                            <h5 style={{ marginTop: "10px" }}>{profileInfo.userName}</h5>
                    
                        </div>
                        <div style={{marginLeft : "50px", marginTop : "70px"}}>
                        <Button variant="contained" color="primary" onClick={handleAddFriend}>{(!addFriend) ? "Add as a friend" : "Request Sent" }</Button>
                        </div>
                        </div>



                        <div id="user">


                            <div class="info">
                                {
                                    (profileInfo.gender == "Male") ? <img style={{ marginLeft: "50px" }} src="https://img.icons8.com/bubbles/50/000000/male.png" /> : (profileInfo.basicInfoValues.gender == "Female") ? <img src="https://img.icons8.com/bubbles/50/000000/female.png" /> :
                                        (profileInfo.gender == "Other") ? <img style={{ marginLeft: "50px" }} src="https://img.icons8.com/dusk/64/000000/gender-equality.png" width="40px" height="40px" /> : null
                                }

                                <h5>{profileInfo.FirstName} &nbsp; {profileInfo.LastName}</h5>
                                
                            </div>




                            <div class="info">
                                <img style={{ marginLeft: "100px" }} src="https://img.icons8.com/plasticine/100/000000/new-job.png" height="50px" width="50px" />
                                {profileInfo.Position} &nbsp; At {profileInfo.companyName}
                                <hr></hr>
                                {profileInfo.pastExperiences}
                            </div>



                            <div class="info">
                                <Button variant="contained" color="primary">Edit</Button>
                            </div>




                            <div class="info">
                                <img src="https://img.icons8.com/fluent/48/000000/phone-disconnected.png" />
                                {profileInfo.MobileNo}
                            </div>



                            <div class="info">
                                <img style={{ marginLeft: "150px" }} src="https://img.icons8.com/dusk/64/000000/university.png" width="50px" height="50px" />
                                {profileInfo.Education1} &nbsp; From &nbsp; {profileInfo.institutionName1}
                                <hr></hr>
                                {profileInfo.Education2} &nbsp; From &nbsp; {profileInfo.institutionName2}
                            </div>




                            <div class="info">
                                <img style={{ marginLeft: "60px" }} src="https://img.icons8.com/bubbles/50/000000/email.png" width="50px" height="50px" />
                                {profileInfo.newEmail}
                            </div>


                            <div class="info">

                                <img style={{ marginLeft: "20px" }} src="https://img.icons8.com/office/30/000000/worldwide-location.png" />
                                {profileInfo.CurrentCity}
                            </div>



                            <div class="info" id="hobbie">
                                <img style={{ marginLeft: "70px" }} src="https://img.icons8.com/dusk/64/000000/drawing.png" width="40px" height="40px" />
                                <div id="hobbieText" style={{ marginTop: "10px" }} >
                                    {profileInfo.hobbies.map(hobbie => <p style={{ borderRadius: "50px", padding: "5px", backgroundColor: "#ccffff", border: "1px solid blue" }}>{hobbie}</p>)}
                                </div>
                            </div>

                            <div class="info">
                                <img src="https://img.icons8.com/plasticine/100/000000/filled-like.png" width="50px" height="50px" />
                                {profileInfo.relationshipStatus}
                            </div>

                        </div>


                        {(profileInfo.userId) ? 
                        <div id="friendsPhotos"  >
                        <h3>Friends</h3>
                            <div style={{display : "grid", gridTemplateColumns : "auto"}}>
                            {profileInfo.userId.friends.map(friend => <div style={{margin : "40px", textAlign : "center" }}>
                            <Link to={{ pathname: '/userProfile', state: { user: friend.userId} }}>
                                
                                <Image publicId = {friend.profilePic} cloudName = "prakhar-parashar" height="100px" width="100px"/>
                                 <h6>{friend.userName}</h6>
                                 </Link>
                                
                            </div>)}
                        </div>
                        </div> : null }
                        <div id="posts">
                        <Coverflow width="200" height="350"
                                displayQuantityOfSide={2}
                                navigation={false}
                                enableScroll={true}
                                clickable={true}
                                active={0}
                            >
                                 
                                { userPhotos.map(function(posts) {
                                   
                                        return <Image publicId={posts.assetId} cloudName="prakhar-parashar" /> 
                                    
                                   
                                }) 
                            }
                                
                            </Coverflow>
                        </div>
                       <div>
                            
                       </div>

                        

                    </div>
                    
                    
                        <div style={{}}>
                            {userPosts.map(post => 
                                <Post key={post._id} post={post}/>

                                
                                )}
                        </div>
                    </div>: null}

        </>

    )







}

export default UserProfile;