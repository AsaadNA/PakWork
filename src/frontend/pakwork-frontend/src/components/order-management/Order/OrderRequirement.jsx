import React from "react";
import { Card } from "react-bootstrap";
import FilePreview from "../../FilePreview/FilePreview";

const OrderRequirement = () => {
  return (
    <Card>
      <Card.Body style={{ textAlign: "left" }}>
        <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>
          Detailed Description
        </p>
        <hr></hr>
        <p>
          This CSS will add a flip animation to the timer labels, and will
          display separate labels for Days, Hours, Minutes, and Seconds. You can
          adjust the font sizes, margins, and animation properties to fit your
          desired style. This CSS will add a flip animation to the timer labels,
          and will display separate labels for Days, Hours, Minutes, and
          Seconds. You can adjust the font sizes, margins, and animation
          properties to fit your desired style.
        </p>
        <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>
          Provided Resources
        </p>
        <hr></hr>
        <div className="d-flex">
          <FilePreview
            fileName="sample.svg"
            fileUrl={
              "http://localhost:3000/static/media/login_poster.7acf65002528fa84b2a20ca27541da7c.svg"
            }
          ></FilePreview>
          <FilePreview
            fileName="sample.svg"
            fileUrl={
              "http://localhost:3000/static/media/login_poster.7acf65002528fa84b2a20ca27541da7c.svg"
            }
          ></FilePreview>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderRequirement;
