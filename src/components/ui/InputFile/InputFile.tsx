import { cn } from "@/utils/cn";
import { Spinner } from "@heroui/react";
import Image from "next/image";
import { ChangeEvent, useId } from "react";
import { FaPen } from "react-icons/fa";

interface PropTypes {
  className?: string;
  isUploading?: boolean;
  preview?: string;
  onUpload?: (files: FileList) => void;
}

const InputAvatar = ({
  className,
  preview,
  isUploading,
  onUpload,
}: PropTypes) => {
  const dropzoneId = useId();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div className={cn("relative w-32 h-32", className)}>
      <div className="relative h-full w-full overflow-hidden rounded-full border border-gray-300 bg-gray-100">
        {preview ? (
          <Image src={preview} alt="Avatar" fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            Avatar
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-full">
            <Spinner size="sm" color="danger" />
          </div>
        )}
      </div>

      <label
        htmlFor={`file-input-${dropzoneId}`}
        className="absolute bottom-0 right-0 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white border shadow hover:bg-gray-100"
      >
        <FaPen className="text-sm text-gray-700" />
      </label>

      <input
        type="file"
        id={`file-input-${dropzoneId}`}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
        onClick={(e) => ((e.target as HTMLInputElement).value = "")}
      />
    </div>
  );
};

export default InputAvatar;
