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
}

export interface CargoTrackingProps {
  id: string;
  bookingNumber: string;
  contaienrNumber: string;
  containerType: string;
  containerSize: string;
  por: PlaceInformationType;
  pol: PlaceInformationType;
  pod: PlaceInformationType;
  del: PlaceInformationType;
  porTime: DateTime;
  polTime: DateTime;
  podTime: DateTime;
  delTime: DateTime;
  trackingStatus: TrackingStatus;
  transitType: TransitType;
  isFavorite: boolean;
  detailInfo: {
    cargoSailingInfo: CargoSailingInfoType;
    cargoDetail: CargoDetailType[];
  };
}

export type CargoSailingInfoType = {
  pol: PlaceInformationType;
  pod: PlaceInformationType;
  sealNumber: string;
  weight: number;
  weightUnit: string;
  vessels: VesselInfoType[];
};

export type CargoDetailType = {
  description: string;
  date: DateTime;
  location: PlaceInformationType;
};
