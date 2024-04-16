import {
  CargoDetailType,
  CargoTrackingProps,
  TrackingStatus,
  TransitType,
} from "@/app/util/typeDef/tracking";
import { faker } from "@faker-js/faker";
import {
  createDummyPlaceInformation,
  createDummyVesselInformations,
} from "../../schedule/util";
import { DateTime } from "luxon";

export function createDummyCargoTrackingData() {
  const pol = createDummyPlaceInformation(
    faker.location.city() + ", " + faker.location.country()
  );
  const pod = createDummyPlaceInformation(
    faker.location.city() + ", " + faker.location.country()
  );
  const sailingCount = faker.number.int({ min: 3, max: 8 });

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
    start: pol,
    end: pod,
    ratio: faker.number.float({ min: 0, max: 1 }),
    transitType: faker.number.int({
      min: 0,
      max: 2,
    }),
    sealNumber: faker.string.alphanumeric(8).toUpperCase(),
    weight: faker.number.float({ min: 100, max: 10000 }),
    weightUnit: faker.helpers.arrayElement(["KGS", "LBS"]),
    isFavorite: faker.helpers.maybe(() => true),
    lastPort: createDummyPlaceInformation(
      faker.location.city() + ", " + faker.location.country()
    ),
    lastPortTime: DateTime.fromJSDate(faker.date.anytime()),
    detailInfo: {
      cargoSailingInfo: Array.from({ length: sailingCount }, () => {
        return {
          port: createDummyPlaceInformation(
            faker.location.city() + ", " + faker.location.country()
          ),
          time: DateTime.fromJSDate(faker.date.anytime()),
        };
      }),
      cargoSailingVessel: createDummyVesselInformations(sailingCount - 1),
      cargoDetail: Array.from(
        { length: faker.number.int({ min: 3, max: 8 }) },
        () => {
          return {
            description: faker.lorem.sentence(),
            date: DateTime.fromJSDate(faker.date.anytime()),
            location: createDummyPlaceInformation(
              faker.location.city() + ", " + faker.location.country()
            ),
          } as CargoDetailType;
        }
      ),
    },
  } as CargoTrackingProps;
}

export const getStatusText = (status: TrackingStatus) => {
  switch (status) {
    case TrackingStatus.Departed:
      return "Departure from Port of Receipt";
    case TrackingStatus.ArrivedAtPOL:
      return "Arrived at Port of Loading";
    case TrackingStatus.TransitToPOD:
      return "Transit to Port of Discharge";
    case TrackingStatus.ArrivedAtPOD:
      return "Arrived at Port of Discharge";
    case TrackingStatus.TransitToDEL:
      return "Transit to Destination";
    case TrackingStatus.ArrivedAtDEL:
      return "Arrived at Destination";
  }
};

export const getWeightText = (number: number) => {
  //add , to number and fixed to 3 decimal
  return number.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
