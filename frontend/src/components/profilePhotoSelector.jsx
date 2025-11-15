import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Hidden input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Conditional rendering */}
      {!image ? (
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300">
            <LuUser className="text-gray-400 text-5xl" />
          </div>
          <button
            type="button"
            onClick={onChooseFile}
            className="mt-3 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            <LuUpload />
            Upload Photo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={previewUrl}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow-md"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-md"
            >
              <LuTrash className="text-sm" />
            </button>
          </div>
          <button
            type="button"
            onClick={onChooseFile}
            className="mt-3 flex items-center gap-2 bg-gray-100 border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <LuUpload />
            Change Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
