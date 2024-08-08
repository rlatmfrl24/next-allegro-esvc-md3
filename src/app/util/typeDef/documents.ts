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

export interface SeaWaybillTableProps extends ResultTableProps {
  issueDate: DateTime;
}

export interface BLIssueRequestTableProps {
  uuid: string;
  isFreight: boolean;
  status: "Requested" | "Confirmed" | "Pending" | "Rejected";
  blType: "Original B/L" | "eB/L" | "Switch B/L" | "SeaWaybill";
  bookingNumber: string;
  actualShipper: string;
  vvd: VesselInfoType;
  polEtb: DateTime;
  polEtd: DateTime;
  pol: string;
  pod: string;
  qty: string;
  demdet: boolean;
  requestBlType: "Surrender" | "Original" | "Switch" | "SeaWaybill";
  requestBlTypeDate: DateTime;
  requestBlPic: string;
}
