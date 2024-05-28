import { MdTypography } from "@/app/components/typography";
import { InfoOutlined } from "@mui/icons-material";
import { SubscriptionItemContainer } from "./component";
import { de, faker } from "@faker-js/faker";
import { useMemo } from "react";

type ReportSubscriptionProps = {
  origin: string;
  destination: string;
  inqueryType: "Customer" | "Contract";
  inqueryValue: string;
  dateType: "Arrival" | "Departure";
  searchingPeriod: number;
  cycleType: "Daily" | "Weekly" | "Monthly";
  cycleValue: string;
};

function createDummyReportSubscriptionData() {
  const inqueryType = faker.helpers.arrayElement(["Customer", "Contract"]);
  const cycleType = faker.helpers.arrayElement(["Daily", "Weekly", "Monthly"]);

  return {
    origin: faker.location.city() + ", " + faker.location.country(),
    destination: faker.location.city() + ", " + faker.location.country(),
    inqueryType: inqueryType,
    inqueryValue:
      inqueryType === "Customer"
        ? faker.helpers
            .arrayElements(["Shipper", "Consignee", "Forwarder", "Notify"])
            .join(", ")
        : faker.string.alphanumeric(10).toUpperCase(),
    dateType: faker.helpers.arrayElement(["Arrival", "Departure"]),
    searchingPeriod: faker.number.int({ max: 8 }),
    cycleType: cycleType,
    cycleValue:
      cycleType === "Daily"
        ? ""
        : cycleType === "Weekly"
        ? faker.helpers.arrayElement([
            "SUN",
            "MON",
            "TUE",
            "WED",
            "THU",
            "FRI",
            "SAT",
          ])
        : faker.helpers.arrayElement(
            Array.from({ length: 31 }, (_, i) => i + 1)
          ),
  } as ReportSubscriptionProps;
}

export const ReportSubscription = () => {
  const reports = useMemo(
    () => Array.from({ length: 5 }, createDummyReportSubscriptionData),
    []
  );

  return (
    <div className="flex flex-col">
      <MdTypography variant="title" size="large" className="mt-2">
        Report
      </MdTypography>
      <MdTypography variant="body" size="medium" className="text-outline my-4">
        <InfoOutlined fontSize="small" className="mr-1" />
        This Service provides customers with customized report without entering
        specific shipment number. 37 items related to your shipment are
        available and these can be edited by simple touch
      </MdTypography>
      <SubscriptionItemContainer name="Report">
        <div slot="content" className="p-6 flex flex-col">
          <MdTypography
            variant="body"
            size="medium"
            className="text-outline text-right"
          >
            <InfoOutlined fontSize="small" className="mr-1" />
            To enter multiple values, separated by a comma or space.
          </MdTypography>
        </div>
      </SubscriptionItemContainer>
    </div>
  );
};
