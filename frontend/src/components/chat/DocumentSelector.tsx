import { useEffect, useState } from "react";
import { FileText, Files } from "lucide-react";

import {
  DocumentService,
  type Document,
} from "@/services/documents";

interface Props {
  selected: number[];
  onChange: (ids: number[]) => void;
}

function DocumentSelector({
  selected,
  onChange,
}: Props) {

  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const docs = await DocumentService.getDocuments();
    setDocuments(docs);
  };

  const toggleDocument = (id: number) => {

    if (selected.includes(id)) {

      onChange(
        selected.filter(
          docId => docId !== id
        )
      );

    } else {

      onChange([
        ...selected,
        id
      ]);

    }

  };

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Files className="h-5 w-5 text-blue-400" />

          <h2 className="font-semibold">
            Documents
          </h2>

        </div>

        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">

          {documents.length} uploaded

        </span>

      </div>

      {/* All Documents */}

      <label className="mb-4 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 transition hover:border-blue-500">

        <input
          type="checkbox"
          checked={selected.length === 0}
          onChange={() => onChange([])}
        />

        <span className="font-medium">
          Search all documents
        </span>

      </label>

      {/* Document List */}

      <div className="max-h-44 space-y-2 overflow-y-auto pr-2">

        {documents.length === 0 ? (

          <p className="text-sm text-slate-500">

            No documents uploaded.

          </p>

        ) : (

          documents.map((doc) => (

            <label
              key={doc.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-800 px-3 py-2 transition hover:border-blue-500 hover:bg-slate-950"
            >

              <input
                type="checkbox"
                checked={selected.includes(doc.id)}
                onChange={() =>
                  toggleDocument(doc.id)
                }
              />

              <FileText className="h-4 w-4 text-blue-400" />

              <span className="truncate text-sm">

                {doc.original_filename}

              </span>

            </label>

          ))

        )}

      </div>

      <p className="mt-4 text-xs text-slate-500">

        Tip: Leave everything unchecked to search across all uploaded documents.

      </p>

    </div>

  );

}

export default DocumentSelector;