import { ListItemProps, SearchConditionProps } from "@/app/util/typeDef";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

export function createDummyScheduleData(
  condition: SearchConditionProps
): ListItemProps[] {
  const { origins, destinations, searchOn, startDate, endDate, directOnly } =
    condition;

  // This function is a dummy function that returns an empty array.
  const dummyData: ListItemProps[] = [];

  Array.from({ length: 10 }).map((_, index) => {
    for (const origin of origins) {
      for (const destination of destinations) {
        // Create a new list item using the condition properties
        const dateRange = faker.date.betweens(
          startDate.toJSDate(),
          endDate.toJSDate()
        );

        const listItem: ListItemProps = {
          origin,
          destination,
          departure: DateTime.fromJSDate(dateRange[0]),
          arrival: DateTime.fromJSDate(dateRange[1]),
          vesselName: faker.lorem
            .words(3)
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
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
