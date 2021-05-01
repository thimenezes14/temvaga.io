#include "Led.h"

class Button {
  private:
    unsigned int pin;
    unsigned int debounce;
    bool state;
    bool lastState;
    Led ledControlled;
    String description;

  public:
    
    Button(unsigned int pin, bool state, bool lastState, Led ledControlled, String description) {
      this->pin = pin;
      this->state = state;
      this->lastState = lastState;
      this->ledControlled = ledControlled;
      this->description = description;
      pinMode(this->pin, INPUT_PULLUP);
    }

    unsigned int getPin() {
      return this->pin;
    }
    unsigned int getDebounce() {
      return this->debounce;
    }
    bool getState() {
      return this->state;
    }
    bool getLastState() {
      return this->lastState;
    }
    Led getLedControlled() {
      return this->ledControlled;
    }
    String getDescription() {
      return this->description;
    }

    void setLedControlled(Led ledControlled) {
      this->ledControlled = ledControlled;
    }
    void setState(bool state) {
      this->state = state;
    }
    void updateLastState() {
      this->lastState = this->state;
    }
};