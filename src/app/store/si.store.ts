import { atom } from "recoil";
import {
  ConsigneeProps,
  NotifyPartyProps,
  SIContainerInputProps,
  SIEditContactInformationType,
  SIEditDataType,
  SIEditMarkDescriptionType,
  SIEditPartiesType,
  SIPartiesProps,
  SIRouteBLType,
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
    shipper: {
      companyName: "",
      fullAddress: "",
    } as SIPartiesProps,
    consignee: {
      companyName: "",
      fullAddress: "",
    } as ConsigneeProps,
    notifyParty: {
      companyName: "",
      fullAddress: "",
      alsoNotify: "",
    } as NotifyPartyProps,
    exportReference: "",
    forwardingAgentReference: "",
  },
});

export const SIEditRouteBLState = atom<SIRouteBLType>({
  key: "siEditRouteBLState",
  default: {
    remarks: "",
    blType: "none",
    freightTerms: "prepaid",
    houseBLInvovled: "none",
  } as SIRouteBLType,
});

export const SIEditContactInformationState = atom<SIEditContactInformationType>(
  {
    key: "siEditContactInformationState",
    default: {
      name: "",
      phone: "",
      telNumber: "",
      fax: "",
      emailRecipient: [],
      subscrition: {
        rollOver: false,
        vesselAdvanceDelay: false,
        vesselDeparture: false,
      },
    },
  }
);

export const SIEditMarkDescriptionState = atom<SIEditMarkDescriptionType>({
  key: "siEditMarkDescriptionState",
  default: {
    mark: "",
    description: "",
    hsCode: "",
    descriptionFile: null,
    customsCommodity: "",
  },
});

export const SIEditContainerState = atom<{
  dry: SIContainerInputProps[];
  reefer: SIContainerInputProps[];
  opentop: SIContainerInputProps[];
  tank: SIContainerInputProps[];
  flatrack: SIContainerInputProps[];
  bulk: SIContainerInputProps[];
  weightUnit: "KGS" | "LBS";
  measurementUnit: "CBM" | "CBF";
}>({
  key: "siEditContainerState",
  default: {
    dry: [],
    reefer: [],
    opentop: [],
    tank: [],
    flatrack: [],
    bulk: [],
    weightUnit: "KGS",
    measurementUnit: "CBM",
  },
});

export const CurrentSIConditionState = atom<SIEditDataType>({
  key: "currentSIConditionState",
  default: {
    parties: {} as SIEditPartiesType,
    routeBL: {} as SIRouteBLType,
    container: {
      dry: [],
      reefer: [],
      opentop: [],
      tank: [],
      flatrack: [],
      bulk: [],
    },
    markDescription: {} as SIEditMarkDescriptionType,
    contactInformation: {} as SIEditContactInformationType,
  },
});