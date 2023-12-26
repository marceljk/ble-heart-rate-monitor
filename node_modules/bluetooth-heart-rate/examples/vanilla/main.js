(()=> {
  document.querySelector('#connect').addEventListener('click', () => {
    BluetoothHeartRate.connect().then(() => {
      BluetoothHeartRate.startHeartRateMeasurement((heartRate) => {
        document.querySelector('#heart-rate').textContent = `Heart rate: ${heartRate}`;
      });
    });
  });

  document.querySelector('#stop').addEventListener('click', () => {
    BluetoothHeartRate.stopHeartRateMeasurement();
  });
})();
