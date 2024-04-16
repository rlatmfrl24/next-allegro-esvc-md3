import {
  CargoDetailType,
  CargoTrackingProps,
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
  const sailingCount = faker.number.int({ min: 0, max: 5 });

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
    ratio: faker.number.int({ min: 0, max: 100 }),
    transitType: faker.number.int({
      min: 0,
      max: 3,
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
        { length: faker.number.int({ min: 0, max: 5 }) },
        () => {
          return {
            description: faker.lorem.sentence(),
            date: DateTime.fromJSDate(faker.date.anytime()),
            location: createDummyPlaceInformation(
              faker.location.city() + ", " + faker.location.country()
            ),
          } as CargoDetailType;
        }
      ).sort((a, b) => a.date.toMillis() - b.date.toMillis()),
    },
  } as CargoTrackingProps;
}

export const getWeightText = (number: number) => {
  //add , to number and fixed to 3 decimal
  return number.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export function getLastActualInfo(dataset: CargoDetailType[]) {
  return dataset
    .filter((data) => data.date < DateTime.now())
    .sort((a, b) => b.date.toMillis() - a.date.toMillis())
    .pop();
}
