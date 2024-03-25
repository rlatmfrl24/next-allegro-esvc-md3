import { atom } from "recoil";
import { QuotationTermsType } from "../util/typeDef/pricing";
import { PlaceInformationType } from "../util/typeDef/schedule";
import { DateTime } from "luxon";

export const QuotationTermsState = atom<QuotationTermsType>({
  key: "QuotationTermsState",
  default: {
    origin: {} as PlaceInformationType,
    destination: {} as PlaceInformationType,
    originServiceTerm: "CY",
    destinationServiceTerm: "CY",
    pol: {} as PlaceInformationType,
    pod: {} as PlaceInformationType,
    departureDate: DateTime.now(),
    grossWeight: 0,
    weightUnit: "KGS",
    containers: [
      {
        containerType: "Dry 20",
        quantity: 0,
      },
    ],
  },
});
