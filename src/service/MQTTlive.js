// src/mqttService.js
import { Client } from "paho-mqtt";

const MQTTlive = (topic, onMessage) => {
  // Create a client instance
  const client = new Client(
    "test.mosquitto.org",
    Number(8081),
    `clientId-${Math.random() * 1000}`
  );

  // Set callback handlers
  client.onConnectionLost = (responseObject) => {
    if (responseObject.errorCode !== 0) {
      console.log(`onConnectionLost: ${responseObject.errorMessage}`);
    }
  };

  client.onMessageArrived = (message) => {
    // console.log(`onMessageArrived: ${message.payloadString}`);
    // Call the onMessage callback with the received message
    onMessage(message.destinationName, message.payloadString);
  };

  // Connect the client
  client.connect({
    onSuccess: () => {
      console.log("Connected to MQTT broker");
      // Once a connection has been made, make a subscription
      client.subscribe(`${topic}/sensor`);
    },
    onFailure: (error) => {
      console.error(`Connection failed: ${error.errorMessage}`);
    },
    useSSL: true, // Use SSL for secure connection
  });

  return client;
};

export default MQTTlive;
