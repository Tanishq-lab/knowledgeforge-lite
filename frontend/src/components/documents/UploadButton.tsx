import { useRef } from "react";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  onSelect: (file: File) => void;
}

function UploadButton({
  onSelect,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      onSelect(file);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />

      <button
        onClick={handleClick}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Upload className="h-5 w-5" />

        Upload PDF
      </button>
    </>
  );
}

export default UploadButton;