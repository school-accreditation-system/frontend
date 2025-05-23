interface TableFiltersProps {
    searchTerm: string;
    selectedStatus: string;
    rankingOptions: string[];
    pageSize: number;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onPageSizeChange: (value: number) => void;
    onClearSearch: () => void;
    onClearStatus: () => void;
}

export const TableFilters = ({
    searchTerm,
    selectedStatus,
    rankingOptions,
    pageSize,
    onSearchChange,
    onStatusChange,
    onPageSizeChange,
    onClearSearch,
    onClearStatus,
}: TableFiltersProps) => {
    return (
        <>
            {/* Search and Filter Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
                {/* Search input */}
                <div className="flex-grow">
                    <label
                        htmlFor="search"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Search requests
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search by email, National ID, phone number..."
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* Status filter */}
                <div className="min-w-[200px]">
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Filter by status
                    </label>
                    <select
                        id="status"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                    >
                        {rankingOptions.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Page size selector */}
            <div className="mb-4">
                <label
                    htmlFor="pageSize"
                    className="text-sm font-medium text-gray-700 mr-2"
                >
                    Items per page:
                </label>
                <select
                    id="pageSize"
                    className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            {/* Active filters display */}
            <div className="mb-4 flex flex-wrap gap-2 items-center">
                {selectedStatus !== "All" && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                        Status: {selectedStatus}
                        <button
                            onClick={onClearStatus}
                            className="ml-2 text-blue-500 hover:text-blue-600"
                            aria-label="Clear status filter"
                        >
                            ×
                        </button>
                    </div>
                )}
                {searchTerm && (
                    <div className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm flex items-center">
                        Search: "{searchTerm}"
                        <button
                            onClick={onClearSearch}
                            className="ml-2 text-blue-500 hover:text-blue-800"
                            aria-label="Clear search filter"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}; 