import { Dispatch, ReactNode, SetStateAction } from "react";

import { ColumnDef, PaginationState } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  InputFilter?: InputFilter;
  DateFrom?: DateFrom;
  pageCount?: number;
  pagination?: PaginationState;
  setPagination?: Dispatch<SetStateAction<PaginationState>>;
  rowCount?: number;
  FilterArray?: FilterArray[];
  Header?: HeaderProps;
  className?: string;
  isLoading?: boolean;
  message?: string;
  Action?: ReactNode;
  subscriptionPlan?: number;
  lockTable?: boolean;
  tableName: string;
  setFetchedData?: Dispatch<SetStateAction<any>>;
  tableClassName?: string;
}
export interface InputFilter {
  placeholder: string;
  column: string;
}
export interface pagination {
  pageIndex: number;
  pageSize: number;
}
export interface DateFrom {
  column?: string;
  handleDateChange?: (e: any) => void;
  dates?: any;
  searchKey?: string;
  handleSearch: (e: string) => void;
  handleSearchByLocation: (e: string) => void;
}

export interface HeaderProps {
  icon: any;
  label: string;
  count?: number;
}
export interface FilterArray {
  title: string;
  name: string;
  options?: {
    label: string | null | undefined;
    value: string[] | number[] | string | number | boolean | undefined | null;
  }[];
  className?: string;
  siblings?: React.ReactNode;
  filterByOne?: boolean;
}
