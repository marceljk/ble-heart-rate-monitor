<template>
  <v-card class="pa-4">
    <v-row>
      <v-col md="11">
        <v-text-field
          label="Websocket URL"
          v-model="websocketUrl"
        ></v-text-field>
      </v-col>
      <v-col md="1">
        <v-btn flat @click="connect">Connect</v-btn>
      </v-col>
      <v-col v-if="isConnected" md="11">
        <v-text-field label="Data" v-model="myMessage"></v-text-field>
      </v-col>
      <v-col v-if="isConnected" md="1">
        <v-btn flat @click="sendMessage">Send</v-btn>
      </v-col>
      <v-col md="12" v-if="isConnected">
        <v-list>
          <v-list-item> Messages: </v-list-item>
          <v-list-item v-for="(message, index) in messageList" :key="message + index">
            {{ message }}
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const websocketUrl = ref("");
const isConnected = ref(false);

const myMessage = ref("");
const messageList = ref([]);

let websocket;
const connect = () => {
  websocket = new WebSocket(websocketUrl.value);
  websocket.onopen = function (evt) {
    console.log("connected with", websocketUrl.value);
    isConnected.value = true;
  };
  websocket.onclose = function (evt) {
    console.log("WS closed");
  };
  websocket.onmessage = function (evt) {
    console.log("New Message:", evt);
    messageList.value.push(evt.data);
  };
  websocket.onerror = function (evt) {
    console.log("Error:", evt);
  };
};

const sendMessage = () => {
  websocket.send(myMessage.value);
  myMessage.value = "";
};
</script>
