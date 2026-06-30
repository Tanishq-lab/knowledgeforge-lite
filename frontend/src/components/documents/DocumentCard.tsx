import { FileText, Trash2 } from "lucide-react";

import type { Document } from "@/services/documents";

interface DocumentCardProps {
  document: Document;
  onDelete: (document: Document) => void;
}

function DocumentCard({
  document,
  onDelete,
}: DocumentCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-500/10 p-3">
            <FileText className="h-6 w-6 text-blue-400" />
          </div>

          <div>

            <h3 className="text-lg font-semibold">
              {document.original_filename}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Ready for AI Chat
            </p>

          </div>

        </div>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
          Indexed
        </span>

      </div>

      <div className="mt-6 flex justify-end">

        <button
          onClick={() => onDelete(document)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />

          Delete
        </button>

      </div>

    </div>
  );
}

export default DocumentCard;