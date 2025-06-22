import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from "chart.js"

import annotationPlugin from "chartjs-plugin-annotation"

import { Bar, Doughnut, PolarArea, Radar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Tooltip,
  Title,
  LineElement,
  annotationPlugin
)

import { useMemo } from "react"

export default function ProductChart({
  labels,
  xData,
  yData,
  xLabel,
  yLabel,
  graphType,
}) {
  const generateColor = (index) => {
    const hue = (index * 137.5) % 360
    return `hsl(${hue}, 70%, 60%)`
  }

  const companies = [...new Set(labels.map((label) => label.split(" - ")[0]))]
  const companyColors = companies.reduce((acc, company, index) => {
    acc[company] = generateColor(index)
    return acc
  }, {})

  const avgX = useMemo(
    () => xData.reduce((sum, v) => sum + v, 0) / (xData.length || 1),
    [xData]
  )
  const avgY = useMemo(
    () =>
      yData && yData.length
        ? yData.reduce((sum, v) => sum + v, 0) / yData.length
        : null,
    [yData]
  )

  const xPlotData = xData
  const yPlotData = yData

  const generalData = useMemo(() => {
    const base =
      yData && yData.length
        ? [
            {
              label: xLabel,
              data: xPlotData,
              borderRadius: graphType === "Bar" ? 10 : undefined,
              backgroundColor: Object.values(companyColors),
            },
            {
              label: yLabel,
              data: yPlotData,
              borderRadius: graphType === "Bar" ? 10 : undefined,
              backgroundColor: Object.values(companyColors),
            },
          ]
        : [
            {
              label: xLabel,
              data: xPlotData,
              borderRadius: graphType === "Bar" ? 10 : undefined,
              backgroundColor: Object.values(companyColors),
            },
          ]

    if (graphType === "Bar") {
      const idx = base[0].data
        .map((v, i) => [v, i])
        .sort((a, b) => b[0] - a[0])
        .map(([, i]) => i)
      const lbs = idx.map((i) => labels[i])
      const dsets = base.map((ds) => ({
        ...ds,
        data: idx.map((i) => ds.data[i]),
        backgroundColor: Array.isArray(ds.backgroundColor)
          ? idx.map((i) => ds.backgroundColor[i])
          : ds.backgroundColor,
      }))
      return { labels: lbs, datasets: dsets }
    }

    return { labels, datasets: base }
  }, [
    labels,
    xPlotData,
    yPlotData,
    xLabel,
    yLabel,
    graphType,
    companyColors,
    yData,
  ])

  const avgPrimary = useMemo(() => {
    const vals = generalData.datasets[0].data
    return vals.reduce((sum, v) => sum + v, 0) / (vals.length || 1)
  }, [generalData])

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: yLabel ? `${xLabel} vs ${yLabel}` : `${xLabel}`,
      },
      tooltip: {
        callbacks: {
          title: (ctx) => ctx[0]?.raw?.label || labels[ctx[0].dataIndex],
          label: (ctx) => {
            if (graphType === "Scatter" || graphType === "Bubble") {
              const { x, y } = ctx.raw
              return yLabel
                ? `${xLabel}: ${x}, ${yLabel}: ${y}`
                : `${xLabel}: ${x}`
            }
            const val = ctx.raw
            const original =
              xLabel === ctx.dataset.label || yLabel === ctx.dataset.label
                ? graphType === "Radar"
                  ? graphType === "Radar" && ctx.datasetIndex === 1 && yData
                    ? yData[ctx.dataIndex]
                    : xData[ctx.dataIndex]
                  : val
                : val
            return `${ctx.dataset.label}: ${original}`
          },
        },
      },
      annotation: {
        annotations: {
          avgLine: {
            display: graphType === "Bar",
            type: "line",
            yMin: avgPrimary,
            yMax: avgPrimary,
            borderColor: "#403f4c",
            borderWidth: 1,
            borderDash: [5, 5],
            clip: false,
            label: {
              display: graphType === "Bar",
              content: `Avg ${xLabel}: ${avgPrimary.toFixed(0)}`,
              position: "end",
              backgroundColor: "rgba(0,0,0,0)",
              color: "#403f4c",
              font: { size: 12 },
              xAdjust: 6,
              yAdjust: -6,
            },
          },
          avgYLine: {
            display: graphType === "Bar" && avgY,
            type: "line",
            yMin: avgY,
            yMax: avgY,
            borderColor: "#403f4c",
            borderWidth: 1,
            borderDash: [5, 5],
            clip: false,
            label: {
              display: graphType === "Bar",
              content: `${avgY ? `Avg ${yLabel}: ${avgY?.toFixed(0)}` : ""}`,
              position: "end",
              backgroundColor: "rgba(0,0,0,0)",
              color: "#403f4c",
              font: { size: 12 },
              xAdjust: 6,
              yAdjust: -6,
            },
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: xLabel },
      },
      y: yLabel ? { title: { display: true, text: yLabel } } : undefined,
    },
  }

  const opts =
    graphType === "Radar"
      ? {
          ...chartOptions,
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                display: true,
                backdropColor: "transparent",
                color: "#666",
                font: {
                  size: 10,
                },
              },
              grid: {
                circular: true,
              },
              pointLabels: {
                display: true,
              },
            },
          },
        }
      : graphType === "Doughnut"
        ? { ...chartOptions, scales: {} }
        : graphType === "Polar Area"
          ? {
              ...chartOptions,
              scales: {
                r: {
                  beginAtZero: true,
                  ticks: {
                    display: true,
                    color: "#000",
                    backdropColor: "#e8e8e8",
                    font: {
                      size: 11,
                    },
                    z: 10,
                    clip: false,
                  },
                },
              },
            }
          : chartOptions

  const areaGraphStyle = {
    width: "100%",
    maxWidth: "800px",
    height: "auto",
    margin: "0 auto",
  }

  let ChartElement
  switch (graphType) {
    case "Bar":
      ChartElement = <Bar data={generalData} options={chartOptions} />
      break
    case "Doughnut":
      ChartElement = (
        <div style={areaGraphStyle}>
          <Doughnut data={generalData} options={opts} />
        </div>
      )
      break
    case "Polar Area":
      ChartElement = (
        <div style={areaGraphStyle}>
          <PolarArea data={generalData} options={opts} />
        </div>
      )
      break
    case "Radar":
      ChartElement = (
        <div style={areaGraphStyle}>
          <Radar data={generalData} options={opts} />
        </div>
      )
      break
    default:
      ChartElement = null
  }

  return (
    <div>
      <div className="mb-2 text-center text-sm font-medium">
        {`Average ${xLabel}: ${avgX.toFixed(0)}${
          yData?.length ? `, Average ${yLabel}: ${avgY.toFixed(0)}` : ""
        }`}
      </div>
      <div>{ChartElement}</div>
    </div>
  )
}
