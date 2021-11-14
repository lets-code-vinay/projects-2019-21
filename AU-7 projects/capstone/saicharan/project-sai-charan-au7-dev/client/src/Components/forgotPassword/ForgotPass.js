import Axios from "axios";
import React,{useState} from "react";
import { isEmail } from "validator";
import authHeader from "../../Services/authHeader";

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const URL = "https://mcsocialmedia.herokuapp.com"
const header = {
  "Content-Type": "application/json",
  authorization: authHeader(),
};

function ForgotPass() {

  const [email, setEmail] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    Axios.post(URL+"/forgot",{email:email},{headers:header})
    setEmail("")
    
  }
  return (
    <div>
      <div
        className="w3-container w3-content"
        style={{ maxWidth: "1400px", marginTop: "80px" }}
      >
        <div className="w3-row">
          <div className="w3-col m12">
            <div className="w3-card w3-round w3-white">
              <div className="w3-container" style={{ height: "30vh" }}>
                <form onSubmit={handleSubmit}>
                  <h4>Please Enter Your Email...</h4>
                  <input
                    type="email"
                    placeholder="Enter your registered Email"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
                  ></input>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
