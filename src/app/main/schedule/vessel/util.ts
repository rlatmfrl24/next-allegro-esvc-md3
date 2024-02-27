import { VesselInfoType, VesselScheduleType } from "@/app/util/typeDef";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export function createDummyVesselData(): VesselInfoType[] {
  return Array.from({ length: 900 }, () => ({
    vesselName: (
      faker.string.alpha(4) +
      " " +
      faker.location.city() +
      " " +
      faker.string.numeric(4)
    ).toUpperCase(),
    vesselCode: faker.string.alpha(4).toUpperCase(),
    serviceLane: faker.string.alpha(4).toUpperCase(),
    consortiumVoyage: faker.lorem.paragraph(1),

    owner: faker.company.name(),
    ownerName: faker.person.firstName() + " " + faker.person.lastName(),
    classNumber: faker.string.alpha(4).toUpperCase(),
    officialNumber: faker.string.alpha(10).toUpperCase(),
    IMONumber: faker.string.alpha(7).toUpperCase(),
    callSign: faker.string.alpha(4).toUpperCase(),
    builtOn: faker.date.past().toISOString(),
    grossWeight: faker.number.int(100000),
    netWeight: faker.number.int(100000),
    age: faker.number.int(100),
    flag: faker.location.countryCode(),
    portOfRegistry: faker.location.city() + ", " + faker.location.country(),
  }));
}

export function createDummaryVesselSchedules(): VesselScheduleType[] {
  return Array.from({ length: 10 }, (_, i) => {
    const tempDate =
      i > 4
        ? DateTime.fromJSDate(faker.date.future())
        : DateTime.fromJSDate(faker.date.past());

    return {
      port: faker.location.city().toUpperCase(),
      terminal: faker.lorem.sentences(1),
      departureDate: tempDate,
      berthingDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
      arrivalDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
    };
  });
}
