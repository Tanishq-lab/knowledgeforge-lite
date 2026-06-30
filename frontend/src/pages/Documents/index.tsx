import { useCallback, useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { toast } from "sonner";

import DocumentCard from "@/components/documents/DocumentCard";
import UploadButton from "@/components/documents/UploadButton";
import { DocumentService } from "@/services/documents";
import type { Document } from "@/services/documents";

function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadDocuments = useCallback(async () => {
    try {
      const docs = await DocumentService.getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);

      await DocumentService.uploadDocument(file);

      toast.success("Document uploaded successfully!");

      await loadDocuments();
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (
    document: Document
  ) => {
    const confirmed = window.confirm(
      `Delete "${document.original_filename}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await DocumentService.deleteDocument(
        document.id
      );

      toast.success(
        "Document deleted successfully!"
      );

      await loadDocuments();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete document."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Documents
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all your uploaded PDF documents.
          </p>
        </div>

        <UploadButton onSelect={handleUpload} />
      </div>

      {uploading && (
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
          Uploading and indexing document...
        </div>
      )}

      {loading ? (
        <p className="text-slate-400">
          Loading documents...
        </p>
      ) : documents.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
          <FileText className="mx-auto h-12 w-12 text-slate-500" />

          <h2 className="mt-4 text-xl font-semibold">
            No Documents
          </h2>

          <p className="mt-2 text-slate-400">
            Upload your first PDF to start chatting with your documents.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentsPage;