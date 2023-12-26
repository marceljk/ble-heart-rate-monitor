import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/bluetooth-heart-rate.js",
        format: "umd",
        name: "BluetoothHeartRate",
      },
      {
        file: "dist/bluetooth-heart-rate.min.js",
        format: "umd",
        name: "BluetoothHeartRate",
        plugins: [terser()],
      },
    ],
  },
];
