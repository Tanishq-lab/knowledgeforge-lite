import { useEffect, useState } from "react";

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

    const docs =
      await DocumentService.getDocuments();

    setDocuments(docs);

  };

  const toggleDocument = (
    id: number
  ) => {

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

    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <h2 className="mb-4 font-semibold">

        Chat With

      </h2>

      <label className="mb-3 flex items-center gap-3">

        <input
          type="checkbox"
          checked={selected.length === 0}
          onChange={() => onChange([])}
        />

        All Documents

      </label>

      <div className="space-y-2">

        {documents.map(doc => (

          <label
            key={doc.id}
            className="flex items-center gap-3"
          >

            <input
              type="checkbox"
              checked={selected.includes(doc.id)}
              onChange={() =>
                toggleDocument(doc.id)
              }
            />

            {doc.original_filename}

          </label>

        ))}

      </div>

    </div>

  );

}

export default DocumentSelector;