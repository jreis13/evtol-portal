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
import {
  Bar,
  Bubble,
  Doughnut,
  Line,
  PolarArea,
  Radar,
  Scatter,
} from "react-chartjs-2"

import annotationPlugin from "chartjs-plugin-annotation"

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

  const combinedData = xData.map((x, i) => {
    const [company] = labels[i].split(" - ")
    return {
      x,
      y: yData ? yData[i] : null,
      label: labels[i],
      company,
      color: companyColors[company],
      r: Math.random() * 15 + 5,
    }
  })

  const scatterData = {
    labels,
    datasets: [
      {
        label: yLabel ? `${xLabel} vs ${yLabel}` : `${xLabel}`,
        data: combinedData,
        backgroundColor: combinedData.map((p) => p.color),
        pointRadius: 10,
        pointHoverRadius: 12,
      },
    ],
  }

  const bubbleData = {
    labels,
    datasets: [
      {
        label: yLabel ? `${xLabel} vs ${yLabel}` : `${xLabel}`,
        data: combinedData.map((p) => ({ x: p.x, y: p.y, r: p.r })),
        backgroundColor: combinedData.map((p) => p.color),
      },
    ],
  }

  const generalData = useMemo(() => {
    const base =
      yData && yData.length
        ? [
            {
              label: xLabel,
              data: xData,
              borderRadius: graphType === "Bar" ? 10 : undefined,
              backgroundColor: Object.values(companyColors),
            },
            {
              label: yLabel,
              data: yData,
              borderRadius: graphType === "Bar" ? 10 : undefined,
              backgroundColor: Object.values(companyColors),
            },
          ]
        : [
            {
              label: xLabel,
              data: xData,
              borderRadius: graphType === "Bar" ? 10 : undefined,
              backgroundColor: Object.values(companyColors),
            },
          ]

    if (graphType === "Bar" || graphType === "Line") {
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
  }, [labels, xData, yData, xLabel, yLabel, graphType, companyColors])

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
            return `${ctx.dataset.label}: ${ctx.raw}`
          },
        },
      },
      annotation: {
        annotations: {
          avgLine: {
            display: graphType === "Bar" || graphType === "Line",
            type: "line",
            yMin: avgPrimary,
            yMax: avgPrimary,
            borderColor: "#403f4c",
            borderWidth: 1,
            borderDash: [5, 5],
            clip: false,
            label: {
              display: graphType === "Bar" || graphType === "Line",
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
            display:
              (graphType === "Line" && avgY) || (graphType === "Bar" && avgY),

            type: "line",
            yMin: avgY,
            yMax: avgY,
            borderColor: "#403f4c",
            borderWidth: 1,
            borderDash: [5, 5],
            clip: false,
            label: {
              display: graphType === "Line" || graphType === "Bar",
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

  const areaGraphStyle = {
    width: "100%",
    maxWidth: "800px",
    height: "auto",
    margin: "0 auto",
  }

  let ChartElement
  const opts =
    graphType === "Radar" ||
    (graphType === "Doughnut") | (graphType === "Polar Area")
      ? { ...chartOptions, scales: {} }
      : chartOptions

  switch (graphType) {
    case "Scatter":
      ChartElement = <Scatter data={scatterData} options={chartOptions} />
      break
    case "Bubble":
      ChartElement = <Bubble data={bubbleData} options={chartOptions} />
      break
    case "Bar":
      ChartElement = <Bar data={generalData} options={chartOptions} />
      break
    case "Line":
      ChartElement = <Line data={generalData} options={chartOptions} />
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
