"use client";
import useGetAccreditationRequests from "@/hooks/useGetAccreditationRequests";
import { AccreditationTable } from "@/components/accreditation/AccreditationTable";

const RequestDirectoryPage = () => {
  const { data: requestData = [], isLoading, error } = useGetAccreditationRequests();

  return <AccreditationTable requestData={requestData} isLoading={isLoading} error={error} />;
};

export default RequestDirectoryPage;
