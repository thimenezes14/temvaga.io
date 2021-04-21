void setup() {
  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, LOW);
  delay(2500);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(2500);
}