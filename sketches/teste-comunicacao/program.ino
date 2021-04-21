#include <ArduinoJson.h>

DynamicJsonDocument mainResponse(2048);

void setup() {
  Serial.begin(9600);
  Serial.println("");
  pinMode(LED_BUILTIN, OUTPUT);

  mainResponse["name"] = "ESP_MAIN";
  mainResponse["qtdSensors"] = 2;
  JsonArray sensors = mainResponse.createNestedArray("sensors");
  
  int qtdESPs = 3;
  int qtdSensores = 3;
  
  for(int i = 1; i <= qtdESPs; i++) {
    DynamicJsonDocument sensorReceived(1024);
    JsonObject sensor = sensorReceived.to<JsonObject>();
    sensor["id"] = "ESP_" + i;
    JsonArray sensorData = sensor.createNestedArray("values");
    for(int j = 1; j <= qtdSensores; j++) {
      int randomValue = rand() % 2;
      sensorData.add(randomValue);
    }
    sensors.add(sensorReceived);
  }

  serializeJson(mainResponse, Serial);
}

void loop() {
  digitalWrite(LED_BUILTIN, LOW);
  delay(2500);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(2500);
}

//"c:\\users\\thiago menezes\\documents\\arduino\\libraries"

/*
{
  name: "ESP_MAIN",
  qtdSensors: 2,
  sensors: [
    {
      name: "ESP_01",
      states: [0,1,0,1,1,0,0,1,1,0,1,0]
    },
    {
      name: "ESP_02",
      states: [1,0,1,0,1,0,1,0,1,0,1,0]
    },
  ]
}

*/