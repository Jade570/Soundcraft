const WORLD_SIZE = 500;
const GRID_SIZE = 30;
let firstcam, orthocam, thirdcam;
let firsttoggle, thirdtoggle;
let cam_x, cam_y, cam_z;
let t0;
let mov, theta;
let cam_cx, cam_cy, cam_cz;
let cam_dx, cam_dy, cam_dz;
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
  }
  render() {
    push();
    translate(this.x, this.y, (this.h + GRID_SIZE*3) / 2);
    strokeWeight(0.5);
    stroke(92, 6, 56);
    fill(255 - this.h, 255 - this.h, 255 - this.h);
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


function mousePressed() {
  t0 = millis();
}

function mouseReleased() {
  if (firsttoggle == false && thirdtoggle == false) {
    let w;
    let d;
    let h;
    if ((millis() - t0) / 5 <= 255) {
      h = (millis() - t0) / 5;
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
    console.log(h);
    bldg_i++;
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)

  // init camera
  cam_x = 0;
  cam_y = 100;
  cam_z = GRID_SIZE;
  cam_dx = 0;
  cam_dy = -1;
  cam_dz = 0;
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
  firstcam.camera(cam_x, cam_y, cam_z,cam_cx, cam_cy, cam_cz,0,0,-1);


  thirdcam = createCamera();
  thirdcam.camera(windowWidth/4, windowHeight/4, windowHeight/4, 0, -1, 0,0,0,-1);

  orthocam = createCamera();
  orthocam.setPosition(0, 0, windowHeight);
  orthocam.lookAt(0, 0, 0);
  orthocam.ortho();
}

function draw() {
  background(0);


  // light set-up
  ambientLight(150, 150, 150);
  directionalLight(153, 0, 255,   -1, 0, -1); // violet
  directionalLight(19, 0, 163,    0, -1, -1); // indigo
  directionalLight(255, 234, 0,   1, 0, -1); // yellow
  directionalLight(255, 0, 149,   0, 1, -1); //magenta
  directionalLight(0, 255, 251,   0,0,-1);


  firstcam.camera(cam_x, cam_y, cam_z,cam_cx, cam_cy, cam_cz,0,0,-1);


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

  push();
  specularMaterial(12, 0, 145);
  specularColor(0, 255, 242);
  fill(255, 0, 212);
  plane(WORLD_SIZE, WORLD_SIZE);
  pop();

  strokeWeight(0.5);
  stroke(92, 6, 56);
  for(i=0; i<WORLD_SIZE/GRID_SIZE; i++){
    line(-WORLD_SIZE/2+i*GRID_SIZE, -WORLD_SIZE/2,0.1,-WORLD_SIZE/2+i*GRID_SIZE, WORLD_SIZE/2,0.1);
    line(-WORLD_SIZE/2,-WORLD_SIZE/2+i*GRID_SIZE, 0.1,WORLD_SIZE/2,-WORLD_SIZE/2+i*GRID_SIZE,0.1);

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
    console.log("1");
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
      cam_x += s * (cam_dx);
      cam_y += s * (cam_dy);
  }
  if (back == true) {
    cam_x -= s * (cam_dx);
    cam_y -= s * (cam_dy);
  }
  if (left == true) {
    cam_x += s * (cam_dy);
    cam_y -= s * (cam_dx);
  }
  if (right == true) {
    cam_x -= s * (cam_dy);
    cam_y += s * (cam_dx);
  }

  if (jump_toggle == true) {
    t = (millis() - t0) / 3;
    cam_z = 30 + v * t + (1 / 2) * g * sq(t);

    if (cam_z <= 30) {
      cam_z = 30;
      jump_toggle = false;
    }
  }
  updateCamCenter();
}

function updateCamCenter() {
  cam_dx = cos(pan)*cos(tilt);
  cam_dy = sin(pan)*cos(tilt);
  cam_dz = sin(tilt);

  // compute scene center position

  cam_cx = cam_x + cam_dx;
  cam_cy = cam_y + cam_dy;
  cam_cz = cam_z + cam_dz;
}
