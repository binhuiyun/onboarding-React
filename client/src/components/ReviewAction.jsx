// import React, { useEffect, useState } from "react";
// import RejectFeedback from "./RejectFeedback";
// import { Button, Popover } from "antd";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { fetchForHr } from "../redux/visaSlice";

// //TODO : one file, one reject, one approve
// const ReviewAction = (props) => {
//   const { file, fileTitle, filter, id, fileType } = props;
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   console.log(file, fileTitle, filter, id, fileType);
//   const dispatch = useDispatch();

//   const handleApprove = (e) => {
//     e.preventDefault();
//     console.log("triggered");
//     axios
//       .post(`http://localhost:4000/api/visa/approve/${id}/${fileType}`)
//       .then((response) => {
//         console.log(response.data);
//         dispatch(fetchForHr());
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };
//   return (
//     <>
//       {isPreviewOpen && (
//         <div className="fixed top-0 left-0 xs:w-0 md:w-full xs:h-0 md:h-full flex items-center justify-center bg-black bg-opacity-50 md:z-30">
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border p-8 w-3/4 h-3/4 overflow-auto shadow-lg">
//             <div
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsPreviewOpen(false);
//               }}
//               className="absolute top-4 right-4 p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-black cursor-pointer"
//             >
//               &#x2716;
//             </div>
//             <iframe
//               src={URL.createObjectURL(
//                 new Blob([new Uint8Array(file.fileDoc.data)], {
//                   type: "application/pdf",
//                 })
//               )}
//               title="PDF Viewer"
//               className="w-full h-full"
//             ></iframe>
//           </div>
//         </div>
//       )}
//       <div className="flex items-center justify-between my-2">
//         {file.fileDoc && (
//           <Popover content="Click To Preview">
//             <div
//               className="cursor-pointer"
//               width="10%"
//               height="20px"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setIsPreviewOpen(true);
//               }}
//             >
//               {fileTitle}
//             </div>
//           </Popover>
//         )}
//         <div className="ml-8">
//           {filter === "IN PROGRESS" && (
//             <Button
//               type="primary"
//               className="mr-2 h-8 w-20 sm:mb-2"
//               style={{ color: "#597ef7" }}
//               ghost
//               onClick={handleApprove}
//             >
//               Approve
//             </Button>
//           )}

//           {filter === "IN PROGRESS" && (
//             <RejectFeedback id={id} fileType={fileType} />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default ReviewAction;
