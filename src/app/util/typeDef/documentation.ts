import { DateTime } from "luxon";
import { VesselInfoType } from "./schedule";

export interface ResultTableProps {
  blNumber: string;
  origin: string;
  destination: string;
  vessel: VesselInfoType;
  onBoardDate: DateTime;
  freight: boolean;
}
