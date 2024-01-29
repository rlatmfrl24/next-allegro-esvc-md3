import { MdTypography } from "@/app/components/typography";
import { MdFilledButton, MdIcon, MdOutlinedTextField } from "@/app/util/md3";
import {
  DashboardInputCardDataType,
  DashboardStatisticCardDataType,
} from "@/app/util/typeDef";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

enum ChartColorEnum {
  BOOKED = "#77777A",
  REJECTED = "#BA1A1A",
  PROCESSING = "#F7F2FA",
  CANCELLED = "#000000",
}

export function InputCard(props: DashboardInputCardDataType) {
  return (
    <DashboardCard title={props.title} hasTooltip={true}>
      <div className="px-6 pb-6 flex flex-col gap-4 ">
        <MdTypography variant="body" size="medium" className="mt-4">
          {props.description}
        </MdTypography>
        <MdOutlinedTextField className="flex-1" label={props.placeholder} />
        <MdFilledButton className="w-fit self-end">
          {props.buttonText}
        </MdFilledButton>
      </div>
    </DashboardCard>
  );
}

export function StatisticCard(props: DashboardStatisticCardDataType) {
  const totalCount = props.data.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  return (
    <DashboardCard title={props.title} hasTooltip={true}>
      <div className="px-6 pb-6 flex flex-col font-pretendard">
        <div className="py-5 flex gap-2 items-center">
          <span className="text-2xl font-bold text-primary">{totalCount}</span>
          <MdTypography variant="body" size="medium">
            Confirmed
          </MdTypography>
        </div>
        <div className="flex">
          <div aria-label="chart" className="flex-1 justify-center flex">
            <ResponsiveContainer width={100} height={100}>
              <PieChart>
                <Pie
                  data={props.data}
                  dataKey="value"
                  nameKey="key"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                  innerRadius={20}
                >
                  {props.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.key === "Booked"
                          ? ChartColorEnum.BOOKED
                          : entry.key === "Rejected"
                          ? ChartColorEnum.REJECTED
                          : entry.key === "Processing"
                          ? ChartColorEnum.PROCESSING
                          : entry.key === "Cancelled"
                          ? ChartColorEnum.CANCELLED
                          : ChartColorEnum.BOOKED
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div aria-label="data" className="flex justify-center pb-9 ">
            <div>
              {props.data.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-neutral-500"
                  >
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{
                        backgroundColor:
                          data.key === "Booked"
                            ? ChartColorEnum.BOOKED
                            : data.key === "Rejected"
                            ? ChartColorEnum.REJECTED
                            : data.key === "Processing"
                            ? ChartColorEnum.PROCESSING
                            : data.key === "Cancelled"
                            ? ChartColorEnum.CANCELLED
                            : ChartColorEnum.BOOKED,
                      }}
                    ></div>
                    <MdTypography variant="label" size="small">
                      {`${data.key} (${data.value})`}
                    </MdTypography>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}

export function DashboardCard(props: {
  title: string;
  hasTooltip?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-primaryFixed border rounded-xl flex-1 bg-white select-none">
      <div className="flex items-center text-primary bg-surfaceContainerLow h-16 px-4 rounded-xl border-b border-primaryFixed">
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
    </div>
  );
}
