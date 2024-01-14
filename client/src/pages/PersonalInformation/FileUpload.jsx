import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page } from "react-pdf";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ["image/*", "application/pdf"],
    maxFiles: 1,
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-8 rounded-md cursor-pointer ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          file.type.startsWith("image") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded File"
              className="w-full h-auto object-contain"
            />
          ) : file.type === "application/pdf" ? (
            <div className="pdf-preview">
              <Document
                file={URL.createObjectURL(file)}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {[...Array(numPages)].map((_, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
              <p className="text-center text-gray-600 mt-2">
                Page {pageNumber} of {numPages}
              </p>
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Preview not available for this file type
            </p>
          )
        ) : (
          <p className="text-center text-gray-600">
            Drag and drop your file here, or click to select a file
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
