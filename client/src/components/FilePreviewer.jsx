import React, { useState } from "react";
const FilePreviewer = ({ addFile }) => {
  const [file, setFile] = useState(null);

  const onFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
    addFile(selectedFile);
  };
  
  const openPreviewInNewWindow = () => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const blob = new Blob([reader.result], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
    <div className="flex flex-row items-center justify-between mt-1 p-2 border rounded-md w-full">
      <input
        type="file"
        id="workAuthorizationFiles"
        name="workAuthorizationFiles"
        accept=".pdf, .doc, .docx" // Allow specific file types
        onChange={onFileUpload}
        className=""
      />
      {file && (
        <>
          <button onClick={openPreviewInNewWindow} className="underline">View</button>
        </>
      )}
      </div>
    </>
  );
};

export default FilePreviewer;
