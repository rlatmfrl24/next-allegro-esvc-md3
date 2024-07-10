import { MdTypography } from "@/app/components/typography";
import { MdDialog, MdFilledButton, MdTextButton } from "@/app/util/md3";
import { BookingStatusTableProps } from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";
import { ArrowForward } from "@mui/icons-material";
import { DateTime } from "luxon";

export default function VesselStatusNotesDialog({
  open,
  handleOpen,
  bookingData,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
  bookingData: BookingStatusTableProps;
}) {
  const tempCompanyName = faker.company.name();
  const originDate =
    bookingData.estimatedTimeofDeparture.status === "delayed"
      ? faker.date.past()
      : faker.date.future();
  const diffDays = Math.abs(
    Math.round(
      DateTime.fromJSDate(originDate).diff(
        bookingData.estimatedTimeofDeparture.date,
        "days"
      ).days
    )
  );

  const prefixTextForEarly = () => (
    <div>
      Dear Valued Customer,
      <br />
      <span>
        {`We are pleased to announce that the subject vessel will depart
        ${diffDays} days ahead from the date which was
        notified previously.`}
      </span>
    </div>
  );

  const prefixTextForDelay = () => (
    <div>
      Dear Valued Customer,
      <br />
      <span>
        {`We regret to announce that the subject vessel will depart
        ${diffDays} days behind the expected date.`}
      </span>
    </div>
  );

  return (
    <MdDialog
      open={open}
      closed={() => {
        handleOpen(false);
      }}
      className="h-[760px] min-h-[760px] w-[720px] min-w-[720px]"
    >
      <div slot="headline">Vessel Status Notes</div>
      <div slot="content">
        <div className="grid grid-cols-[104px_1fr] gap-2">
          <div className="flex items-center">
            <MdTypography variant="body" size="medium" className="text-outline">
              Updated Date
            </MdTypography>
          </div>
          <div>
            <MdTypography
              variant="body"
              size="large"
              className="text-onSurface"
            >
              {DateTime.fromJSDate(faker.date.recent()).toFormat(
                "yyyy-LL-dd HH:mm"
              )}
            </MdTypography>
          </div>
          <div className="flex items-center">
            <MdTypography variant="body" size="medium" className="text-outline">
              To
            </MdTypography>
          </div>
          <div>
            <MdTypography
              variant="body"
              size="large"
              className="text-onSurface"
            >
              {`${tempCompanyName} Customers`}
            </MdTypography>
          </div>
          <div className="flex items-center">
            <MdTypography variant="body" size="medium" className="text-outline">
              Subject
            </MdTypography>
          </div>
          <div>
            <MdTypography
              variant="body"
              size="large"
              className="text-onSurface"
            >
              {`Vessel ${
                bookingData.estimatedTimeofDeparture.status === "delayed"
                  ? "Delay"
                  : "Advance"
              } Notice`}
            </MdTypography>
          </div>
          <div className="flex items-center">
            <MdTypography variant="body" size="medium" className="text-outline">
              Booking No.
            </MdTypography>
          </div>
          <div>
            <MdTypography
              variant="body"
              size="large"
              className="text-onSurface"
            >
              {bookingData.bookingNo}
            </MdTypography>
          </div>
        </div>
        <div className="w-full border-b border-dashed border-b-outlineVariant my-6"></div>
        <MdTypography variant="body" size="large">
          {bookingData.estimatedTimeofDeparture.status === "delayed"
            ? prefixTextForDelay()
            : prefixTextForEarly()}
        </MdTypography>
        <div className="my-6 p-6 border border-outlineVariant rounded-2xl">
          <div className="grid grid-cols-[80px_1fr] gap-2">
            <MdTypography
              variant="body"
              size="large"
              className="text-outline h-8 flex items-center"
            >
              Terminal
            </MdTypography>
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="h-8 flex items-center"
            >
              {faker.location.city().toUpperCase() + ` TERMINAL`}
            </MdTypography>
            <MdTypography
              variant="body"
              size="large"
              className="text-outline h-8 flex items-center"
            >
              ETD
            </MdTypography>
            <div className="flex items-center">
              <MdTypography variant="body" size="large" prominent>
                {DateTime.fromJSDate(originDate).toFormat("yyyy-LL-dd HH:mm")}
              </MdTypography>
              <ArrowForward className="mx-4" sx={{ fontSize: "16px" }} />
              <div
                className={`h-8 flex items-center px-4 rounded-lg ${
                  bookingData.estimatedTimeofDeparture.status === "delayed"
                    ? "bg-errorContainer text-error"
                    : "bg-primaryContainer text-primary"
                }`}
              >
                <MdTypography variant="label" size="large">
                  {bookingData.estimatedTimeofDeparture.date.toFormat(
                    "yyyy-LL-dd HH:mm"
                  )}
                </MdTypography>
              </div>
            </div>
            <MdTypography
              variant="body"
              size="large"
              className="text-outline h-8 flex items-center"
            >
              ETA
            </MdTypography>
            <div className="flex items-center">
              <MdTypography variant="body" size="large" prominent>
                {DateTime.fromJSDate(originDate)
                  .plus({
                    days: diffDays,
                  })
                  .toFormat("yyyy-LL-dd HH:mm")}
              </MdTypography>
              <ArrowForward className="mx-4" sx={{ fontSize: "16px" }} />
              <div
                className={`h-8 flex items-center px-4 rounded-lg ${
                  bookingData.estimatedTimeofDeparture.status === "delayed"
                    ? "bg-errorContainer text-error"
                    : "bg-primaryContainer text-primary"
                }`}
              >
                <MdTypography variant="label" size="large">
                  {bookingData.estimatedTimeofDeparture.date
                    .plus({
                      days: diffDays,
                    })
                    .toFormat("yyyy-LL-dd HH:mm")}
                </MdTypography>
              </div>
            </div>
          </div>
        </div>
        <MdTypography variant="body" size="large">
          We appreciate your deep understanding concerning the irregularity of
          schedule. We will do our best to make it on-schedule.
        </MdTypography>
        <MdTypography variant="body" size="large" className="mt-4">
          Sincerely yours,
          <br /> {tempCompanyName} Co., Ltd
        </MdTypography>
      </div>
      <div slot="actions">
        <MdTextButton
          onClick={(e) => {
            const DialogElement = e.currentTarget.parentElement?.parentElement;
            (DialogElement as any).close();
          }}
        >
          Close
        </MdTextButton>
        <MdFilledButton>Print</MdFilledButton>
      </div>
    </MdDialog>
  );
}
