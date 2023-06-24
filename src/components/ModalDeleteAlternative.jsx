import React from "react";

const ModalDeleteAlternative = ({ title, message, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div className="w-1/2 p-6 bg-white rounded-lg md:w-1/4">
        <h2 className="mb-4 text-lg font-semibold text-center">{title}</h2>
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-center">
          <button className="button__primary" onClick={onConfirm}>
            Confirm
          </button>
          <button className="mr-2 button__warn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteAlternative;
