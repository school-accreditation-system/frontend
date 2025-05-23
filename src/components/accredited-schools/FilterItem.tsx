"use client";

import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectTrigger
} from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";

export interface FilterOption {
    id: string;
    name: string;
    provinceId?: string;
    color?: string;
}

interface FilterItemProps {
    label: string;
    filterKey: string;
    options: FilterOption[];
    selectedValues: string[];
    onSelectionChange: (values: string[]) => void;
    onCheckboxChange: (checked: boolean) => void;
    isChecked: boolean;
    searchable?: boolean;
}

export function FilterItem({
    label,
    filterKey,
    options,
    selectedValues,
    onSelectionChange,
    onCheckboxChange,
    isChecked,
    searchable = true,
}: FilterItemProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const wasCheckedRef = useRef(isChecked);

    // Only update the checkbox state if it actually changed
    useEffect(() => {
        wasCheckedRef.current = isChecked;
    }, [isChecked]);

    const handleToggleSelection = (id: string) => {
        if (selectedValues.includes(id)) {
            onSelectionChange(selectedValues.filter((v) => v !== id));
        } else {
            onSelectionChange([...selectedValues, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedValues?.length === filteredOptions?.length && filteredOptions?.length > 0) {
            onSelectionChange([]);
        } else {
            onSelectionChange(filteredOptions?.map((option) => option?.id));
        }
    };

    const filteredOptions = options.filter((option) =>
        option?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getLabelContent = () => {
        if (selectedValues?.length === 0) {
            return <span className="text-gray-500">{label}</span>;
        }

        if (selectedValues?.length === 1) {
            const selectedOption = options.find((opt) => opt.id === selectedValues[0]);
            return (
                <span className="text-gray-900 font-medium">
                    {selectedOption?.name || selectedValues[0]}
                </span>
            );
        }

        if (selectedValues?.length <= 2) {
            return (
                <span className="text-gray-900 font-medium">
                    {selectedValues
                        .map((id) => options?.find((opt) => opt?.id === id)?.name)
                        .filter(Boolean)
                        .join(", ")}
                </span>
            );
        }

        return (
            <span className="text-gray-900 font-medium">
                {selectedValues?.length} selected
            </span>
        );
    };

    const handleOpenChange = (open: boolean) => {
        if (open) {
            onCheckboxChange(true);
            setSearchQuery("");
        }
    };

    const isAllSelected = filteredOptions?.length > 0 && selectedValues?.length === filteredOptions?.length;
    const isSomeSelected = selectedValues?.length > 0 && selectedValues?.length < filteredOptions?.length;

    return (
        <div className="relative w-full">
            <Select onOpenChange={handleOpenChange}>
                <SelectTrigger className="h-14 w-full bg-white border-gray-300 hover:border-gray-400 focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 transition-all duration-200">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex-1 text-left">
                            {getLabelContent()}
                        </div>
                        {/* <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" /> */}
                    </div>
                </SelectTrigger>
                <SelectContent className="z-[250] p-0 w-[var(--radix-select-trigger-width)] min-w-[320px] max-w-[400px]">
                    <div className="p-4 space-y-4">
                        {/* Search Input */}
                        {searchable && (
                            <div className="relative">
                                <Input
                                    placeholder={`Search ${label.toLowerCase().replace('all ', '')}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-10 text-sm"
                                />
                            </div>
                        )}

                        {/* Select All Option */}
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <Checkbox
                                id={`select-all-${filterKey}`}
                                checked={isAllSelected}
                                ref={(ref) => {
                                    if (ref) {
                                        ref.indeterminate = isSomeSelected && !isAllSelected;
                                    }
                                }}
                                onCheckedChange={handleSelectAll}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <label
                                htmlFor={`select-all-${filterKey}`}
                                className="text-sm font-medium cursor-pointer select-none flex-1"
                            >
                                {isAllSelected ? "Deselect All" : "Select All"}
                            </label>
                            {filteredOptions?.length > 0 && (
                                <span className="text-xs text-gray-500">
                                    ({filteredOptions?.length})
                                </span>
                            )}
                        </div>

                        {/* Separator */}
                        {filteredOptions?.length > 0 && (
                            <div className="border-t border-gray-100" />
                        )}

                        {/* Options List */}
                        <div className="max-h-[280px] overflow-y-auto space-y-1">
                            {filteredOptions?.length > 0 ? (
                                filteredOptions?.map((option) => (
                                    <div
                                        key={`${filterKey}-${option?.id}`}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
                                        onClick={() => handleToggleSelection(option?.id)}
                                    >
                                        <Checkbox
                                            id={`${filterKey}-${option?.id}`}
                                            checked={selectedValues?.includes(option?.id)}
                                            onCheckedChange={() => handleToggleSelection(option?.id)}
                                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                        <label
                                            htmlFor={`${filterKey}-${option?.id}`}
                                            className="text-sm cursor-pointer select-none flex-1 leading-tight"
                                        >
                                            {option?.name}
                                        </label>
                                        {option?.color && (
                                            <div
                                                className="w-3 h-3 rounded-full border border-gray-200"
                                                style={{ backgroundColor: option?.color }}
                                                aria-label={`Color indicator for ${option?.name}`}
                                            />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center">
                                    <p className="text-sm text-gray-500">
                                        {searchQuery ?
                                            `No ${label.toLowerCase().replace('all ', '')} found matching "${searchQuery}"` :
                                            `No ${label.toLowerCase().replace('all ', '')} available`
                                        }
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Selected count footer */}
                        {selectedValues?.length > 0 && (
                            <>
                                <div className="border-t border-gray-100" />
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>{selectedValues?.length} selected</span>
                                    {selectedValues?.length > 0 && (
                                        <button
                                            onClick={() => onSelectionChange([])}
                                            className="text-primary hover:text-primary-dark font-medium"
                                        >
                                            Clear selection
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </SelectContent>
            </Select>
        </div>
    );
} 