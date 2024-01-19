import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";

const { TextArea } = Input;

const RejectFeedback = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="h-10 w-20"
        danger
        ghost
      >
        Reject
      </Button>
      <Modal
        title="Feedback"
        open={open}
        onOK={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          style: { backgroundColor: "#85a5ff", color: "black" },
        }}
        cancelButtonProps={{}}
        okText="Send"
        cancelText="Cancel"
      >
        <TextArea rows={8} placeholder="maxLength is 300" maxLength={300} />
      </Modal>
    </>
  );
};

export default RejectFeedback;