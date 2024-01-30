import { Cell, Pie, PieChart } from "recharts";
import { MdTypography } from "../typography";

enum ChartColorEnum {
  BOOKED = "#77777A",
  REJECTED = "#BA1A1A",
  PROCESSING = "#F7F2FA",
  CANCELLED = "#000000",
}

export default function QuickChart(props: {
  data: { key: string; value: number }[];
}) {
  const totalCount = props.data.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  return (
    <div className="px-6 pb-6 flex flex-col font-pretendard">
      <div className="py-5 flex gap-2 items-center">
        <span className="text-2xl font-bold text-primary">{totalCount}</span>
        <MdTypography variant="body" size="medium">
          Confirmed
        </MdTypography>
      </div>
      <div className="flex">
        <div aria-label="chart" className="flex-1 justify-center flex">
          <PieChart width={100} height={100}>
            <Pie
              isAnimationActive={false}
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
  );
}
