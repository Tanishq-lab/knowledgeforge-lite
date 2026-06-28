import { FileText } from "lucide-react";

function RecentDocuments() {

  const docs = [
    "Predictive Analytics.pdf",
    "Operating Systems.pdf",
    "Machine Learning.pdf",
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Documents
      </h2>

      <div className="space-y-4">

        {docs.map((doc) => (

          <div
            key={doc}
            className="flex items-center justify-between rounded-xl border border-slate-800 p-4"
          >

            <div className="flex items-center gap-3">

              <FileText className="h-5 w-5" />

              {doc}

            </div>

            <span className="text-green-400">
              Indexed
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentDocuments;