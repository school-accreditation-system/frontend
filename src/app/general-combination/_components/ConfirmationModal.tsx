import React from "react";

const ConfirmationModal = ({ isOpen, onClose, school, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm School Selection</h2>

        <div className="mb-4">
          <p className="font-medium text-lg">{school.name}</p>
          <p className="text-gray-600">{school.address}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            You all be able to select from combinations (MPC, MPG, MEG) after
            completing the school information and self-assessment.
          </p>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Continue to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
