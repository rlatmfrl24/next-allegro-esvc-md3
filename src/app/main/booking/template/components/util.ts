import {
  createDummyPlaceInformation,
  createDummyVesselInformation,
} from "@/app/main/schedule/util";
import {
  AdditionalInformatioType,
  BulkContainerInformationType,
  CargoPickUpReturnType,
  ContactInformationType,
  DryContainerInformationType,
  FlatRackContainerInformationType,
  LocationScheduleType,
  OpenTopContainerInformationType,
  PartiesType,
  ReeferContainerInformationType,
  TankContainerInformationType,
} from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export function createDummyBooking(): {
  locationSchedule: LocationScheduleType;
  parties: PartiesType;
  cargoPickUpReturn: CargoPickUpReturnType;
  additionalInformation: AdditionalInformatioType;
  contactInformation: ContactInformationType;
  container: {
    dry: DryContainerInformationType[];
    reefer: ReeferContainerInformationType[];
    tank: TankContainerInformationType[];
    opentop: OpenTopContainerInformationType[];
    flatrack: FlatRackContainerInformationType[];
    bulk: BulkContainerInformationType[];
  };
} {
  return {
    locationSchedule: {
      bookingOffice: faker.company.name(),
      contractNumber: faker.string.alphanumeric(10).toUpperCase(),
      departureDate: DateTime.fromJSDate(faker.date.future()),
      destinationPort: createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      ),
      destinationType: "cy",
      originPort: createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      ),
      originType: "cy",
      pod: createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      ),
      pol: createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      ),
      searchType: "schedule",
      vessel: createDummyVesselInformation(),
    },
    parties: {
      personPlacingRequest: faker.helpers.arrayElement([
        "Shipper",
        "Forwarder",
      ]),
      shipper: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
      },
      freightForwarder: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
      },
      consignee: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
      },
      actualShipper: faker.company.name(),
    },
    cargoPickUpReturn: {
      emptyPickUpDate: DateTime.fromJSDate(faker.date.future()),
      emptyPickUpLocation: createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      ),
      fullReturnDate: DateTime.fromJSDate(faker.date.future()),
      fullReturnLocation: createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      ),
      grossWeight: faker.number.int().toString(),
      grossWeightUnit: "KGS",
      commodity: {
        code: faker.string.alphanumeric(5).toUpperCase(),
        description: faker.commerce.productName(),
      },
    },
    additionalInformation: {
      attachment: [],
      specialCargoAttachment: {
        awkwardCargo: [],
        dangerousCargo: [],
        reeferCargo: [],
      },
      duplicateCount: 1,
      specialInstruction: "",
      emailSubscription: {
        rollOver: false,
        vesselAdvanceDelay: false,
        vesselDeparture: false,
      },
    },
    contactInformation: {
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      emailRecipient: [],
      faxNo: faker.phone.number(),
      telNo: faker.phone.number(),
      name: faker.person.fullName(),
    },
    container: {
      bulk: [],
      dry: [],
      flatrack: [],
      opentop: [],
      reefer: [],
      tank: [],
    },
  };
}
