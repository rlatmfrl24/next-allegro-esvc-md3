import { Cell, Pie, PieChart } from "recharts";
import { MdTypography } from "../typography";

function getHexCodeFromToken(token: string) {
  return window
    .getComputedStyle(document.documentElement.querySelector("body") as Element)
    .getPropertyValue(token);
}

export default function QuickChart(props: {
  data: { key: string; value: number }[];
  palette?: { key: string; value: string }[];
}) {
  const totalCount = props.data.reduce((acc, cur) => {
    return acc + cur.value;
  }, 0);

  return (
    <div className="px-4 pb-6 flex flex-col font-pretendard">
      <div className="pt-3 pb-4 flex gap-2 items-center">
        <MdTypography variant="body" size="medium" className="text-outline">
          Total
        </MdTypography>
        <MdTypography variant="title" size="medium" className="text-secondary">
          {totalCount}
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-outline ">
          (Shipments in 7 days)
        </MdTypography>
      </div>
      <div className="flex justify-center gap-6 px-10 my-2">
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
              {props.data.map((entry, index) => {
                if (props.palette)
                  console.log(getHexCodeFromToken(props.palette[index].value));

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      props.palette
                        ? getHexCodeFromToken(props.palette[index].value)
                        : ""
                    }
                  />
                );
              })}
            </Pie>
          </PieChart>
        </div>
        <div aria-label="data" className="flex justify-center flex-1">
          <div className="flex flex-col justify-around h-full flex-1">
            {props.data.map((data, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-outline"
                >
                  <div
                    className="w-3 h-3 rounded"
                    style={{
                      backgroundColor: props.palette
                        ? getHexCodeFromToken(props.palette[index].value)
                        : "",
                    }}
                  ></div>
                  <MdTypography
                    variant="title"
                    size="small"
                    className="flex-1 underline"
                  >
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
