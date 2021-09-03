import { ReactNode } from "react";
import "twin.macro";

interface StatisticProps {
  className?: string;
  title: string;
  value: number;
  locales?: string | string[];
  formatOptions?: Intl.NumberFormatOptions;
}

const Statistic = ({
  className,
  title,
  value,
  locales,
  formatOptions,
  ...rest
}: StatisticProps) => {
  const formatted = Intl.NumberFormat(locales, formatOptions).format(value);

  return (
    <div className={className} tw="flex flex-col text-center">
      <span tw="block text-sm text-gray-500">{title}</span>
      <span tw="mt-2 font-semibold text-lg">{formatted}</span>
    </div>
  );
};

export default Statistic;
