const WORLD_SIZE = 500;
const GRID_SIZE = 30;
let firstcam, orthocam, thirdcam;
let firsttoggle, thirdtoggle;

let t0;
let mov, theta;
let cam_x1, cam_y1, cam_z1;
let cam_x3, cam_y3, cam_z3;
let cam_cx1, cam_cy1, cam_cz1;
let cam_cx3, cam_cy3, cam_cz3;
let cam_dx1, cam_dy1, cam_dz1;
let cam_dx3, cam_dy3, cam_dz3;
let magenta, indigo, yellow, violet;
let jump_toggle, highest;;
let pan,tilt;
let forward, back, left, right;
let Bldgs = [];
let bldg_i = 0;
class Building {
  constructor(x, y, w, d, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.d = d;
    this.h = h;

    if(this.h <= GRID_SIZE*2){
      Pd.send('melody', [74])
    }
    else if(this.h <= GRID_SIZE*8){
      Pd.send('melody', [77])
    }
    else{
      Pd.send('melody', [81])
    }


  }
  render() {
    push();
    translate(this.x, this.y, (this.h + GRID_SIZE*3) / 2);
    strokeWeight(0.5);
    stroke(92, 6, 56);
    fill(255,255,255);
    //specularMaterial(7, 6, 74);
    box(this.w, this.d, (this.h + GRID_SIZE*3));
    pop();

    for(let i = this.w*0.25; i< (this.h+GRID_SIZE*3)-this.w*0.25; i+=this.w*0.25){
      push();
        specularMaterial(255, 0, 149);
        fill(7, 6, 74);
        translate(this.x+this.w*0.25, this.y+this.d/2, i);
        box(this.w*0.35, 1, this.w*0.2);
      pop();
      push();
        specularMaterial(255, 0, 149);
        fill(7, 6, 74);
        translate(this.x+this.w*(-0.25), this.y+this.d/2, i);
        box(this.w*0.35, 1, this.w*0.2);
      pop();
    }

    for(let i = this.w*0.25; i< (this.h+GRID_SIZE*3)-this.w*0.25; i+=this.w*0.25){
      push();
        specularMaterial(255, 234, 0);
        fill(7, 6, 74);
        translate(this.x+this.w/2, this.y+this.d*(-0.25), i);
        box(1, this.d*0.35,this.w*0.2);
      pop();
      push();
        specularMaterial(255, 234, 0);
        fill(7, 6, 74);
        translate(this.x+this.w/2, this.y+this.d*(0.25), i);
        box(1, this.d*0.35,this.w*0.2);
      pop();
    }
    for(let i = this.w*0.25; i< (this.h+GRID_SIZE*3)-this.w*0.25; i+=this.w*0.25){
      push();
        specularMaterial(19, 0, 163);
        fill(7, 6, 74);
        translate(this.x+this.w*0.25, this.y-this.d/2, i);
        box(this.w*0.35, 1, this.w*0.2);
      pop();
      push();
        specularMaterial(19, 0, 163);
        fill(7, 6, 74);
        translate(this.x+this.w*(-0.25), this.y-this.d/2, i);
        box(this.w*0.35, 1, this.w*0.2);
      pop();
    }
    for(let i = this.w*0.25; i< (this.h+GRID_SIZE*3)-this.w*0.25; i+=this.w*0.25){
      push();
        specularMaterial(153, 0, 255);
        fill(7, 6, 74);
        translate(this.x-this.w/2, this.y+this.d*(-0.25), i);
        box(1, this.d*0.35,this.w*0.2);
      pop();
      push();
        specularMaterial(153, 0, 255);
        fill(7, 6, 74);
        translate(this.x-this.w/2, this.y+this.d*(0.25), i);
        box(1, this.d*0.35,this.w*0.2);
      pop();

    }


  }
}
let chordtoggle;


function mousePressed() {
  t0 = millis();
}

