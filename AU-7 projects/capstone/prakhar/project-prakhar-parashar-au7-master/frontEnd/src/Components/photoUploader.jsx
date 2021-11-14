import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import request from 'superagent';


class PhotosUploader extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { uploadedPhotos: [] };
        this.photoId = 1;
    }

    render() {
        return (
            <div>
                
                        
                        <form style={this.props.style}>
                           
                            <div className="form_line">
                                <div className="form_controls">
                                    <div className="upload_button_holder">
                                        <label style={{cursor : "pointer"}}for="fileupload"><img src="https://img.icons8.com/plasticine/100/000000/plus-2-math.png"></img></label>
                                        <input style={{display:"none"}}
                                            type="file"
                                            id="fileupload"
                                            accept="image/*"
                                            multiple="multiple"
                                            ref={fileInputEl =>
                                                (this.fileInputEl = fileInputEl)
                                            }
                                            onChange={() =>
                                                
                                                this.onPhotoSelected(
                                                    this.fileInputEl.files
                                                )
                                            }
                                        />
                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                      

            </div>
        );
    }

    onPhotoSelected(files) {
        console.log("photoSelected")
        console.log(files)
        const url = `https://api.cloudinary.com/v1_1/prakhar-parashar/upload`;

        for (let file of files) {
           
            request.post(url)
                .field('upload_preset', 'otdrkocf')
                .field('file', file)
                .field('multiple', true)
                
                .end((error, response) => {
                    const publicId = JSON.parse(response.text).public_id
                    this.props.photoInfo(publicId)
                  
                });
        }
    }
}


const dispatchMapper = {
    
}

export default connect(null, dispatchMapper)(PhotosUploader)
