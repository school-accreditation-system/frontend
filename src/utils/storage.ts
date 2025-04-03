// src/utils/storage.ts
export const saveFormData = (stepId: number, data: any) => {
  try {
    const existingData = JSON.parse(
      localStorage.getItem("accreditation_form") || "{}"
    );
    const updatedData = {
      ...existingData,
      [stepId]: data,
      merged: { ...(existingData.merged || {}), ...data },
    };
    localStorage.setItem("accreditation_form", JSON.stringify(updatedData));
  } catch (error) {
    console.error("Storage error:", error);
  }
};

export const getFormData = (stepId?: number) => {
  try {
    const data = JSON.parse(localStorage.getItem("accreditation_form") || "{}");
    return stepId !== undefined ? data[stepId] || {} : data;
  } catch {
    return stepId !== undefined ? {} : { merged: {} };
  }
};

export const clearFormData = () =>
  localStorage.removeItem("accreditation_form");
