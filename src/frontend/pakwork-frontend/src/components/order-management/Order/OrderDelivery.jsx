import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import axios from "../../../Api/Api";

const OrderDelivery = ({ orderID, isDelivered }) => {
  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/zip": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    maxFiles: 1,
    acceptedFiles: ".zip",
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt={file.name}
          src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEXUlEQVR4nO1bW0wUVxhe0ketvhr7Xk364os+9IXIzADOWRf1zAEaKDWNmJRGm2JCvSVibK2FeG1orcRLK1aN2FpvxbJCbREJC3htrDYlRrSNlF1QK8gu7NcctzPM0iq7MLM7s8yffK//+b/v3P5/5vwuV4JNkgqnCDLNEdysVCT0AyMhELY8071ktsuiliaR3LIsT+7fIlFgJgRCz8/PYrNcVrFAIDD9nffKrphNPAqy0ptB2LykEgeQBmB5zeHjj/XBFS17F9s/3Y3q/TWG4Yu9X2H9xo+R5ckbWQkyvf+6x/NysshPA1A7MPAUOblFWlBbd32OYDAIs+zmrd+wKO8t3XZQ1iSD/GsAOnlAzS2+kZkvXoGWP4bgewCETZMAOFNXrxfAZzphxthLksyWijJ7MxQKSQB61WCOfXNSC+ajQ414/yc8AxfBLOvxB/RnwSNTyaczNlUk9LQ64IWfm4f0wXx56KgWzCenbmgC1N2BqaY/c0wjn0HYKwKhl/WDXbzUikkhgCSzOaJM76mDSG6GmsO1/wkkJQWQ3DRTIPShOsCCRW/A23DhfwNJOQFEQotFooRU54vzl+Lq9V+eG0gqCZAmEFo+OqG523X/hYGkhACSVDhFJMoJvdOVq9air+/hmIHYXoB0mc3gyYTe4ebKHTFnc7YWIJ2xqYKsXNef9AcOHkE4HHseZ2sBBN2ez87JxzlvY9yB2FoAkdBbqpO6+oZxBcKrPtVH5Q+/awL8eA92WAHKU9XJkyf9cQcxOBhE4dslIwI09WkCdHTDBitAHsn0Wtsux02+cnuVFgQtKkFZU4Q8h38AthDgM9WJmxZgZ9UeHDn27ZjYtmt31MxHln+nRn5rh7nkjRPAkz9zIS2Y8De8DfvPofRf8hzXemwiALcWX3vVspLScRHny57PvJ589Q3zyRsqAIDy4eFhtHVcxdHa76K+w+058DUqj7dgy4mOKPDTvqKpL2rPc1S0AwMhGwqA55j3bjTBF4HPfKLIJ0yA811jE+cHXiL2fFIEGAoDzX8CpzqjwZOc9m7zr7qkC2BlMyoVrsjOyQtW7zsIu5kxqbBMB9VCaJKuAEVzEqvxQpl/8+cHpJGI92dK0gTwPYj9aowX8fxMSUkB2uwgQBiRQEdfjRNFm122gFXMEYA4KwDOFiBJOAO6+4FNrcbfAB+2Rnxb/gxoiKFCHC8au2wgQHd/ZLYm7QqwijkCEGcFwNkCxCmHkVLVoM8O1aDPKYfhlMNWMOcaJM41CCcPIE4tAKcYIk41iIQmQql1C8hU6/by+wOwi/3V49fI82f9ExBAaVcdna3zwi52+nuDmqZEQtfq+wJ4S5rV7eavt6Pa5kSZrR63ANnZBdN486HqjDclrivf/OzBdCzvBRMJHhOPLXNhrn7/d024cTKDsHm8DXWsJ3GWg6z0Cu7Fc11G2PwsNkuQFW/SScWOemFB3quGkHeNEoL3DPFn9AJRtlgL/Gk/LY6X+D8HkQ1r0Sc9gwAAAABJRU5ErkJggg=="
          }
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const uploadOrderFiles = async () => {
    let formData = new FormData();

    formData.append("zip", files[0]);
    formData.append("orderID", orderID);

    let result = await axios.post("/orders/deliver", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem("userToken"),
      },
    });

    if (result.status === 200) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (files.length == 1) {
      uploadOrderFiles();
    }
  }, [files]);

  return (
    <Card>
      <Card.Body className="d-flex justify-content-between align-items-center p-2">
        <Card.Body className="d-flex justify-content-between align-items-center p-2">
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              {isDelivered ? (
                <h5 className="dropZone">You Have Already Delivered Files !</h5>
              ) : (
                <h5 className="dropZone">Deliver Your Files Here !</h5>
              )}
              {!isDelivered ? (
                <h6>
                  Make sure all documents are in a single <strong>ZIP</strong>{" "}
                  file
                </h6>
              ) : null}
            </div>
          </section>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default OrderDelivery;