function mouseReleased() {
  if (firsttoggle == false && thirdtoggle == false) {
    let w;
    let d;
    let h;
    if ((millis() - t0) / 2 <= 255) {
      h = (millis() - t0) / 2;
      w = random(GRID_SIZE * 0.8, GRID_SIZE * 2) + (millis() - t0) / 64;
      d = random(GRID_SIZE * 0.8, GRID_SIZE * 2) + (millis() - t0) / 64;
    } else {
      h = 255;
      w = random(GRID_SIZE * 0.8, GRID_SIZE * 2) + 255 / 64;
      d = random(GRID_SIZE * 0.8, GRID_SIZE * 2) + 255 / 64;
    }
    let x = mouseX - windowWidth / 2;
    let y = mouseY - windowHeight / 2;
    Bldgs[bldg_i] = new Building(x, y, w, d, h);

    bldg_i++;
  }
}

function mouseDragged(){
  if(thirdtoggle){
      cam_dx3 += radians(movedX);
      cam_dz3 += radians(movedY);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)


  setInterval(function(){  Pd.send('d', [0]); chordtoggle = 0;}, 8000);
  setTimeout(function(){setInterval(function(){  Pd.send('d', [1]); chordtoggle = 1;}, 8000);}, 1000);
  setTimeout(function(){setInterval(function(){  Pd.send('d', [2]); chordtoggle = 2;}, 8000);}, 2000);
  setTimeout(function(){setInterval(function(){  Pd.send('d', [3]); chordtoggle = 3;}, 8000);}, 3000);
  setTimeout(function(){setInterval(function(){  Pd.send('d', [4]); chordtoggle = 0;}, 8000);}, 4000);
  setTimeout(function(){setInterval(function(){  Pd.send('d', [5]); chordtoggle = 1;}, 8000);}, 5000);
  setTimeout(function(){setInterval(function(){  Pd.send('d', [6]); chordtoggle = 2;}, 8000);}, 6000);
  setTimeout(function(){setInterval(function(){  Pd.send('d', [7]); chordtoggle = 3;}, 8000);}, 7000);



  // init camera
  cam_x1 = 0;
  cam_y1 = 100;
  cam_z1 = GRID_SIZE;
  cam_dx1 = 0;
  cam_dy1 = -1;
  cam_dz1 = 0;

  cam_x3 = windowWidth;
  cam_y3 = windowHeight/2;
  cam_z3 = windowHeight/4;
  cam_dx3 = 0;
  cam_dz3 = 1;

  tilt = 0;
  pan = 0;
  mov = 0;
  highest = false;
  firsttoggle = false;
  thirdtoggle = false;

  jump_toggle = false;
  forward = false;
  back = false;
  left = false;
  right = false;
  updateCamCenter();

  firstcam = createCamera();
  firstcam.camera(cam_x1, cam_y1, cam_z1,cam_cx1, cam_cy1, cam_cz1,0,0,-1);


  thirdcam = createCamera();
  thirdcam.camera(cam_x3*cos(cam_dx3), cam_x3*sin(cam_dx3), cam_z3*(cam_dz3), 0, -1, 0,0,0,-1);

  orthocam = createCamera();
  orthocam.setPosition(0, 0, windowHeight);
  orthocam.lookAt(0, 0, 0);
  orthocam.ortho();

  violet = color(80, 18, 110 , 200); // violet
  indigo = color(19, 0, 163, 200); // indigo
  yellow = color(255, 208, 0, 200); // yellow
  magenta = color(237, 0, 158, 200); //magenta




}

