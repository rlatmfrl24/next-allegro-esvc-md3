import { atom } from "recoil";
import { SignUpFormProps } from "../util/typeDef/sign";
import { faker } from "@faker-js/faker";

const UserState = atom({
  key: "UserState",
  default: {
    isAuthenticated: false,
    name: "",
    email: "",
  },
});

const UserProfileState = atom<SignUpFormProps>({
  key: "UserProfileState",
  default: {
    password: faker.internet.password({
      length: 10,
    }),
    userId: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    tel: faker.phone.number(),
    fax: faker.phone.number(),
    email: faker.internet.email(),
    trade: faker.helpers.arrayElement(["Import", "Export", "Import & Export"]),
    contactOffice: faker.location.city() + " Office",
    companyName: faker.company.name(),
    address: {
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
      city: faker.location.city(),
      street: faker.location.streetAddress(),
    },
    companyType: faker.helpers.arrayElement([
      "Shipper or Consignee",
      "Freight Forwarder",
      "Shipping Carrier",
      "Truck or Rail Company",
      "Others",
    ]),
    recentBLNumber: faker.string.alphanumeric(10).toUpperCase(),
  } as SignUpFormProps,
});

const DrawerState = atom({
  key: "DrawerState",
  default: {
    open: false,
  },
});

const ScrollState = atom({
  key: "ScrollState",
  default: {
    xPosition: 0,
    yPosition: 0,
    instance: null as any,
  },
});

export { UserState, DrawerState, ScrollState, UserProfileState };
