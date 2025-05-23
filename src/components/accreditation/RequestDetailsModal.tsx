import { AccreditationRequest } from "@/hooks/useGetAccreditationRequests";
import { School, User, FileText } from 'lucide-react';
import { getRatingBadgeClass } from "./utils";
interface RequestDetailsModalProps {
    request: AccreditationRequest;
    onClose: () => void;
}

const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
};

const getStatusBadgeClass = (status?: string) => {
    switch (status) {
        case "SUBMITTED":
            return "bg-yellow-100 text-yellow-800";
        case "APPROVED":
            return "bg-green-100 text-green-800";
        case "REJECTED":
            return "bg-red-100 text-red-800";
        case "PENDING":
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const RequestDetailsModal = ({ request, onClose }: RequestDetailsModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-primary flex items-center">
                            <School className="mr-2" />
                            Accreditation Request Details
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Applicant Information */}
                        <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                                <User className="mr-2" />
                                Applicant Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{request.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">National ID</p>
                                    <p className="font-medium">{request.nationalId || "Not provided"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="font-medium">{request.phoneNumber || "Not provided"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Role</p>
                                    <p>
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                            {request.applicantRole}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p>
                                        <span
                                            className={`px-2 py-1 ${getStatusBadgeClass(request.status)} rounded-full text-sm`}
                                        >
                                            {request.status}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Created At</p>
                                    <p className="font-medium">{formatDate(request.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Assessment Information */}
                        <div className="bg-primary/5 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                                <School className="mr-2" />
                                Assessment Information
                            </h3>
                            {request.assessment ? (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500 flex items-center">
                                            <School className="mr-2" />
                                            School
                                        </p>
                                        <p className="font-medium">
                                            {request?.assessment?.school?.schoolName} ({request?.assessment?.school?.shortName || "Not provided"})
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Combination</p>
                                        <p className="font-medium">{request?.assessment?.combination?.fullName || "Not provided"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Ranking</p>
                                        <p className={`px-2 py-1 mt-2  font-bold ${getRatingBadgeClass(request.assessment.ranking)} rounded-xs text-sm`}>
                                            {request.assessment.ranking || "Not ranked"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">OverAllWeight</p>
                                        <div className="flex items-center">
                                            <p className="text-sm text-gray-500 mt-2">
                                                <span className="px-2 mt-2 py-1 font-bold bg-purple-100 text-purple-800 rounded-xs text-sm">
                                                    {request.assessment.overAllWeight ? `${request.assessment.overAllWeight} %` : "Not provided"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">No assessment information available</p>
                            )}
                        </div>
                    </div>

                    {/* Documents Section */}
                    {request.documentPath && (
                        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
                                <FileText className="mr-2" />
                                Documents
                            </h3>
                            <div className="p-3 bg-gray-50 rounded border border-gray-200">
                                <p className="flex items-center">
                                    <svg
                                        className="w-5 h-5 mr-2 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        ></path>
                                    </svg>
                                    {request.documentPath}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}; 