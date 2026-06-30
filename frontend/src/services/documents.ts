import api from "./api";

export interface Document {
  id: number;
  original_filename: string;
  file_path: string;
  owner_id: number;
  created_at: string;
}

export const DocumentService = {
  async getDocuments(): Promise<Document[]> {
    const response = await api.get("/documents");
    return response.data;
  },

  async uploadDocument(file: File): Promise<Document> {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
      "/documents/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  async deleteDocument(
    documentId: number
  ): Promise<void> {

    await api.delete(
      `/documents/${documentId}`
    );

  },
};