import { useState, useEffect, useCallback, useRef } from "react";
import { useQueryStates } from "nuqs";

export interface SchoolFilterState {
  query?: string;
  provinces: string[];
  districts: string[];
  sectors: string[];
  schoolTypes: string[];
  combinations: string[];
}

// Map filter names to their URL parameter keys
const paramKeyMap: Record<string, string> = {
  provinces: "provinces",
  districts: "districts",
  sectors: "sectors",
  schoolTypes: "schoolTypes",
  combinations: "combinations",
  query: "q",
};

export const useSchoolFilters = () => {
  const [checkboxes, setCheckboxes] = useState<Record<string, boolean>>({
    provinces: false,
    districts: false,
    sectors: false,
    schoolTypes: false,
    combinations: false,
  });

  const [selectedValues, setSelectedValues] = useState<SchoolFilterState>({
    query: "",
    provinces: [],
    districts: [],
    sectors: [],
    schoolTypes: [],
    combinations: [],
  });

  // Common parse/serialize functions for array parameters
  const arrayParamConfig = {
    parse: (v: string) =>
      v && v !== "undefined" ? v.split(",").filter(Boolean) : [],
    serialize: (v: string[] | undefined) =>
      Array.isArray(v) && v.length > 0 ? v.join(",") : "",
  };

  const [queryParams, setQueryParams] = useQueryStates({
    q: {
      parse: (v: string) => (v && v !== "undefined" ? v : ""),
      serialize: (v: string | undefined) =>
        v && v !== "undefined" && v !== "" ? v : undefined,
    },
    provinces: arrayParamConfig,
    districts: arrayParamConfig,
    sectors: arrayParamConfig,
    schoolTypes: arrayParamConfig,
    combinations: arrayParamConfig,
  });

  // Use a flag to prevent infinite loops during initial sync
  const isInitialSync = useRef(true);

  // Sync URL params to local state
  useEffect(() => {
    const newSelectedValues = {
      query: queryParams.q || "",
      provinces: Array.isArray(queryParams.provinces)
        ? queryParams.provinces
        : [],
      districts: Array.isArray(queryParams.districts)
        ? queryParams.districts
        : [],
      sectors: Array.isArray(queryParams.sectors) ? queryParams.sectors : [],
      schoolTypes: Array.isArray(queryParams.schoolTypes)
        ? queryParams.schoolTypes
        : [],
      combinations: Array.isArray(queryParams.combinations)
        ? queryParams.combinations
        : [],
    };

    const newCheckboxes = {
      provinces:
        Array.isArray(queryParams.provinces) &&
        queryParams.provinces.length > 0,
      districts:
        Array.isArray(queryParams.districts) &&
        queryParams.districts.length > 0,
      sectors:
        Array.isArray(queryParams.sectors) && queryParams.sectors.length > 0,
      schoolTypes:
        Array.isArray(queryParams.schoolTypes) &&
        queryParams.schoolTypes.length > 0,
      combinations:
        Array.isArray(queryParams.combinations) &&
        queryParams.combinations.length > 0,
    };

    // Always update on initial sync, then use deep comparison
    if (isInitialSync.current) {
      setSelectedValues(newSelectedValues);
      setCheckboxes(newCheckboxes);
      isInitialSync.current = false;
    } else {
      // Only update if there are actual changes
      setSelectedValues((prev) => {
        const changed =
          prev.query !== newSelectedValues.query ||
          prev.provinces.length !== newSelectedValues.provinces.length ||
          prev.districts.length !== newSelectedValues.districts.length ||
          prev.sectors.length !== newSelectedValues.sectors.length ||
          prev.schoolTypes.length !== newSelectedValues.schoolTypes.length ||
          prev.combinations.length !== newSelectedValues.combinations.length ||
          !prev.provinces.every((v) =>
            newSelectedValues.provinces.includes(v)
          ) ||
          !prev.districts.every((v) =>
            newSelectedValues.districts.includes(v)
          ) ||
          !prev.sectors.every((v) => newSelectedValues.sectors.includes(v)) ||
          !prev.schoolTypes.every((v) =>
            newSelectedValues.schoolTypes.includes(v)
          ) ||
          !prev.combinations.every((v) =>
            newSelectedValues.combinations.includes(v)
          );

        return changed ? newSelectedValues : prev;
      });

      setCheckboxes((prev) => {
        const changed =
          prev.provinces !== newCheckboxes.provinces ||
          prev.districts !== newCheckboxes.districts ||
          prev.sectors !== newCheckboxes.sectors ||
          prev.schoolTypes !== newCheckboxes.schoolTypes ||
          prev.combinations !== newCheckboxes.combinations;

        return changed ? newCheckboxes : prev;
      });
    }
  }, [
    queryParams.q,
    queryParams.provinces,
    queryParams.districts,
    queryParams.sectors,
    queryParams.schoolTypes,
    queryParams.combinations,
  ]);

  const handleCheckbox = useCallback(
    (filter: string, checked: boolean) => {
      setCheckboxes((prev) => ({
        ...prev,
        [filter]: checked,
      }));

      if (!checked) {
        setSelectedValues((prev) => ({
          ...prev,
          [filter]: [],
        }));

        const paramKey = paramKeyMap[filter];
        setQueryParams((prev) => ({
          ...prev,
          [paramKey]: undefined,
          page: 1,
        }));
      }
    },
    [setQueryParams]
  );

  const handleSelectedValue = useCallback(
    (filter: string, values: string[]) => {
      const safeValues = Array.isArray(values) ? values : [];

      setSelectedValues((prev) => ({
        ...prev,
        [filter]: safeValues,
      }));

      const paramKey = paramKeyMap[filter];
      setQueryParams((prev) => ({
        ...prev,
        [paramKey]: safeValues.length > 0 ? safeValues : undefined,
        page: 1,
      }));
    },
    [setQueryParams]
  );

  const handleSearchQuery = useCallback(
    (query: string) => {
      setSelectedValues((prev) => ({
        ...prev,
        query,
      }));

      setQueryParams((prev) => ({
        ...prev,
        q: query,
        page: 1,
      }));
    },
    [setQueryParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setQueryParams((prev) => ({
        ...prev,
        page,
      }));
    },
    [setQueryParams]
  );

  const clearFilters = useCallback(() => {
    setCheckboxes({
      provinces: false,
      districts: false,
      sectors: false,
      schoolTypes: false,
      combinations: false,
    });

    setSelectedValues({
      query: "",
      provinces: [],
      districts: [],
      sectors: [],
      schoolTypes: [],
      combinations: [],
    });

    // Reset sync flag for next URL change
    isInitialSync.current = true;

    setQueryParams(null);
  }, [setQueryParams]);

  const setMaxLength = useCallback((selected: string[]) => {
    if (selected?.length <= 2) {
      return selected.join(", ");
    }
    return `${selected?.length} selected`;
  }, []);

  const hasSelectedValues = useCallback(() => {
    return (
      (selectedValues.query && selectedValues.query.length > 0) ||
      selectedValues.provinces.length > 0 ||
      selectedValues.districts.length > 0 ||
      selectedValues.sectors.length > 0 ||
      selectedValues.schoolTypes.length > 0 ||
      selectedValues.combinations.length > 0
    );
  }, [selectedValues]);

  return {
    checkboxes,
    selectedValues,
    currentPage: queryParams.page || 1,
    handleCheckbox,
    handleSelectedValue,
    handleSearchQuery,
    handlePageChange,
    clearFilters,
    setMaxLength,
    hasSelectedValues,
  };
};
