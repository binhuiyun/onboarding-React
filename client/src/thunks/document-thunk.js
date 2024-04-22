import { getDocument } from "../services/document-servise";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDocumentThunk = createAsyncThunk(
  "document/getDocument",
  async (userId) => {
    const document = await getDocument(userId);
    console.log("fetching document", document);
    return document;
  }
);
