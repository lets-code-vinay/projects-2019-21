import React from "react";
import error404 from '../images/error404.png';
function Page404() {
  return (
    <div className="pagenotfound" 
          style={{
          display:"flex", 
          position:"relative",
          width:"80vw",
          height:"80vh",
          marginLeft:"10%", 
          marginTop: "-5%"
          }}>

      <img src ={error404} alt="error page"/>
      <div className="404error errorClass" 
          style={{
            position:"absolute", 
            display:"inline", 
            alignItems:"center", 
            marginLeft:"40%",
            marginTop:"10%",
            color:"#1280FF",

            }}>
      <h2  style={{
            color:"#180095"
            }}>
              <b>Page not found</b></h2>
      <p style={{
            color:"#1280FF"
      }} >
        This Page is not available
        </p>
      <a href='/'>home page</a>
      </div>

    </div>
  );
}

export default Page404;
