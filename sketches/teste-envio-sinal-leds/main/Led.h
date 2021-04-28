class Led {
  private:
    unsigned int pin;
    String color;
  
  public:
    Led() {}

    Led(unsigned int pin, String color) {
      this->pin = pin;
      this->color = color;
      pinMode(pin, OUTPUT);
    }

    unsigned int getPin() {
      return this->pin;
    }
    String getColor() {
      return this->color;
    }
    void on() {
      digitalWrite(this->pin, HIGH);
    }
    void off() {
      digitalWrite(this->pin, LOW);
    }
    void toggle() {
      digitalWrite(this->pin, !getState());
    }
    bool getState() {
      return digitalRead(this->pin);
    }
};