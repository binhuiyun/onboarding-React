import {updateDocument } from "../services/document-servise";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateDocumentThunk = createAsyncThunk(
  "document/updateDocument",
  async (data) => {
    const document = await updateDocument(data);
    return document;
  }
);
