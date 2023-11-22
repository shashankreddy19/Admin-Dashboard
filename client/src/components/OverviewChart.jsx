import React, { useMemo } from 'react';
import { useTheme } from "@mui/material"
import { ResponsiveLine } from '@nivo/line'
import { useGetStatsQuery } from 'states/api'


const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    const { data, isLoading } = useGetStatsQuery();
    const [salesLine, unitsLine] = useMemo(() => {
        if (!data) return [];
        const salesLine = {
            id: "sales",
            color: theme.palette.main,
            data: [],
        };
        const unitsLine = {
            id: "units",
            color: theme.palette[600],
            data: [],
        };
        const { monthlyData } = data;
        // console.log(data);
        Object.values(monthlyData).reduce(
            (acc, { month, totalSales, totalUnits }) => {
            const tempSales = acc.sales + totalSales;
            const tempUnits = acc.units + totalUnits;
            salesLine.data = [
                ...salesLine.data,
                { x: month, y: tempSales }
            ];
            unitsLine.data = [
                ...unitsLine.data,
                { x: month, y: tempUnits }
            ];
            return { sales: tempSales, units: tempUnits };
        }, { sales: 0, units: 0 });
        return [[salesLine], [unitsLine]];
    }, [data]);
    if (!data || isLoading) return "Loading...";
    return (
        <ResponsiveLine
            data={view === "sales" ? salesLine : unitsLine}
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200],
                        },
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200],
                    },
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main,
                    },
                },
            }}
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard ? "" : "Month",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: isDashboard
                    ? ""
                    : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
                legendOffset: -60,
                legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
                !isDashboard
                    ? [
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 30,
                            translateY: -40,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemBackground: "rgba(0, 0, 0, .03)",
                                        itemOpacity: 1,
                                    },
                                },
                            ],
                        },
                    ]
                    : undefined
            }
        />
    );
};

export default OverviewChart
