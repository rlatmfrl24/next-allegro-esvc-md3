import { DateTime } from "luxon";

export type ScheduleSubscriptionProps = {
  origin: string;
  destination: string;
  cycleType: "Daily" | "Weekly" | "Monthly";
  cycleValue: string;
  recipients: string[];
  useEmailService: boolean;
  lastSendingDate: DateTime;
};
