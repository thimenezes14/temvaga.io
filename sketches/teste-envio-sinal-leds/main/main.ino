#include "Button.h"

#define BTN_0 2
#define BTN_1 3
#define LED_0 10
#define LED_1 11

Button buttons[2] = {
  Button(BTN_0, 0, 1, Led(LED_0, "Cor 1"), "Botão 1"), 
  Button(BTN_1, 0, 1, Led(LED_1, "Cor 2"), "Botão 2")
};

void handleChangeState(Button buttons[]) {
  for(int i = 0; i < 2; i++) {
    Button btn = buttons[i];
    if(btn.getLastState() != btn.getState()) {
      if(btn.getState() == 1) {
        btn.getLedControlled().toggle();
      }
    }
  }
}

String getAllStates(Button buttons[]) {
  int states[2];
  String result = "";
  for(int i = 0; i < 2; i++) {
    states[i] = buttons[i].getLedControlled().getState();
    result += states[i];
    if(i < 1) {
      result +=",";
    }
  }
  return result;
}

void readAndUpdateButtonStates() {
  buttons[0].setState(digitalRead(buttons[0].getPin()));
  buttons[1].setState(digitalRead(buttons[1].getPin()));
  handleChangeState(buttons);
  buttons[0].updateLastState();
  buttons[1].updateLastState();
  delay(50);
}

void getAndDispatchCommand(String cmd) {
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
    getAndDispatchCommand(Serial.readString());
  }
  Serial.flush();
}