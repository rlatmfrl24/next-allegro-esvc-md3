import { DateTime } from "luxon";

export type ListItemProps = {
  origin: string;
  departure: DateTime;
  destination: string;
  arrival: DateTime;
  vesselName: string;
  transitTime: number;
  serviceLane: string;
};

export type SearchConditionProps = {
  origins: string[];
  destinations: string[];
  searchOn: "departure" | "arrival";
  startDate: DateTime;
  endDate: DateTime;
  directOnly: boolean;
};
