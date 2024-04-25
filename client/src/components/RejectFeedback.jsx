import React, { useState } from "react";
import { Button, Modal, Popover, message } from "antd";
import { Input} from "antd";
import { useDispatch } from "react-redux";
import { updateDocumentThunk, deleteDocumentThunk } from "../thunks/document-thunk";
const { TextArea } = Input;

const RejectFeedback = ({doc}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  // TODO : figure out why the api doesn't work
  const handleReject = (e) => {
    e.preventDefault();
    const updatedDoc= {...doc, status: "rejected", feedback};
    dispatch(updateDocumentThunk(updatedDoc));
    dispatch(deleteDocumentThunk(doc._id));
    
    message.open({
      type: "warning",
      content: "File rejected",
      duration: 2,
    });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Popover content="Reject And Send Feedback">
        <Button
          type="primary"
          onClick={showModal}
          className="h-8 w-20"
          danger
          ghost
        >
          Reject
        </Button>
      </Popover>
      <Modal
        title="Feedback"
        open={isModalOpen}
        onOk={handleReject}
        onCancel={handleCancel}
        okText="Send"
        cancelText="Cancel"
        okButtonProps={{
          style: { backgroundColor: "#85a5ff", color: "black" },
        }}
   
      >
       
            <TextArea
              rows={2}
              placeholder="maxLength is 100"
              maxLength={300}
              onChange={(e) => setFeedback(e.target.value)}
            />
   
      </Modal>
    </>
  );
};

export default RejectFeedback;
