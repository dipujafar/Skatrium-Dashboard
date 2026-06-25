import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import CountUp from "react-countup";

type TEarningData = {
  currency: string;
  amount: number;
};
interface StatCardProps {
  title: string;
  value: string | number | TEarningData[];
  className?: string;
  icon?: ReactNode;
  prefix?: string;
  suffix?: string;
}

export function StatCard({
  title,
  value,
  className,
  icon,
  prefix,
  suffix,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 flex flex-col gap-1 text-white",
        className,
      )}
    >
      <h3 className="text-2xl  font-medium">{title}</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 text-[#7F8694]">
          {icon && icon}
          <div className="flex items-center gap-0.5">
            <span className="text-xl">{prefix}</span>
            {title !== "Total Earning" && (
              <p className="text-xl font-medium">
                <CountUp end={Number(value)} />
              </p>
            )}
            {title === "Total Earning" && (
              <div className="flex flex-wrap items-center gap-2.5">
                {(value as TEarningData[]).map((item: any, index: number) => (
                  <p key={index} className="text-lg font-medium flex gap-1">
                    <CountUp end={Number(item?.amount)} />
                    <div>
                      <span>{item?.currency}</span>
                      {index !== (value as TEarningData[]).length - 1 && (
                        <span>,</span>
                      )}
                    </div>
                  </p>
                ))}
              </div>
            )}
            <span className="text-xl">{suffix}</span>
          </div>
        </div>

        {/*<div
          className={cn(
            "flex items-center text-sm gap-x-2 font-medium",
            change.positive ? "text-emerald-400" : "text-rose-600"
          )}
        >
          <span>{change.value}</span>
          <GownIcon className={"text-emerald-400"} />
        </div>*/}
      </div>
    </div>
  );
}
