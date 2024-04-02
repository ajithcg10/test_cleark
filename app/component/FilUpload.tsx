import React from "react";
import { UploadButton, UploadDropzone } from "../utils/uploadthing";

export default function FilUpload({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <main className="">
      <UploadButton
        appearance={{
          container: {
            border: "8px solid dotted ",
            marginLeft: "10px",
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setFile(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        className="custom-upload-dropzone"
      />
    </main>
  );
}
