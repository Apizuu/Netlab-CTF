var a = 0;
var boX;
var sponge = [];
var charString = ""; // Variabel untuk menyimpan karakter dari semua kotak

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  boX = new Box(0, 0, 0, 300);
  sponge.push(boX);
}

function keyPressed() {
  if (key == " ") {
    console.log("--- New Operation ---"); // Menambah pemisah di log setiap operasi
    var nextGen = [];
    charString = ""; // Reset string karakter setiap kali tombol ditekan
    for (b1 of sponge) {
      var newBox;
      if (b1.length == undefined) {
        newBox = b1.chunk();
        nextGen.push(newBox);
      } else {
        if (sponge.length >= 21) {
          console.log("BAD REQUEST: Limit reached due to graphic performance"); // Log untuk permintaan yang gagal
          alert("It's limited due to graphic performance");
          return;
        }
        for (b1Child of b1) {
          newBox = b1Child.chunk();
          nextGen.push(newBox);
        }
      }
    }
    sponge = nextGen;
    console.log("Combined Characters: " + charString); // Menampilkan gabungan karakter
  }
}

function draw() {
  background(30);
  stroke(255);
  lights();
  orbitControl();
  rotateX(a);
  showBoxes();
  var scale = map(mouseX, 0, width, 0.0001, 0.02);
  a += scale;
}

function showBoxes() {
  for (b2 of sponge) {
    if (b2.length == undefined) b2.show();
    else {
      for (b2Child of b2) {
        b2Child.show();
      }
    }
  }
}

class Box {
  constructor(x, y, z, r, char) {
    this.pos = new p5.Vector(x, y, z);
    this.r = r;
    this.R = random(230, 255);
    this.G = random(230, 255);
    this.B = random(125, 200);
    this.char = char;
  }

  chunk = function () {
    var boxes = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          let sum = abs(i) + abs(j) + abs(k);
          var newR = this.r / 3;
          var newX = this.pos.x + i * newR;
          var newY = this.pos.y + j * newR;
          var newZ = this.pos.z + k * newR;
          var s = sum + newR + newX + newY + newZ;
          var asciiCode = ((abs(s) - 0x21) % (0x7E - 0x21 + 1)) + 0x21;
          asciiCode = asciiCode < 0x21 ? asciiCode + 0x21 : asciiCode;
          if (sum != 2) {
            var newB = new Box(
              newX,
              newY,
              newZ,
              newR,
              String.fromCharCode(asciiCode)
            );
            charString += newB.char; // Tambahkan karakter ke string
            boxes.push(newB);
          }
        }
      }
    }
    return boxes;
  };

  show = function () {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    fill(this.R, this.G, this.B);
    box(this.r);
    pop();
  };
}
