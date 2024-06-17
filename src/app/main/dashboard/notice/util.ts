import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export type NoticeProps = {
  title: string;
  contents: string;
  date: DateTime;
};

export function createDummyNotice(): NoticeProps {
  return {
    title: faker.lorem.sentence(),
    contents: faker.lorem.paragraphs(20),
    date: DateTime.fromJSDate(faker.date.recent()),
  };
}
