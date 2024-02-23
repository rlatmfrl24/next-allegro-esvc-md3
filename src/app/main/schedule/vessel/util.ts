import { VesselInfoType } from "@/app/util/typeDef";
import { faker } from "@faker-js/faker";

export function createDummyVesselData(): VesselInfoType[] {
  return Array.from({ length: 900 }, () => ({
    vesselName: (
      faker.string.alpha(4) +
      " " +
      faker.location.city() +
      " " +
      faker.string.numeric(4) +
      " (" +
      faker.string.alpha(4) +
      ")"
    ).toUpperCase(),
    serviceLane: faker.string.alpha(4).toUpperCase(),
    consortiumVoyage: faker.lorem.paragraph(1),
  }));
}
