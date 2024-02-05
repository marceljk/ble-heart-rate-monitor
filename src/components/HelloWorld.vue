<template>
  <v-container>
    <v-card>
      <v-card-title> Heart Rate Monitor (bluetooth)</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <span class="text-h2">{{ currentHeartRate }}</span>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <span class="text-h5"> Puls </span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="test">Test request (Puls = 0)</v-btn>
        <v-btn @click="ledOff">LED off</v-btn>
        <v-btn v-if="!isConnected" @click="connectWithHRM">Connect</v-btn>
        <v-btn v-else-if="!isMeasureHRM" @click="startHRMMeasure">Start Measure</v-btn>
        <v-btn v-else @click="stopHRMMeasure">Stop Measure</v-btn>
      </v-card-actions>
    </v-card>
    <!-- <mock-data class="mt-4"></mock-data> -->
  </v-container>
</template>

<script setup>
//
import { ref } from "vue";
import {
  connect,
  startHeartRateMeasurement,
  stopHeartRateMeasurement,
} from "bluetooth-heart-rate";
import { throttle } from "lodash"

const currentHeartRate = ref(0);
const isConnected = ref(false);
const isMeasureHRM = ref(false);
const url = ref("puls/");

const connectWithHRM = () => {
  connect().then((res) => {
    if (res) isConnected.value = true;
  });
};

const lastRequestBPM = ref(0);

const startHRMMeasure = () => {
  isMeasureHRM.value = true;
  startHeartRateMeasurement((bpm) => {
    currentHeartRate.value = bpm;
    sendRequest(bpm);
  });
};

const sendRequest = throttle((bpm) => {
  if (lastRequestBPM.value !== bpm) {
    lastRequestBPM.value = bpm;

    const requestUrl = url.value + bpm;
    fetch(requestUrl);
    console.log("Send", bpm);
  } else {
    console.log("Not send", bpm);
  }
}, 2000);

const test = () => fetch(url.value + 0);
const ledOff = () => fetch(url.value + -1);

const stopHRMMeasure = () => {
  isMeasureHRM.value = false;
  stopHeartRateMeasurement();
};
</script>
