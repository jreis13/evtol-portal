import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function StatGauge({ value, max, textColor }) {
  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbar
        value={value}
        maxValue={max}
        text={`${value}`}
        styles={buildStyles({
          pathColor: "#d87103",
          textColor: textColor,
          trailColor: "#eee",
        })}
      />
    </div>
  )
}
