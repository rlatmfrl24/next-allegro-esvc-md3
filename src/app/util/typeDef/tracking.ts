import { DateTime } from "luxon";
import { PlaceInformationType, VesselInfoType } from "./schedule";

export enum TrackingStatus {
  "Departed",
  "ArrivedAtPOL",
  "TransitToPOD",
  "ArrivedAtPOD",
  "TransitToDEL",
  "ArrivedAtDEL",
}

export enum TransitType {
  "Truck",
  "Train",
  "Ship",
  "Port",
}

export interface CargoTrackingProps {
  id: string;
  bookingNumber: string;
  contaienrNumber: string;
  containerType: string;
  containerSize: string;
  sealNumber: string;
  weight: number;
  weightUnit: string;
  start: PlaceInformationType;
  lastPort: PlaceInformationType;
  lastPortTime: DateTime;
  end: PlaceInformationType;
  ratio: number;
  transitType: TransitType;
  isFavorite: boolean;
  detailInfo: {
    cargoSailingInfo: CargoSailingInfoType[];
    cargoSailingVessel: VesselInfoType[];
    cargoDetail: CargoDetailType[];
  };
}

export type CargoSailingInfoType = {
  port: PlaceInformationType;
  time: DateTime;
};

export type CargoDetailType = {
  description: string;
  date: DateTime;
  location: PlaceInformationType;
};
