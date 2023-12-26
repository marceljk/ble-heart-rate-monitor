let intervalId = null;
let characteristicInstance = null;

export function connect() {
  return navigator.bluetooth.requestDevice({
    filters: [{
      services: ['heart_rate']
    }]
  })
    .then(device => {
      console.log('Device discovered', device.name);
      return device.gatt.connect();
    })
    .then(server => {
      console.log('Getting Heart Rate Service...');
      return server.getPrimaryService('heart_rate');
    })
    .then(service => {
      console.log('Getting Heart Rate Measurement Characteristic...');
      return service.getCharacteristic('heart_rate_measurement');
    })
    .then(characteristic => {
      characteristicInstance = characteristic;
      console.log('Connected to heart rate measurement characteristic.');
      return characteristicInstance;
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
}

export function startHeartRateMeasurement(callback, intervalInSeconds = undefined) {
  if (!characteristicInstance) {
    console.log('Please connect to a device first.');
    return;
  }

  const throttledCallback = intervalInSeconds ? throttle(callback, intervalInSeconds * 1000) : callback;

  characteristicInstance.startNotifications().then(_ => {
    characteristicInstance.addEventListener('characteristicvaluechanged',
      (event) => {
        const heartRate = handleHeartRateMeasurement(event);
        throttledCallback(heartRate);
      });
  });
}


export function stopHeartRateMeasurement() {
  if (characteristicInstance) {
    characteristicInstance.stopNotifications();
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    console.log('Stopped heart rate measurement.');
  }
}

function handleHeartRateMeasurement(event) {
  let sensorData = event.target.value;
  return parseHeartRate(sensorData);
}

function parseHeartRate(value) {
  let format = (value.getUint8(0) & 0x01) === 0 ? 'uint8' : 'uint16';
  let heartRate = value.getUint8(1);
  if (format === 'uint16') {
    heartRate = value.getUint16(1, /*littleEndian=*/true);
  }
  return heartRate;
}
