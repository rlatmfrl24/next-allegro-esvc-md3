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
    pol: pol,
    pod: pod,
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
    detailInfo: {
      cargoSailingInfo: {
        pod: pod,
        pol: pol,
        sealNumber: faker.string.alphanumeric(8).toUpperCase(),
        weight: faker.number.float({ min: 100, max: 10000 }),
        weightUnit: faker.helpers.arrayElement(["KGS", "LBS"]),
        vessels: createDummyVesselInformations(3),
      },
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

export const getLastLocation = (data: CargoTrackingProps) => {
  switch (data.trackingStatus) {
    case TrackingStatus.Departed:
      return data.por;
    case TrackingStatus.ArrivedAtPOL:
      return data.pol;
    case TrackingStatus.TransitToPOD:
      return data.pol;
    case TrackingStatus.ArrivedAtPOD:
      return data.pod;
    case TrackingStatus.TransitToDEL:
      return data.pod;
    case TrackingStatus.ArrivedAtDEL:
      return data.del;
  }
};

export const getLastLocationTime = (data: CargoTrackingProps) => {
  switch (data.trackingStatus) {
    case TrackingStatus.Departed:
      return data.porTime;
    case TrackingStatus.ArrivedAtPOL:
      return data.polTime;
    case TrackingStatus.TransitToPOD:
      return data.polTime;
    case TrackingStatus.ArrivedAtPOD:
      return data.podTime;
    case TrackingStatus.TransitToDEL:
      return data.podTime;
    case TrackingStatus.ArrivedAtDEL:
      return data.delTime;
  }
};

export const getWeightText = (number: number) => {
  //add , to number and fixed to 3 decimal
  return number.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
