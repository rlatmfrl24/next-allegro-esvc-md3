import { DateTime } from "luxon";
import { PlaceInformationType } from "./schedule";

export enum QuotationContainerType {
  Dry20 = "Dry 20",
  Dry40 = "Dry 40",
  Dry45 = "Dry 45",
}

export type QuotationTermsType = {
  origin: PlaceInformationType;
  destination: PlaceInformationType;
  originServiceTerm: "CY" | "Door";
  destinationServiceTerm: "CY" | "Door";
  departureDate: DateTime;
  grossWeight: number;
  weightUnit: "KGS" | "LBS";
  containers: {
    containerType: QuotationContainerType;
    quantity: number;
  }[];
};
