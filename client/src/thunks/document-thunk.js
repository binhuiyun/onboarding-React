import { getAllDocument, updateDocument } from "../services/document-servise";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllDocumentThunk = createAsyncThunk(
  "document/getAllDocument",
  async () => {
    const document = await getAllDocument();
    console.log("fetching all document", document);
    return document;
  }
);

export const updateDocumentThunk = createAsyncThunk(
  "document/updateDocument",
  async (data) => {
    const document = await updateDocument(data);
    return document;
  }
);
