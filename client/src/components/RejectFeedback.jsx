// import React, { useState } from "react";
// import { Button, Modal, Popover } from "antd";
// import { Input, Form } from "antd";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { fetchForHr } from "../redux/visaSlice";
// const { TextArea } = Input;

// const RejectFeedback = (props) => {
//   const { id, fileType } = props;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [feedback, setFeedback] = useState("");
//   const dispatch = useDispatch();
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   console.log(fileType);
//   // TODO : figure out why the api doesn't work
//   const handleOk = () => {
//     axios
//       .post(`http://localhost:4000/api/visa/feedback/${id}/${fileType}`, {
//         feedback,
//       })
//       .then((response) => {
//         console.log("Feedback sent:", response.data);
//         dispatch(fetchForHr());
//         setIsModalOpen(false);
//       })
//       .catch((error) => {
//         console.error("Error sending feedback:", error);
//         setIsModalOpen(false);
//       });
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <>
//       <Popover content="Reject And Send Feedback">
//         <Button
//           type="primary"
//           onClick={showModal}
//           className="h-8 w-20"
//           danger
//           ghost
//         >
//           Reject
//         </Button>
//       </Popover>
//       <Modal
//         title="Feedback"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Send"
//         cancelText="Cancel"
//         okButtonProps={{
//           style: { backgroundColor: "#85a5ff", color: "black" },
//         }}
//         cancelButtonProps={{}}
//       >
//         <Form>
//           <Form.Item>
//             <TextArea
//               rows={8}
//               placeholder="maxLength is 300"
//               maxLength={300}
//               onChange={(e) => setFeedback(e.target.value)}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default RejectFeedback;
