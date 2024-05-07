import { MdTypography } from "@/app/components/typography";
import { MdIcon, MdTextButton } from "@/app/util/md3";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { motion } from "framer-motion";
import QuickInquiry from "@/app/components/quick/inquiry";
import QuickChart from "@/app/components/quick/chart";
import QuickNotice from "@/app/components/quick/notice";
import QuickTracking from "@/app/components/quick/tracking";
import QuickAttachment from "@/app/components/quick/attachment";
import QuickSchedule from "@/app/components/quick/schedule";
import {
  DashboardInputCardDataType,
  DashboardStatisticCardDataType,
  DashboardCardInfoType,
} from "@/app/util/typeDef/generic";
import Link from "next/link";

export function InputCard(props: DashboardInputCardDataType) {
  return (
    <DashboardCard title={props.title} hasTooltip={true}>
      <QuickInquiry
        description={props.description}
        placeholder={props.placeholder}
        buttonText={props.buttonText}
      />
    </DashboardCard>
  );
}

export function StatisticCard(props: DashboardStatisticCardDataType) {
  return (
    <DashboardCard title={props.title} hasTooltip={true}>
      <QuickChart data={props.data} palette={props.palette} />
    </DashboardCard>
  );
}

export function DashboardCardPlaceholder({
  cardSize,
}: {
  cardSize?: 1 | 2 | 4;
}) {
  return (
    <div
      className={`bg-surfaceContainerHighest rounded-md shadow flex items-center justify-center border-2 border-secondaryContainer ${
        cardSize === 4 ? "h-[33rem]" : "h-[16rem]"
      }`}
    ></div>
  );
}

export function DashboardCard({
  title,
  hasTooltip,
  actionButton,
  children,
  cardSize = 1,
}: {
  title: string;
  hasTooltip?: boolean;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
  cardSize?: 1 | 2 | 4;
}) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className={`border-secondaryContainer border-2 rounded-xl flex-1 bg-white select-none flex flex-col ${
        cardSize === 4 ? "h-[33rem]" : "h-[16rem]"
      }`}
    >
      <div className="flex items-center text-secondary bg-surfaceContainerLow h-16 min-h-[4rem] px-4 rounded-t-xl border-b-2 border-secondaryContainer">
        <MdTypography variant="title" size="medium" className="flex-1">
          {title}
        </MdTypography>
        {hasTooltip && (
          <MdIcon>
            <InfoOutlinedIcon />
          </MdIcon>
        )}
        {actionButton && actionButton}
      </div>
      {children}
    </motion.div>
  );
}

//TODO: Temp function
export function DashboardCardConstructor({
  item,
}: {
  item: DashboardCardInfoType;
}) {
  if (item.type === "input") {
    return (
      <InputCard
        id={item.id}
        type="input"
        size={item.size}
        title={item.title}
        buttonText="Search"
        description="Enter a B/L number to inquiry the B/L status"
        placeholder="B/L Number"
      />
    );
  } else if (item.type === "chart") {
    const chartItem = item as DashboardStatisticCardDataType;
    return (
      <StatisticCard
        id={chartItem.id}
        type="chart"
        size={chartItem.size}
        title={chartItem.title}
        data={chartItem.data}
        palette={chartItem.palette}
      />
    );
  } else {
    if (item.id === "notice") {
      return (
        <DashboardCard
          title={item.title}
          cardSize={2}
          actionButton={
            <Link href="/main/import/notice">
              <MdTextButton>More</MdTextButton>
            </Link>
          }
        >
          <div className="px-4 gap-4 flex-1 flex flex-col justify-center">
            <QuickNotice />
          </div>
        </DashboardCard>
      );
    }

    if (item.id === "tracking") {
      return (
        <DashboardCard title={item.title} hasTooltip={true} cardSize={2}>
          <div className="px-4 flex-1 flex flex-col justify-center gap-4 py-4">
            <QuickTracking />
          </div>
        </DashboardCard>
      );
    }

    if (item.id === "attachment") {
      return (
        <DashboardCard title={item.title} hasTooltip={true} cardSize={2}>
          <div className="px-6 flex-1 flex flex-col justify-center">
            <QuickAttachment />
          </div>
        </DashboardCard>
      );
    }

    if (item.id === "schedule") {
      return (
        <DashboardCard title={item.title} hasTooltip={true} cardSize={4}>
          <div className="px-6 py-6 flex-1 flex flex-col ">
            <QuickSchedule />
          </div>
        </DashboardCard>
      );
    }

    if (item.id === "outstanding_tasks") {
      {
        return (
          <DashboardCard title={item.title} hasTooltip={true} cardSize={2}>
            <div className="px-4 pt-3 flex gap-2 items-center">
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline"
              >
                Total
              </MdTypography>
              <MdTypography
                variant="title"
                size="medium"
                className="text-secondary"
              >
                12
              </MdTypography>
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline "
              >
                (Shipments in 7 days)
              </MdTypography>
            </div>
            <div className="flex flex-1 items-center">
              <div className="flex-1 flex flex-col gap-2 items-center  border-r border-dotted border-outline">
                <MdTypography
                  variant="display"
                  size="medium"
                  className="text-secondary"
                >
                  5
                </MdTypography>
                <MdTypography
                  variant="label"
                  size="medium"
                  className="text-outline text-balance w-fit text-center"
                >
                  Submit Shipping
                  <br /> Instructions
                </MdTypography>
              </div>
              <div className="flex-1 flex flex-col gap-2 items-center ">
                <MdTypography
                  variant="display"
                  size="medium"
                  className="text-secondary"
                >
                  7
                </MdTypography>
                <MdTypography
                  variant="label"
                  size="medium"
                  className="text-outline text-balance w-fit text-center"
                >
                  Submit VGM
                  <br />
                  &nbsp;
                </MdTypography>
              </div>
            </div>
          </DashboardCard>
        );
      }
    }

    return (
      <DashboardCard title={item.title} hasTooltip={true}>
        <div className="px-6 pb-6 flex flex-col gap-4 ">
          <MdTypography variant="body" size="medium" className="mt-4">
            Sample Card
          </MdTypography>
        </div>
      </DashboardCard>
    );
  }
}
