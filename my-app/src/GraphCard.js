import Plot from "react-plotly.js";

export default function GraphCard() {
  const trace = {
    x: [4.2, 5.55, 6.91],
    y: [3.14, 2.84, 4.34],
    mode: "markers+lines",
    type: "scatter",
  };
  const data = [trace];
  return (
    <div>
      <Plot
        data={data}
        layout={{
          title: "Bisection Chart",
        }}
      />
    </div>
  );
}