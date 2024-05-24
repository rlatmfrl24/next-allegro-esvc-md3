import {
  PlaceInformationType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import {
  createDummyPlaceInformation,
  createDummyVesselInformation,
} from "../../schedule/util";

export interface SpecialCargoStatusProps {
  bookingNumber: string;
  targetVessel: {
    pod: PlaceInformationType;
    pol: PlaceInformationType;
    vessel: VesselInfoType;
  };
  typeSize: string;
  requestDate: DateTime;
  approval: "Approved" | "Requested" | "Rejected";
  approvalDate: DateTime;
}

export interface DangerousCargoStatusProps extends SpecialCargoStatusProps {
  class: string;
  unNumber: string;
}

export interface AwkwardCargoStatusProps extends SpecialCargoStatusProps {
  dimension: {
    left: number;
    right: number;
    height: number;
  };
}

export function createDummySpecialCargoStatus(): SpecialCargoStatusProps {
  return {
    bookingNumber: (
      faker.string.alpha(2) + faker.string.numeric(7)
    ).toUpperCase(),
    targetVessel: {
      pod: createDummyPlaceInformation(faker.location.city()),
      pol: createDummyPlaceInformation(faker.location.city()),
      vessel: createDummyVesselInformation(),
    },
    typeSize: faker.helpers.arrayElement(["Dry 20", "Dry 40", "Reefer 20"]),
    requestDate: DateTime.fromJSDate(faker.date.recent()),
    approval: faker.helpers.arrayElement(["Approved", "Requested", "Rejected"]),
    approvalDate: DateTime.fromJSDate(faker.date.recent()),
  };
}

export function createDummyDangerousCargoStatus(): DangerousCargoStatusProps {
  return {
    ...createDummySpecialCargoStatus(),
    class: faker.helpers.arrayElement(["1.1", "1.2", "1.3"]),
    unNumber: faker.string.numeric(4),
  };
}

export function createDummyAwkwardCargoStatus(): AwkwardCargoStatusProps {
  return {
    ...createDummySpecialCargoStatus(),
    dimension: {
      left: faker.number.int(500),
      right: faker.number.int(500),
      height: faker.number.int(500),
    },
  };
}
