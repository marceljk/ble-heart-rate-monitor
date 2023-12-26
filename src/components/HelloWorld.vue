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
            <span class="text-h5"> BPM </span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!isConnected" @click="connectWithHRM">Connect</v-btn>
        <v-btn v-else-if="!isMeasureHRM" @click="startHRMMeasure"
          >Start Measure</v-btn
        >
        <v-btn v-else @click="stopHRMMeasure">Stop Measure</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
//
import { ref } from "vue";
import { connect, startHeartRateMeasurement, stopHeartRateMeasurement } from "bluetooth-heart-rate";

const currentHeartRate = ref(0);
const isConnected = ref(false);
const isMeasureHRM = ref(false);
const hrmMeasureInterval = ref(null);

const connectWithHRM = () => {
  connect().then(() => {
    isConnected.value = true;
  })
}

const startHRMMeasure = () => {
  isMeasureHRM.value = true;
  hrmMeasureInterval.value = setInterval(() => {
    startHeartRateMeasurement((bpm) => {
      currentHeartRate.value = bpm;
    });
  }, 1000);
};

const stopHRMMeasure = () => {
  isMeasureHRM.value = false;
  clearInterval(hrmMeasureInterval.value);
}
</script>
