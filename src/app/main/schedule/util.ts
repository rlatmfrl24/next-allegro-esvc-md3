import {
  PlaceInformationType,
  VesselInfoType,
  VesselScheduleType,
  PortScheduleType,
  BaseScheduleType,
  PtPSearchConditionType,
  PtPScheduleType,
  LongRangeScheduleType,
  LongRangeDateType,
  LongRangePortType,
} from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export function createDummyPlaceInformation(
  placeName: string
): PlaceInformationType {
  return {
    code: faker.string.alpha(4).toUpperCase(),
    yardName: placeName,
    address: faker.location.streetAddress(),
    phoneNo: faker.phone.imei(),
    faxNo: faker.phone.number(),
    customerNo: faker.string.uuid(),
    emailAddress: faker.internet.email(),
  };
}

export function createDummyVesselInformation(): VesselInfoType {
  return {
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
  };
}

export function createDummyVesselInformations(
  number: number
): VesselInfoType[] {
  return Array.from({ length: number }, () => createDummyVesselInformation());
}

export function createDummyVesselSchedules(
  size: number = 500
): VesselScheduleType[] {
  return Array.from({ length: size }, (_, i) => {
    const tempDate =
      i > 5
        ? DateTime.fromJSDate(faker.date.future())
        : DateTime.fromJSDate(faker.date.past());

    return {
      port: faker.location.city(),
      terminal: createDummyPlaceInformation(faker.location.city()),
      origin: createDummyPlaceInformation(faker.location.city()),
      destination: createDummyPlaceInformation(faker.location.city()),
      vesselInfo: createDummyVesselInformation(),
      departureDate: tempDate,
      berthingDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
      arrivalDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
    };
  });
}

export function createDummyPortSchedules(
  size: number = 20
): PortScheduleType[] {
  return Array.from({ length: size }, (_, i) => {
    const tempDate =
      i > 10
        ? DateTime.fromJSDate(faker.date.future())
        : DateTime.fromJSDate(faker.date.past());

    return {
      origin: createDummyPlaceInformation(faker.location.city()),
      destination: createDummyPlaceInformation(faker.location.city()),
      terminal: createDummyPlaceInformation(faker.location.city()),
      vesselInfo: createDummyVesselInformation(),
      vesselSchedules: createDummyVesselSchedules(),
      departureDate: tempDate,
      berthingDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
      arrivalDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
    };
  });
}

export function createDummyBaseScheduleData(size: number): BaseScheduleType[] {
  return Array.from({ length: size }, (_, i) => {
    const tempDate =
      i > 10
        ? DateTime.fromJSDate(faker.date.future())
        : DateTime.fromJSDate(faker.date.past());

    return {
      origin: createDummyPlaceInformation(faker.location.city()),
      destination: createDummyPlaceInformation(faker.location.city()),
      vesselInfo: createDummyVesselInformation(),
      departureDate: tempDate,
      berthingDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
      arrivalDate: tempDate.plus({ days: faker.number.int({ max: 10 }) }),
    };
  });
}

export function createDummyPtPScheduleData(
  condition: PtPSearchConditionType
): PtPScheduleType[] {
  const { origins, destinations, searchOn, startDate, endDate } = condition;

  // This function is a dummy function that returns an empty array.
  const dummyData: PtPScheduleType[] = [];

  Array.from({ length: 10 }).map((_, index) => {
    for (const origin of origins) {
      for (const destination of destinations) {
        // Create a new list item using the condition properties
        const dateRange = faker.date.betweens({
          from: startDate.toJSDate(),
          to: endDate.toJSDate(),
        });

        const listItem: PtPScheduleType = {
          origin: createDummyPlaceInformation(origin),
          destination: createDummyPlaceInformation(destination),
          departureDate: DateTime.fromJSDate(dateRange[0]),
          berthingDate: DateTime.fromJSDate(dateRange[0]),
          arrivalDate: DateTime.fromJSDate(dateRange[1]),
          vesselInfo: createDummyVesselInformation(),
          transitTime: Math.round(
            DateTime.fromJSDate(dateRange[1]).diff(
              DateTime.fromJSDate(dateRange[0]),
              "days"
            ).days
          ),
          serviceLane: faker.string.alpha(3).toUpperCase(),
        };

        // Add the new list item to the dummy data array
        dummyData.push(listItem);
      }
    }
  });

  return dummyData;
}

export function createDummyPortList(): LongRangePortType[] {
  return Array.from(
    {
      length: faker.number.int({
        min: 20,
        max: 30,
      }),
    },
    (_, i) => {
      const fakeCity = faker.location;
      return {
        name: `${fakeCity.city()}, ${fakeCity.country()}`.toUpperCase(),
        direction: faker.helpers.arrayElement([
          "north",
          "south",
          "east",
          "west",
        ]),
      };
    }
  );
}

export function createDummyLongRangeSchedule(
  portList: LongRangePortType[],
  hasDeparture = true
): LongRangeScheduleType {
  return {
    vesselInfo: createDummyVesselInformation(),
    vesselSchedules: createDummyVesselSchedules(),
    remarkInfo: faker.helpers.maybe(() => faker.lorem.paragraph(1)),
    longRangeDates: portList.map((port) => {
      return {
        port,
        arrival: DateTime.fromJSDate(faker.date.future()),
        departure: hasDeparture
          ? DateTime.fromJSDate(faker.date.future())
          : undefined,
      } as LongRangeDateType;
    }),
  };
}

export function createDummyLongRangeSchedules(
  hasDeparture = true,
  length = 30
) {
  const portList = createDummyPortList();
  const schedules = Array.from({ length: length }, () =>
    createDummyLongRangeSchedule(portList, hasDeparture)
  );
  return {
    schedules,
    portList,
  };
}
