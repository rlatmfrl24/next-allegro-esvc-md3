import { DateTime } from "luxon";
import { VesselInfoType } from "./schedule";

export enum SIState {
  None = "None",
  TemporarySaved = "Temporary Saved",
  Submit = "Submit",
  ChangeRequested = "Change Requested",
  ChangeRequestedRejected = "Change Requested Rejected",
  Confirmed = "Confirmed",
  Rejected = "Rejected",
  Pending = "Pending",
  BLIssueRequest = "B/L Issue Request",
  BLIssueConfirm = "B/L Issue Confirm",
  BLIssueRejected = "B/L Issue Rejected",
  BLIssuePending = "B/L Issue Pending",
  BLIssueClosed = "B/L Issue Closed",
}

export type SISearchTableProps = {
  requestNumber: string;
  bookingNumber: string;
  blState: SIState;
  blNumber: string;
  requestBlType: string;
  actualShipper: string;
  SiCutOffTime: DateTime;
  requestUpdateDate: DateTime;
  vessel: VesselInfoType;
  origin: string;
  destination: string;
  bookingVia: string;
  estimatedTimeofBerth: DateTime;
  estimatedTimeofDeparture: DateTime;
  estimatedTimeofArrival: DateTime;
  blType: string;
  remarks?: string;
};
