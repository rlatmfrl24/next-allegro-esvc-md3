import { VesselInfoType } from "@/app/util/typeDef";
import { faker } from "@faker-js/faker";

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
