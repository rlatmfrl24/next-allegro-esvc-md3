import { Cell, Pie, PieChart } from "recharts";
import { MdTypography } from "../typography";

enum ChartColorEnum {
  BOOKED = "#4D616C",
  REJECTED = "#BA1A1A",
  PROCESSING = "#C0C7CD",
  CANCELLED = "#EAEEF2",
}

export default function QuickChart(props: {
  data: { key: string; value: number }[];
}) {
  const totalCount = props.data.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  return (
    <div className="px-4 pb-6 flex flex-col font-pretendard">
      <div className="pt-3 pb-4 flex gap-2 items-end">
        <MdTypography
          variant="headline"
          size="small"
          className="text-secondary"
        >
          {totalCount}
        </MdTypography>
        <MdTypography
          variant="label"
          size="large"
          className="text-outline mb-1"
        >
          Confirmed
        </MdTypography>
      </div>
      <div className="flex justify-center gap-6">
        <div aria-label="chart" className="justify-center flex">
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
        <div aria-label="data" className="flex justify-center ">
          <div className="flex flex-col justify-around h-full">
            {props.data.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-outline"
                >
                  <div
                    className="w-3 h-3 rounded"
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
                  <MdTypography variant="label" size="large" className="flex-1">
                    {data.key}
                  </MdTypography>
                  <MdTypography
                    variant="label"
                    size="large"
                    prominent
                    className="text-secondary ml-2"
                  >
                    {data.value}
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
