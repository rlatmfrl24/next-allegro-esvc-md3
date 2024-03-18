import {
  CargoTrackingProps,
  TrackingStatus,
  TransitType,
} from "@/app/util/typeDef/tracking";
import { faker } from "@faker-js/faker";
import { createDummyPlaceInformation } from "../../schedule/util";
import { DateTime } from "luxon";

export function createDummyCargoTrackingData() {
  return {
    id: faker.string.uuid(),
    bookingNumber: faker.string.alphanumeric(12).toUpperCase(),
    contaienrNumber: faker.string.alphanumeric(11).toUpperCase(),
    containerType: faker.helpers.arrayElement([
      "Dry",
      "Reefer",
      "Flatrack",
      "OpenTop",
      "Tank",
      "Bulk",
    ]),
    containerSize: faker.helpers.arrayElement(["20", "40", "45"]),
    por: createDummyPlaceInformation(
      faker.location.city() + ", " + faker.location.country()
    ),
    pol: createDummyPlaceInformation(
      faker.location.city() + ", " + faker.location.country()
    ),
    pod: createDummyPlaceInformation(
      faker.location.city() + ", " + faker.location.country()
    ),
    del: createDummyPlaceInformation(
      faker.location.city() + ", " + faker.location.country()
    ),
    porTime: DateTime.fromJSDate(faker.date.recent()),
    polTime: DateTime.fromJSDate(faker.date.recent()),
    podTime: DateTime.fromJSDate(faker.date.recent()),
    delTime: DateTime.fromJSDate(faker.date.recent()),
    trackingStatus: faker.number.int({
      min: 0,
      max: 5,
    }),
    transitType: faker.number.int({
      min: 0,
      max: 2,
    }),
    isFavorite: faker.helpers.maybe(() => true),
  } as CargoTrackingProps;
}
