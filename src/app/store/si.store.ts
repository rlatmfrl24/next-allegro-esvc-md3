import { atom } from "recoil";
import {
  ConsigneeProps,
  NotifyPartyProps,
  SIEditPartiesType,
  SIPartiesProps,
} from "../util/typeDef/si";

export const SIEditStepState = atom({
  key: "siEditStepState",
  default: {
    parties: {
      id: "parties",
      title: "Parties",
      isSelected: true,
      isCompleted: false,
    },
    routeBL: {
      id: "routeBL",
      title: "Route & B/L Information",
      isSelected: false,
      isCompleted: false,
    },
    container: {
      id: "container",
      title: "Container",
      isSelected: false,
      isCompleted: false,
    },
    markDescription: {
      id: "markDescription",
      title: "Mark & Description",
      isSelected: false,
      isCompleted: false,
    },
    contactInformation: {
      id: "contactInformation",
      title: "Contact Information",
      isSelected: false,
      isCompleted: false,
    },
  },
});

export const SIEditPartiesState = atom<SIEditPartiesType>({
  key: "siEditPartiesState",
  default: {
    shipper: {} as SIPartiesProps,
    consignee: {} as ConsigneeProps,
    notifyParty: {} as NotifyPartyProps,
    exportReference: "",
    forwardingAgentReference: "",
  },
});
