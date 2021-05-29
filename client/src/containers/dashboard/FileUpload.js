import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import { uploadFile } from "react-s3";
import { NotificationManager } from "../../components/common/react-notifications";
import "dropzone/dist/min/dropzone.min.css";
var ReactDOMServer = require("react-dom/server");

const config = {
  bucketName: "projectbucketdatadashboard",
  region: "ap-south-1",
  accessKeyId: "AKIAQNGOSH462LVWMFOS",
  secretAccessKey: "GyeRT+LGkTyvqg9pv2TrrRimVtK9xHL0KEAjx61q",
};
var dropzoneComponentConfig = {
  postUrl: "http://localhost:5000/dummy-api",
  iconFiletypes: [".csv"],
  showFiletypeIcon: true,
};
var eventHandlers = {
  addedfile: (file) => {
    console.log(file.name);
    uploadFile(file, config)
      .then((data) => {
        NotificationManager.success("Upload Successfull", "", 3000, null, null);
      })
      .catch((err) => {
        NotificationManager.warning("Error", "Error", 3000, null, null, "");
      });
  },
};
var dropzoneConfig = {
  thumbnailHeight: 160,
  maxFilesize: 500,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{" "}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {" "}
            <span data-dz-name />{" "}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {" "}
        <i className="glyph-icon simple-icon-trash" />{" "}
      </a>
    </div>
  ),
  headers: { "My-Awesome-Header": "header value" },
};
export default class DropzoneExample extends Component {
  render() {
    return (
      <DropzoneComponent
        config={dropzoneComponentConfig}
        eventHandlers={eventHandlers}
        djsConfig={dropzoneConfig}
      />
    );
  }
}
