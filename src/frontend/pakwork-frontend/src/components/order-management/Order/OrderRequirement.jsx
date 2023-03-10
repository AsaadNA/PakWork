import React from "react";
import { Card } from "react-bootstrap";
import FilePreview from "../../FilePreview/FilePreview";

const OrderRequirement = ({ orderDescription, orderFiles }) => {
  return (
    <Card>
      <Card.Body style={{ textAlign: "left" }}>
        <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>
          Detailed Description
        </p>
        <hr></hr>
        <p>{orderDescription}</p>
        {orderFiles ? (
          <React.Fragment>
            <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>
              Provided Resources
            </p>
            <hr></hr>
            <div className="d-flex">
              {orderFiles.map((o) => {
                return (
                  <FilePreview
                    fileName={o["attached_files_id"]}
                    fileUrl={`http://localhost:4000${o["file"]}`}
                  ></FilePreview>
                );
              })}
            </div>
          </React.Fragment>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default OrderRequirement;
