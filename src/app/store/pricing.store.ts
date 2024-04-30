import { atom } from "recoil";
import {
  QuotationContainerType,
  QuotationTermsType,
} from "../util/typeDef/pricing";
import { PlaceInformationType } from "../util/typeDef/schedule";
import { DateTime } from "luxon";

export const QuotationTermsState = atom<QuotationTermsType>({
  key: "QuotationTermsState",
  default: {
    origin: {} as PlaceInformationType,
    destination: {} as PlaceInformationType,
    originServiceTerm: "CY",
    destinationServiceTerm: "CY",
    departureDate: DateTime.now(),
    grossWeight: 0,
    weightUnit: "KGS",
    containers: [
      {
        containerType: QuotationContainerType.Dry20,
        quantity: 0,
      },
    ],
  },
});
