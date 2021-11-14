import React, { Fragment, useState } from "react";
import { Avatar, Typography, Paper, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import MuiInput from "../components/MuiInput";
import { connect } from "react-redux";
import { updateUserAction } from "../redux/actions/authActions";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    placement: {
        margin: "20px 40px",
        padding: theme.spacing(3),
        paddingLeft: "30%",
        [theme.breakpoints.down("sm")]: {
            paddingLeft: "10%",
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    pb: {
        paddingBottom: theme.spacing(4),
    },
    ml: {
        marginLeft: theme.spacing(10),
    },
}));

const EditProfileForm = ({ user }) => {
    const classes = useStyles();
    const history = useHistory();

    const [values, setValues] = useState({
        username: user ? user.username : "",
        name: user ? user.name : "",
        email: user ? user.email : "",
        age: user ? user.age : "",
        bio: user ? user.bio : "",
    });

    const [errors, setErrors] = useState({});

    const { username, name, email, age, bio } = values;

    const handleChange = (name) => (e) => {
        validate({ [name]: e.target.value });
        setValues({ ...values, [name]: e.target.value });
    };

    // Validations
    const validate = (values) => {
        let temp = { ...errors };

        // if ("email" in values)
        //   temp.email = /[\D\d*]{4}@[\D]{4}.[\D]{3}/.test(email)
        //     ? ""
        //     : "Email Address is not Valid.";

        // if ("username" in values)
        //   temp.username =
        //     username.length >= 2
        //       ? ""
        //       : "Minimum characters length should be 3.";

        // if ("name" in values)
        //   temp.name =
        //     name.length >= 2
        //       ? ""
        //       : "Minimum characters length should be 3.";

        // if ("age" in values)
        //   temp.age = /[\d]/.test(age)
        //     ? ""
        //     : "Only Numerals are allowed.";

        // if ("bio" in values)
        //   temp.bio =
        //     bio.length < 49
        //       ? ""
        //       : "Max characters length should be 50.";

        // setErrors({ ...temp });

        // // If temp == empty string then form values return true
        // if (values)
        //   return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(validate());
        // if (validate) {
        //   updateUserAction({ name, username, email, age, bio });

        // if(validate())
        console.log(validate());
        toast.success("Profile Updated");

        // setTimeout(() => {
        //   history.push("/profile");
        // }, 3000);
        // } else {
        //   toast.error("Text Fields contain Errors");
        // }
    };

    return (
        user && (
            <Paper className={classes.placement} elevation={3}>
                <Grid container className={classes.pb}>
                    <Grid item xs={1}>
                        <Avatar
                            alt={user.name}
                            src={
                                user.avatar
                                    ? user.avatar.imageUrl
                                    : "https://flyinryanhawks.org/wp-content/uploads/2016/08/profile-placeholder.png"
                            }
                            className={classes.large}
                        />
                    </Grid>

                    <Grid item xs={6} className={classes.ml}>
                        <Typography variant="h6">{username}</Typography>
                        <Link className="link" to="/profile/edit">
                            Change Profile Photo
                        </Link>
                        <Link
                            className="link"
                            style={{ marginLeft: "20px" }}
                            to="/forget-password"
                        >
                            Change Password
                        </Link>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container className={classes.pb}>
                    <Grid item xs={1}>
                        <Typography variant="h6">Username</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.ml}>
                        <MuiInput
                            label="Username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={handleChange("username")}
                            error={errors.username}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container className={classes.pb}>
                    <Grid item xs={1}>
                        <Typography variant="h6">Name</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.ml}>
                        <MuiInput
                            label="Name"
                            name="name"
                            type="text"
                            value={name}
                            onChange={handleChange("name")}
                            error={errors.name}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container className={classes.pb}>
                    <Grid item xs={1}>
                        <Typography variant="h6">Email</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.ml}>
                        <MuiInput
                            label="Email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={handleChange("email")}
                            error={errors.email}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container className={classes.pb}>
                    <Grid item xs={1}>
                        <Typography variant="h6">Age</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.ml}>
                        <MuiInput
                            label="Age"
                            name="age"
                            type="text"
                            value={age}
                            onChange={handleChange("age")}
                            error={errors.age}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container className={classes.pb}>
                    <Grid item xs={1}>
                        <Typography variant="h6">Bio</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.ml}>
                        <MuiInput
                            label="Bio"
                            name="bio"
                            type="text"
                            multiline={true}
                            rows={3}
                            value={bio}
                            onChange={handleChange("bio")}
                            error={errors.bio}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                <Grid container className={classes.pb}>
                    <Grid item xs={1}></Grid>
                    <Grid
                        item
                        xs={6}
                        className={classes.ml}
                        style={{ textAlign: "right" }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Update Profile
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userRoot.user,
    };
};

export default connect(mapStateToProps, null)(EditProfileForm);
