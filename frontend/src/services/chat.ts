import api from "./api";

export interface ChatSource {
  document_name: string;
  document_id: number;
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
}

export const ChatService = {
  async askQuestion(
    question: string,
    documentIds?: number[]
  ): Promise<ChatResponse> {

    const response = await api.post(
      "/chat",
      {
        question,
        document_ids: documentIds,
      }
    );

    return response.data;
  },
};