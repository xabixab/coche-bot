/*

A -> Enable A motor
B -> Enable B motor

C -> Disable A motor
D -> Disable B motor


E -> Move A Motor Dir 0
F -> Move B Motor Dir 0

G -> Move A Motor Dir 1
H -> Move B Motor Dir 1



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
  Serial.print('1');
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
  char data;
  if (Serial.available()) {
    // ENABLE A Motor
    data = Serial.read();
    if (data == 'A'){
      digitalWrite(A_ENABLE, LOW);
      Serial.println("A ENABLED");
    }

    // ENABLE B Motor

    if (data == 'B'){
      digitalWrite(B_ENABLE, LOW);
    }

    // DISABLE A Motor
    if (data == 'C'){
      digitalWrite(A_ENABLE, HIGH);
    }

    // ENABLE B Motor

    if (data == 'D'){
      digitalWrite(B_ENABLE, HIGH);
    }


    // STEP A MOTOR DIRECTION 0;
    if(data == 'E'){
      digitalWrite(A_DIR, LOW);
      for(int i = 0; i < STEPS; i++){
        digitalWrite(A_STEP, HIGH);
        delayMicroseconds(WAIT);
        digitalWrite(A_STEP, LOW);
        delayMicroseconds(WAIT);
      }
    }

    // STEP B MOTOR DIRECTION 0;
    if(data == 'F'){
      digitalWrite(B_DIR, LOW);
      for(int i = 0; i < STEPS; i++){
        digitalWrite(B_STEP, HIGH);
        delayMicroseconds(WAIT);
        digitalWrite(B_STEP, LOW);
        delayMicroseconds(WAIT);
      }
    }


    // STEP A MOTOR DIRECTION 1;
    if(data == 'G'){
      digitalWrite(A_DIR, HIGH);
      for(int i = 0; i < STEPS; i++){
        digitalWrite(A_STEP, HIGH);
        delayMicroseconds(WAIT);
        digitalWrite(A_STEP, LOW);
        delayMicroseconds(WAIT);
      }
    }

    // STEP B MOTOR DIRECTION 1;
    if(data == 'H'){
      digitalWrite(B_DIR, HIGH);
      for(int i = 0; i < STEPS; i++){
        digitalWrite(B_STEP, HIGH);
        delayMicroseconds(WAIT);
        digitalWrite(B_STEP, LOW);
        delayMicroseconds(WAIT);
      }
    }
  }
}



