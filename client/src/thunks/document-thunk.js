import {updateDocument, deleteDocument } from "../services/document-servise";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const updateDocumentThunk = createAsyncThunk(
  "document/updateDocument",
  async (data) => {
    const document = await updateDocument(data);
    return document;
  }
);

export const deleteDocumentThunk = createAsyncThunk(
  "document/deleteDocument",
  async (id) => {
    await deleteDocument(id);
    return id;
  }
);