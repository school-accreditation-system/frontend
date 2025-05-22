// src/components/accreditation/LoadingSkeleton.tsx
import React from "react";

const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-4 text-left">
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </th>
                        <th className="py-3 px-4 text-left">
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </th>
                        <th className="py-3 px-4 text-left">
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </th>
                        <th className="py-3 px-4 text-left">
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </th>
                        <th className="py-3 px-4 text-left">
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </th>
                        <th className="py-3 px-4 text-left">
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </th>
                        <th className="py-3 px-4 text-left">
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="py-3 px-4">
                                <div className="h-6 bg-gray-300 rounded"></div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="h-6 bg-gray-300 rounded"></div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="h-6 bg-gray-300 rounded"></div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="h-6 bg-gray-300 rounded"></div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="h-6 bg-gray-300 rounded"></div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="h-6 bg-gray-300 rounded"></div>
                            </td>
                            <td className="py-3 px-4">
                                <div className="h-6 bg-gray-300 rounded"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoadingSkeleton;