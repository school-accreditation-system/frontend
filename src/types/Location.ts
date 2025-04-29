export interface Location {
  locationId: string;
  locationCode: string;
  name: string;
  type: LocationType;
  parentCode?: string;
  parent: Location | null;
  location: Location | null;
}
