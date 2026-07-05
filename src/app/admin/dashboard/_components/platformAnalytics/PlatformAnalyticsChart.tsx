"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useRef, useEffect } from "react";

interface AmountEntry {
    currency: string;
    price: number;
}

interface MonthData {
    month: string;
    amount: AmountEntry[];
}

interface AnalyticsData {
    type?: string;
    year?: number;
    data?: MonthData[];
}

interface PlatformAnalyticsChartProps {
    analytics?: AnalyticsData;
    className?: string;
    selectedYear: number;
    setSelectedYear: (year: number) => void;
}

// ─── Currency Dropdown ───────────────────────────────────────────────────────

interface CurrencyDropdownProps {
    currencies: string[];
    selected: string;
    onChange: (cur: string) => void;
}

const CurrencyDropdown = ({ currencies, selected, onChange }: CurrencyDropdownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen((p) => !p)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white text-sm hover:bg-white/22 transition-colors"
            >
                <span>{selected}</span>
                <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute top-[calc(100%+6px)] left-0 min-w-[110px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg overflow-hidden z-50">
                    {currencies.map((cur) => (
                        <button
                            key={cur}
                            onClick={() => { onChange(cur); setOpen(false); }}
                            className="flex items-center justify-between w-full px-3.5 py-2.5 text-sm text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                            <span className={cur === selected ? "text-main-color font-medium" : "text-neutral-800 dark:text-neutral-200"}>
                                {cur}
                            </span>
                            {cur === selected && (
                                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8l4 4 6-7" stroke="#FCB806" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Custom Tooltip ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, currency }: any) => {
    if (active && payload?.length) {
        const val = payload[0]?.value;
        const month = payload[0]?.payload?.month;
        const formatted =
            currency === "USD"
                ? `$${val?.toFixed(2) ?? "0.00"}`
                : `${val?.toLocaleString() ?? 0} ${currency}`;
        return (
            <div className="bg-white p-3 shadow-md rounded-md border border-gray-100">
                <p className="text-sm font-medium text-black">{formatted}</p>
                <p className="text-xs text-gray-500">{month}</p>
            </div>
        );
    }
    return null;
};

// ─── Main Chart Component ────────────────────────────────────────────────────

const PlatformAnalyticsChart = ({
    analytics,
    className,
    selectedYear,
    setSelectedYear,
}: PlatformAnalyticsChartProps) => {

   const currencies = useMemo(() => {
    return Array.from(
        new Set(
            (analytics?.data ?? []).flatMap((d) =>
                (d?.amount ?? []).map((a) => a?.currency).filter(Boolean)
            )
        )
    ) as string[];
}, [analytics?.data]);


    const [selectedCurrency, setSelectedCurrency] = useState<string>(
        currencies[0] ?? "BDT"
    );

    // sync if currencies load after mount
    useEffect(() => {
        if (currencies.length > 0 && !currencies.includes(selectedCurrency)) {
            setSelectedCurrency(currencies[0]);
        }
    }, [currencies]);

    const chartData = useMemo(() => {
        return (analytics?.data ?? []).map((d) => {
            const entry = (d?.amount ?? []).find((a) => a?.currency === selectedCurrency);
            return {
                month: d?.month ?? "",
                value: entry?.price ?? 0,
            };
        });
    }, [analytics?.data, selectedCurrency]);

    const startYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: 4 }, (_, i) => startYear + i);

    return (
        <Card className={`p-3 !bg-transparent border border-[#FFFFFF33]/[0.2] rounded-2xl ${className}`}>
            <CardHeader>
                <div className="flex justify-between items-center mb-5">
                    <CardTitle className="text-xl font-semibold text-text-color">
                        Platform Analytics
                    </CardTitle>

                    <div className="flex items-center gap-2">
                        {currencies.length > 0 && (
                            <CurrencyDropdown
                                currencies={currencies}
                                selected={selectedCurrency}
                                onChange={setSelectedCurrency}
                            />
                        )}

                        <Popover>
                            <PopoverTrigger className="rounded-full bg-white/20 text-white border-none" asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    {selectedYear} <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-24 p-0 bg-white/30 text-white border-none">
                                <div className="flex flex-col">
                                    {yearsArray.map((year) => (
                                        <Button
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            variant="ghost"
                                            className="justify-start"
                                        >
                                            {year}
                                        </Button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </CardHeader>

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="20%" stopColor="#A8640F" stopOpacity={0.9} />
                            <stop offset="80%" stopColor="#A28F59" stopOpacity={0.08} />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="month"
                        axisLine
                        tickLine
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(v) =>
                            selectedCurrency === "USD"
                                ? `$${v}`
                                : v >= 1000
                                ? `${(v / 1000).toFixed(1)}k`
                                : `${v}`
                        }
                    />
                    <Tooltip content={<CustomTooltip currency={selectedCurrency} />} />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#FCB806"
                        strokeWidth={1}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        activeDot={{ r: 6, fill: "#fff", stroke: "#FCB806", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default PlatformAnalyticsChart;