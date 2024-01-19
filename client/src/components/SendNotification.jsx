import React from "react";
import { Button } from "antd";

// TODO : send notification by email need to be implemented.
const SendNotification = () => {
  return (
    <Button
      type="primary"
      className="ml-8 mr-2 h-8 w-30 text-geekblue"
      style={{ color: "#597ef7" }}
      ghost
    >
      Send Notification
    </Button>
  );
};

export default SendNotification;
