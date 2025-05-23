import { useMemo, useState } from "react";
import { Table } from "@/components/Table/Table";
import { AccreditationRequest } from "@/hooks/useGetAccreditationRequests";
import { useAccreditationTable } from "@/hooks/useAccreditationTable";
import { TableFilters } from "./TableFilters";
import { RequestDetailsModal } from "./RequestDetailsModal";
import LoadingSkeleton from "@/components/Table/LoadingSkeleton";
import { getRatingBadgeClass } from "./utils";

interface AccreditationTableProps {
    requestData: AccreditationRequest[];
    isLoading: boolean;
    error: unknown;
}

const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
};


export const AccreditationTable = ({
    requestData,
    isLoading,
    error,
}: AccreditationTableProps) => {
    const [selectedRequest, setSelectedRequest] = useState<AccreditationRequest | null>(null);

    const {
        sortField,
        sortDirection,
        searchTerm,
        selectedStatus,
        pageSize,
        currentPage,
        rankingOptions,
        currentPageData,
        filteredData,
        handleSort,
        handleSearchChange,
        handleStatusChange,
        handlePageSizeChange,
        handlePageChange,
        setSearchTerm,
        setSelectedStatus,
    } = useAccreditationTable({ requestData });

    const columns = useMemo(
        () => [
            {
                key: "assessment.school.schoolName",
                header: "School",
                sortable: true,
                render: (_: any, row: AccreditationRequest) => {
                    const value = row.assessment?.school?.schoolName;
                    return value ? (
                        <span className="text-primary">{value}</span>
                    ) : (
                        <span className="text-gray-400">N/A</span>
                    );
                },
            },
            {
                key: "assessment.combination.shortName",
                header: "Combination",
                sortable: true,
                render: (_: any, row: AccreditationRequest) => {
                    const value = row.assessment?.combination?.shortName;
                    return value ? (
                        <span className="text-primary">{value}</span>
                    ) : (
                        <span className="text-gray-400">N/A</span>
                    );
                },
            },
            {
                key: "ranking",
                header: "Ranking",
                sortable: true,
                render: (_: any, row: AccreditationRequest) => {
                    const value = row.assessment?.ranking;
                    return (
                        <span
                            className={`px-2 py-1 border font-semibold ${getRatingBadgeClass(
                                value
                            )} rounded-full text-sm`}
                        >
                            {value}
                        </span>
                    );
                },
            },
            {
                key: "overAllWeight",
                header: "OverAllWeight",
                sortable: true,
                render: (_: any, row: AccreditationRequest) => {
                    const value = row.assessment?.overAllWeight;
                    return (
                        <span className="px-2 py-1 font-semibold border border-purple-900 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {value ? `${value} %` : "N/A"}
                        </span>
                    );
                },
            },
            {
                key: "requestDate",
                header: "Request Date",
                sortable: true,
                render: (_: any, row: AccreditationRequest) => {
                    const value = row.createdAt;
                    return formatDate(value);
                },
            },
            {
                key: "id",
                header: "Actions",
                render: (_: any, item: AccreditationRequest) => (
                    <button
                        onClick={() => setSelectedRequest(item)}
                        className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                    >
                        View Details
                    </button>
                ),
            },
        ],
        []
    );

    return (
        <div className="p-6 mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-primary">
                Application Requests
            </h1>

            <TableFilters
                searchTerm={searchTerm}
                selectedStatus={selectedStatus}
                rankingOptions={rankingOptions}
                pageSize={pageSize}
                onSearchChange={handleSearchChange}
                onStatusChange={handleStatusChange}
                onPageSizeChange={handlePageSizeChange}
                onClearSearch={() => setSearchTerm("")}
                onClearStatus={() => setSelectedStatus("All")}
            />
            <Table
                columns={columns}
                data={currentPageData}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                emptyStateMessage={
                    !requestData.length
                        ? "No request data available. Please check API connection."
                        : "No requests found matching your search criteria"
                }
                pageSize={pageSize}
                isLoading={isLoading}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalItems={filteredData.length}
            />
            {error && (
                <div className="my-4 p-3 bg-red-50 text-red-700 rounded">
                    Error loading request data: {String(error)}
                </div>
            )}
            {selectedRequest && (
                <RequestDetailsModal
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                />
            )}
        </div>
    );
}; 