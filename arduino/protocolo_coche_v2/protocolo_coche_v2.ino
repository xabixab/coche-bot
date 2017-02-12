/*
  USAGE:
  Connect to arduino trought Serial @ 115200 bauds.
  <A Distance>.<B Distance>.<Time>;
*/

// X Motor in RAMPS
const int A_STEP = 54;
const int A_DIR = 55;
const int A_ENABLE = 38;
// Y Motor in RAMPS
const int B_STEP = 60;
const int B_DIR = 61;
const int B_ENABLE = 56;

const int STEPS = 100;
const int WAIT = 100;

void setup(){
  Serial.begin(115200);
  pinMode(A_STEP, OUTPUT);
  pinMode(A_DIR, OUTPUT);
  pinMode(A_ENABLE, OUTPUT);

  pinMode(B_STEP, OUTPUT);
  pinMode(B_DIR, OUTPUT);
  pinMode(B_ENABLE, OUTPUT);

  digitalWrite(A_ENABLE, HIGH);
  digitalWrite(B_ENABLE, HIGH);
}

void loop(){
  if(Serial.available() > 0){
    int distA = Serial.parseInt();
    int distB = Serial.parseInt();
    int time = Serial.parseInt();
    if (Serial.read() == ';') {
      
    }
  }
}

