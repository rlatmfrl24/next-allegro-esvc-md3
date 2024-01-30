import { MdTypography } from "@/app/components/typography";
import { MdIcon } from "@/app/util/md3";
import {
  DashboardCardInfoType,
  DashboardInputCardDataType,
  DashboardStatisticCardDataType,
} from "@/app/util/typeDef";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { motion } from "framer-motion";
import QuickInquiry from "@/app/components/quick/inquiry";
import QuickChart from "@/app/components/quick/chart";
import QuickNotice from "@/app/components/quick/notice";
import QuickTracking from "@/app/components/quick/tracking";
import QuickAttachment from "@/app/components/quick/attachment";
import QuickSchedule from "@/app/components/quick/schedule";

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
      <QuickChart data={props.data} />
    </DashboardCard>
  );
}

export function DashboardCardPlaceholder() {
  return (
    <div
      className={`bg-surfaceContainerHighest h-64 rounded-md shadow flex items-center justify-center border-[3px] border-primaryContainer`}
    ></div>
  );
}

export function DashboardCard(props: {
  title: string;
  hasTooltip?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="border-primaryFixed border rounded-xl flex-1 bg-white select-none h-64 flex flex-col"
    >
      <div className="flex items-center text-primary bg-surfaceContainerLow h-16 min-h-[4rem] px-4 rounded-t-xl border-b border-primaryFixed">
        <MdTypography variant="title" size="medium" className="flex-1">
          {props.title}
        </MdTypography>
        {props.hasTooltip && (
          <MdIcon>
            <InfoOutlinedIcon />
          </MdIcon>
        )}
      </div>
      {props.children}
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
        title="BL Inquiry"
        buttonText="Inquiry"
        description="Enter a B/L number to inquiry the B/L status"
        placeholder="B/L Number"
      />
    );
  } else if (item.type === "statistic" || item.type === "chart") {
    return (
      <StatisticCard
        title={item.title}
        data={[
          { key: "Booked", value: 20 },
          { key: "Rejected", value: 10 },
          { key: "Processing", value: 30 },
          { key: "Cancelled", value: 5 },
        ]}
      />
    );
  } else {
    if (item.id === "notice") {
      return (
        <DashboardCard title={item.title} hasTooltip={true}>
          <div className="px-6 flex-1 flex flex-col justify-center">
            <QuickNotice />
          </div>
        </DashboardCard>
      );
    }

    if (item.id === "tracking") {
      return (
        <DashboardCard title={item.title} hasTooltip={true}>
          <div className="px-6 flex-1 flex flex-col justify-center">
            <QuickTracking rows={3} />
          </div>
        </DashboardCard>
      );
    }

    if (item.id === "attachment") {
      return (
        <DashboardCard title={item.title} hasTooltip={true}>
          <div className="px-6 flex-1 flex flex-col justify-center">
            <QuickAttachment />
          </div>
        </DashboardCard>
      );
    }

    if (item.id === "schedule") {
      return (
        <DashboardCard title={item.title} hasTooltip={true}>
          <div className="px-6 py-6 flex-1 flex flex-col overflow-y-scroll">
            <QuickSchedule />
          </div>
        </DashboardCard>
      );
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
