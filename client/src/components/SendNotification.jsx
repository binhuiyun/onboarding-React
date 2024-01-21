import React from "react";
import { Button } from "antd";
import axios from "axios";

// TODO : send notification by email need to be implemented.
const SendNotification = (props) => {
  const { email, notification } = props;
  const handleSendNotification = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/visa/send-mail", {
      to: email,
      subject: "Reminder: you have a notification",
      text: notification,
    });
  };

  return (
    <Button
      type="primary"
      className="ml-8 mr-2 h-8 w-30 text-geekblue"
      style={{ color: "#597ef7" }}
      ghost
      onClick={handleSendNotification}
    >
      Send Notification
    </Button>
  );
};

export default SendNotification;
