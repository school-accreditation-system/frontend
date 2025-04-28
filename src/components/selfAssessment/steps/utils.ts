export function getDynamicOptionIds(assessmentSteps, formData) {
  const dynamicStepIds = assessmentSteps
    .filter((step) => step.areaId)
    .map((step) => step.id);

  const dynamicOptionIds: string[] = [];

  dynamicStepIds.forEach((stepId) => {
    const stepData = formData[stepId];
    if (stepData) {
      Object.entries(stepData).forEach(([key, value]) => {
        if (!key.endsWith("_document") && value) {
          dynamicOptionIds.push(value as string);
        }
      });
    }
  });

  return dynamicOptionIds;
}
