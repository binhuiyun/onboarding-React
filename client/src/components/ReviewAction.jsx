import React, { useEffect, useState } from "react";
import RejectFeedback from "./RejectFeedback";
import { Button, Popover } from "antd";

//TODO : one file, one reject, one approve
const ReviewAction = (props) => {
  const { file, fileTitle, filter } = props;
  const [fileURL, setFileURL] = useState("");
  useEffect(() => {
    const createURL = async () => {
      setFileURL(URL.createObjectURL(blob));
    };
    createURL();
  }, []);
  // console.log(`${fileTitle}`, file);
  return (
    <>
      <div className="flex items-center justify-between my-2">
        {file.fileDoc && (
          <Popover content="Click To Preview">
            <a href={fileURL} width="10%" height="20px">
              {fileTitle}
            </a>
          </Popover>
        )}
        <div className="">
          {filter === "IN PROGRESS" && (
            <Button
              type="primary"
              className="ml-8 mr-2 h-8 w-20 text-geekblue"
              style={{ color: "#597ef7" }}
              ghost
            >
              Approve
            </Button>
          )}

          {filter === "IN PROGRESS" && <RejectFeedback />}
        </div>
      </div>
    </>
  );
};
export default ReviewAction;
