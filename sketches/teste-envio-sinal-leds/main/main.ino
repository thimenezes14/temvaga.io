#include "Button.h"

#define BTN_0 2
#define BTN_1 3
#define LED_0 10
#define LED_1 11

Button buttons[2] = {
  Button(BTN_0, 0, 1, Led(LED_0, "Cor 1"), "Botão 1"), 
  Button(BTN_1, 0, 1, Led(LED_1, "Cor 2"), "Botão 2")
};

int arrayLength = *(&buttons + 1) - buttons;

String espConnected[] = {"ESP01", "ESP02", "ESP03", "ESP04", "ESP05", "ESP06", "ESP07", "ESP08", "ESP09", "ESP10", "ESP11", "ESP12"}; //Simula ESPs encontradas
int espConnectedArrayLength = *(&espConnected + 1) - espConnected;

void handleChangeState(Button buttons[]) {
  for(int i = 0; i < arrayLength; i++) {
    Button btn = buttons[i];
    if(btn.getLastState() != btn.getState()) {
      if(btn.getState() == 1) {
        btn.getLedControlled().toggle();
        Serial.println(getAllStates(buttons));
      }
    }
  }
}

String getAllDevices() { //Simula quantidade de devices conectados
  String result = "ALL@";
  for(int i = 0; i < espConnectedArrayLength; i++) {
    result += espConnected[i];
    if(i < 1 || i < espConnectedArrayLength - 1) {
      result +=",";
    }
  }
  return result;
}

String getAllStates(Button buttons[]) {
  int states[2];
  String result = espConnected[0] + "@";
  for(int i = 0; i < arrayLength; i++) {
    states[i] = buttons[i].getLedControlled().getState();
    result += states[i];
    if(i < 1) {
      result +=",";
    }
  }
  return result;
}

void readAndUpdateButtonStates() {
  for(int i = 0; i < arrayLength; i++) {
    buttons[i].setState(digitalRead(buttons[i].getPin()));
  }
  handleChangeState(buttons);
  for(int i = 0; i < arrayLength; i++) {
    buttons[i].updateLastState();
  }
  delay(50);
}

void dispatch(String cmd) {
  Serial.println(cmd);
  if(cmd == "ALL") {
    Serial.println(getAllDevices());
  }
  if(cmd == "ESP01") {
    Serial.println(getAllStates(buttons));
  } else {
    for(int i = 1; i < espConnectedArrayLength; i++) {
      if(cmd == espConnected[i]) {
        Serial.println(espConnected[i] + "@1,1");
      }
    }
  }
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  readAndUpdateButtonStates();
  if(Serial.available() > 0) {
    dispatch(Serial.readString());
  }
  Serial.flush();
}