import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import { DocumentService } from "@/services/documents";
import type { Document } from "@/services/documents";

function RecentDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const docs = await DocumentService.getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Recent Documents
      </h2>

      {loading ? (
        <p className="text-slate-400">
          Loading...
        </p>
      ) : documents.length === 0 ? (
        <p className="text-slate-400">
          No documents uploaded yet.
        </p>
      ) : (
        <div className="space-y-4">
          {documents.slice(0, 5).map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-xl border border-slate-800 p-4"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-400" />

                <div>
                  <p className="font-medium">
                    {doc.original_filename}
                  </p>

                  {"created_at" in doc && (
                    <p className="text-sm text-slate-400">
                      {new Date(
                        (doc as any).created_at
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                Indexed
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentDocuments;