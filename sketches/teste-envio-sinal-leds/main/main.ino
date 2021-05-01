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

String getAllStates(Button buttons[]) {
  int states[arrayLength];
  String result = "";
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
  if(cmd == "GET_ALL") {
    Serial.println(getAllStates(buttons));
  }
}

void setup() {
  Serial.begin(9600);
}

void loop() {
  readAndUpdateButtonStates();
  if(Serial.available() > 0) {
    dispatch(Serial.readString());
  }
  Serial.flush();
}
