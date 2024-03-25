import { DateTime } from "luxon";
import { PlaceInformationType } from "./schedule";

export type QuotationTermsType = {
  origin: PlaceInformationType;
  destination: PlaceInformationType;
  originServiceTerm: "CY" | "Door";
  destinationServiceTerm: "CY" | "Door";
  pol: PlaceInformationType;
  pod: PlaceInformationType;
  departureDate: DateTime;
  grossWeight: number;
  weightUnit: "KGS" | "LBS";
  containers: {
    containerType: string;
    quantity: number;
  }[];
};
