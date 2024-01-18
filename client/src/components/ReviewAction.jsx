import React, { useEffect, useState } from "react";
const ReviewAction = (props) => {
  const { optReceipt, optEAD, I983, I20 } = props.doc;
  const [optReceiptURL, setOptReceiptURL] = useState("");
  const [optEADURL, setOptEADURL] = useState("");
  const [I983URL, setI983URL] = useState("");
  const [I20URL, setI20URL] = useState("");
  useEffect(() => {
    const createURL = async () => {
      setOptReceiptURL(URL.createObjectURL(blob));
      setOptEADURL(URL.createObjectURL(await optEAD.fileDoc.blob()));
      setI983URL(URL.createObjectURL(await I983.fileDoc.blob()));
      setI20URL(URL.createObjectURL(await I20.fileDoc.blob()));
    };
    createURL();
  }, []);

  return (
    <>
      <div className="flex ">
        {optReceipt && (
          <a href={optReceiptURL} width="10%" height="20px">
            Opt Receipt
          </a>
        )}
        {optEADURL && (
          <iframe
            title="OPT EAD"
            src={optEADURL}
            width="10%"
            height="20px"
          ></iframe>
        )}
        {I983URL && (
          <iframe title="I983" src={I983URL} width="10%" height="20px"></iframe>
        )}
        {I20URL && (
          <iframe title="I20" src={I20URL} width="10%" height="20px"></iframe>
        )}
        <button className="mx-1">Approve</button>
        <button>Reject</button>
      </div>
    </>
  );
};
export default ReviewAction;
