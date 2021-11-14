import React, { useEffect, lazy, Suspense } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { setPublicProfileData } from "../redux/actions/profileActions";
import LoaderImage from "../images/placeholder.gif";
import PublicProfileBio from "../components/PublicProfileBio";

const Card2 = lazy(() => import("../components/Card2"));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  typographyStyles: {
    fontWeight: 500,
    display: "inline",
    marginRight: "8%",
  },
  usernameStyles: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    marginTop: "0.9rem",
  },
  nameBioStyles: {
    marginTop: "1.5rem",
  },
  lowFontWeightStyles: {
    fontWeight: 200,
    fontSize: "0.9rem",
  },
  imgCenter: {
    textAlign: "center",
  },
  gridImg: {
    marginTop: "40px",
  },
  input: {
    display: "none",
  },
  photoUploadStyle: {
    marginTop: "20px",
    textAlign: "center",
  },
}));

function UserProfile({ setProfile, publicProfile }) {
  const classes = useStyles();
  const { gridImg } = classes;

  const { userId } = useParams();
  useEffect(() => {
    setProfile(userId);
  }, [setProfile, userId]);

  return (
    publicProfile && (
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid
          container
          item
          md={8}
          xs={12}
          direction="column"
        >
          {/* Users Bio */}
          <PublicProfileBio
            user={publicProfile.user}
            classes={classes}
            postCount={publicProfile.posts}
            userId={userId}
          />

          {/* User Posts */}
          <Grid container item xs={12} className={gridImg}>
            {publicProfile.posts &&
              publicProfile.posts.map((post) => (
                <Grid item xs={4} key={post._id}>
                  <Suspense
                    fallback={
                      <img
                        src={LoaderImage}
                        alt="loader_image"
                        width={345}
                      />
                    }
                  >
                    <Card2 post={post} />
                  </Suspense>
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    )
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProfile: (userId) =>
      dispatch(setPublicProfileData(userId)),
  };
};

const mapStateToProps = (state) => {
  return {
    publicProfile: state.publicRoot.publicProfile,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
