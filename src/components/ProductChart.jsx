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
  Scatter,
} from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Tooltip,
  Title,
  LineElement
)

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
        backgroundColor: combinedData.map((point) => point.color),
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
        data: combinedData.map((point) => ({
          x: point.x,
          y: point.y,
          r: point.r,
        })),
        backgroundColor: combinedData.map((point) => point.color),
      },
    ],
  }

  const generalData = {
    labels,
    datasets: [
      {
        label: yLabel ? `${xLabel} vs ${yLabel}` : `${xLabel}`,
        data: xData,
        backgroundColor: Object.values(companyColors),
        borderRadius: graphType === "Bar" ? 10 : undefined,
      },
    ],
  }

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
          title: (context) => {
            if (context[0]?.raw?.label) {
              return context[0].raw.label
            }
            const dataIndex = context[0].dataIndex
            return labels[dataIndex] || "Unknown"
          },
          label: (context) => {
            const dataIndex = context.dataIndex
            const datasetLabel = context.dataset.label || xLabel
            const value = context.raw

            if (graphType === "Scatter" || graphType === "Bubble") {
              const xValue = context.raw.x
              const yValue = context.raw.y
              const xText = `${xLabel}: ${xValue}`
              const yText = yLabel ? `${yLabel}: ${yValue}` : null
              return yText ? `${xText}, ${yText}` : xText
            }

            return `${datasetLabel}: ${value}`
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

  switch (graphType) {
    case "Scatter":
      return (
        <div>
          <Scatter data={scatterData} options={chartOptions} />
        </div>
      )
    case "Bubble":
      return (
        <div>
          <Bubble data={bubbleData} options={chartOptions} />
        </div>
      )
    case "Bar":
      return (
        <div>
          <Bar data={generalData} options={chartOptions} />
        </div>
      )
    case "Line":
      return (
        <div>
          <Line data={generalData} options={chartOptions} />
        </div>
      )
    case "Doughnut":
      return (
        <div style={areaGraphStyle}>
          <Doughnut data={generalData} />
        </div>
      )
    case "Polar Area":
      return (
        <div style={areaGraphStyle}>
          <PolarArea data={generalData} />
        </div>
      )
    default:
      return null
  }
}
