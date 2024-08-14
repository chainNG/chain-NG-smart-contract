import React from "react";

const WhatsNewModal = ({
  isOpen,
  onClose,
  title,
  image,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg  w-[80%] h-[70dvh] p-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black">
            Close
          </button>
        </div>
        <img src={image} alt={title} className="w-full h-64 object-cover mt-4" />
        <h1 className="text-2xl font-bold my-4">{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default WhatsNewModal;