function draw() {
  background(0);


  // light set-up
  ambientLight(150, 150, 150);
  directionalLight(153, 0, 255,   -1, 0, -1); // violet
  directionalLight(19, 0, 163,    0, -1, -1); // indigo
  directionalLight(255, 234, 0,   1, 0, -1); // yellow
  directionalLight(255, 0, 149,   0, 1, -1); //magenta



  firstcam.camera(cam_x1, cam_y1, cam_z1,cam_cx1, cam_cy1, cam_cz1,0,0,-1);
  thirdcam.camera(cam_x3*cos(cam_dx3), cam_x3*sin(cam_dx3), cam_z3*(cam_dz3), 0, -1, 0,0,0,-1);

  if (firsttoggle == true) {
    setCamera(firstcam);

    pan += movedX/64;
    tilt -= movedY/128;
    updateCamCenter();

    handleUserInput();
  }
    else if (thirdtoggle == true) {
    setCamera(thirdcam);
  } else {
    setCamera(orthocam);
  }


  //world plane set-up
  noStroke();
    //specularMaterial(100,100,100);
  push();
  //specularMaterial(12, 0, 145,50);
  switch(chordtoggle){
    case 0:
    fill(indigo);

    break;

    case 1:
    fill(violet);
    break;

    case 2:
    fill(magenta);
    break;

    case 3:
    fill(yellow);
    break;
  }
  plane(WORLD_SIZE, WORLD_SIZE);
  pop();

  strokeWeight(0.5);

  switch(chordtoggle){
    case 0:
    stroke(255, 94, 223);

    break;

    case 1:
    stroke(255, 248, 110);
    break;

    case 2:
    stroke(69, 187, 255);
    break;

    case 3:
    stroke(212, 0, 255);
    break;
  }

  for(i=0; i<WORLD_SIZE/GRID_SIZE; i++){
    line(-WORLD_SIZE/2+i*GRID_SIZE, -WORLD_SIZE/2,0.1,-WORLD_SIZE/2+i*GRID_SIZE, WORLD_SIZE/2,0.1);
    line(-WORLD_SIZE/2,-WORLD_SIZE/2+i*GRID_SIZE, 0.1,WORLD_SIZE/2,-WORLD_SIZE/2+i*GRID_SIZE,0.1);

  }


  switch(chordtoggle){
    case 2:
    stroke(255, 94, 223);

    break;

    case 3:
    stroke(255, 248, 110);
    break;

    case 0:
    stroke(69, 187, 255);
    break;

    case 1:
    stroke(212, 0, 255);
    break;
  }
  //render buildings
  for (let i = 0; i < bldg_i; i++) {
    Bldgs[i].render();
  }

}


function keyPressed() {
  if (key == " ") {
    if (jump_toggle == false) {
      jump_toggle = true;
      t0 = millis();
    }
  }

  if (key == 'w') {
    forward = true;
  }
  if (key == 's') {
    back = true;
  }
  if (key == 'a') {
    left = true;
  }
  if (key == 'd') {
    right = true;
  }


  if (key == '1') {
    if (firsttoggle == false) {
      firsttoggle = true;
      thirdtoggle = false;
    } else {
      firsttoggle = false;
      thirdtoggle = false;
    }
  }
  if (key == '3') {
    if (thirdtoggle == false) {
      thirdtoggle = true;
      firsttoggle = false;
    } else {
      thirdtoggle = false;
      firsttoggle = false;
    }
  }
}

function keyReleased() {
  if (key == 'w') {
    forward = false;
  }
  if (key == 's') {
    back = false;
  }
  if (key == 'a') {
    left = false;
  }
  if (key == 'd') {
    right = false;
  }
}


function handleUserInput() {

  let s = 1; // moving speed
  let g = -0.01; //gravity
  let v = 1; //initial speed
  let t; //time passed

  if (forward == true) {
      cam_x1 += s * (cam_dx1);
      cam_y1 += s * (cam_dy1);
  }
  if (back == true) {
    cam_x1 -= s * (cam_dx1);
    cam_y1 -= s * (cam_dy1);
  }
  if (left == true) {
    cam_x1 += s * (cam_dy1);
    cam_y1 -= s * (cam_dx1);
  }
  if (right == true) {
    cam_x1 -= s * (cam_dy1);
    cam_y1 += s * (cam_dx1);
  }

  if (jump_toggle == true) {
    t = (millis() - t0) / 3;
    cam_z1 = 30 + v * t + (1 / 2) * g * sq(t);

    if (cam_z1 <= 30) {
      cam_z1 = 30;
      jump_toggle = false;
    }
  }
  updateCamCenter();
}

function updateCamCenter() {
  cam_dx1 = cos(pan)*cos(tilt);
  cam_dy1 = sin(pan)*cos(tilt);
  cam_dz1 = sin(tilt);

  // compute scene center position
  cam_cx1 = cam_x1 + cam_dx1;
  cam_cy1 = cam_y1 + cam_dy1;
  cam_cz1 = cam_z1 + cam_dz1;
}
