"use client"
import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';

// Define the type for an inspection item
export type InspectionItem = {
  id: number;
  teamName: string;
  inspectionDate: string;
  inspectionType: string;
  inspectionStatus: string;
};

// Define the props type for the Table component
interface TableProps {
  data: InspectionItem[];
}
import { useRouter } from 'next/navigation';

const Table = ({ data = [] }: TableProps) => {
    const router = useRouter()
  // Action handlers for row buttons
  const handleViewDetails = (id: number) => {
    console.log(`View details for inspection #${id}`);

    // Example implementation:
    router.push(`/inspection-plan/inspections/${id}`);
  };
  
  const handleEdit = (id: number) => {
    console.log(`Edit inspection #${id}`);
    // Example implementation:
    // setEditingInspectionId(id);
    // setShowEditModal(true);
  };
  
  const handleStartInspection = (id: number) => {
    console.log(`Start inspection #${id}`);
    // Example implementation:
    // updateInspectionStatus(id, 'In Progress');
  };
  // Define columns - memoized to prevent unnecessary re-renders
  const columns = useMemo<MRT_ColumnDef<InspectionItem>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'teamName',
        header: 'Team Name',
        size: 150,
      },
      {
        accessorKey: 'inspectionDate',
        header: 'Date',
        size: 120,
        // Add date formatting if needed
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return date.toLocaleDateString();
        },
      },
      {
        accessorKey: 'inspectionType',
        header: 'Type',
        size: 120,
      },
      {
        accessorKey: 'inspectionStatus',
        header: 'Status',
        size: 120,
        // Add custom cell rendering for status
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          let bgColor = 'bg-gray-100';
          let textColor = 'text-gray-800';
          
          switch (status) {
            case 'Completed':
              bgColor = 'bg-green-100';
              textColor = 'text-green-800';
              break;
            case 'Pending':
              bgColor = 'bg-yellow-100';
              textColor = 'text-yellow-800';
              break;
            case 'In Progress':
              bgColor = 'bg-blue-100';
              textColor = 'text-blue-800';
              break;
            case 'Scheduled':
              bgColor = 'bg-purple-100';
              textColor = 'text-purple-800';
              break;
          }
          
          return (
            <span className={`px-2 py-1 rounded-full text-xs ${bgColor} ${textColor}`}>
              {status}
            </span>
          );
        },
      },
      // Action column with buttons
      {
        id: 'actions',
        header: 'Actions',
        size: 150,
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          const inspection = row.original;
          
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleViewDetails(inspection.id)}
                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
              >
                View
              </button>
              
              {/* {inspection.inspectionStatus !== 'Completed' && (
                <button
                  onClick={() => handleEdit(inspection.id)}
                  className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                >
                  Edit
                </button>
              )}
              
              {inspection.inspectionStatus === 'Scheduled' && (
                <button
                  onClick={() => handleStartInspection(inspection.id)}
                  className="px-2 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 transition-colors"
                >
                  Start
                </button>
              )} */}
            </div>
          );
        },
      },
    ],
    [],
  );

  // Configure the table
  const table = useMantineReactTable({
    columns,
    data,
    enableColumnFilters: true,
    enableSorting: true,
    enablePagination: true,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      sorting: [{ id: 'inspectionDate', desc: true }],
    },
    mantineTableProps: {
      striped: true,
      highlightOnHover: true,
    },
  });

  return <MantineReactTable table={table} />;
};

export default Table;