const WORLD_SIZE = 2000;
const GRID_SIZE = 10;
let cam_x, cam_y, cam_z;
let t0;
let mov, theta;
let cam_cx, cam_cy, cam_cz;
let cam_dx, cam_dy, cam_dz;
let jump_toggle, highest;;
let tilt;
let forward, back, left, right;

function mouseClicked(){
  //console.log("mouseX: "+mouseX+" mouseY: "+mouseY);
  console.log("cam_dx: "+cam_dx+" cam_dy: "+cam_dy+" cam_dz: "+cam_dz);
}



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // init camera

  cam_x = -windowWidth / 4;
  cam_y = 0;
  cam_z = 30;
  cam_dx = 1;
  cam_dy = 0;
  cam_dz = -0.040992448759439054;
  tilt = 0;
  theta = 0;
  mov=0;
  highest = false;

  jump_toggle=false;
  forward=false;
  back=false;
  left=false;
  right=false;
 requestPointerLock();
  updateCamCenter();

}

function draw() {
  background(0);


  // light set-up
  ambientLight(150,150,150);
  directionalLight(153, 0, 255, 1, -1, 0); // side light
  directionalLight(255, 0, 212, 0, 1, 0); // side light
  directionalLight(19, 0, 163, 0, 0, -1); // top light


  // camera set-up
  camera(cam_x, cam_y, cam_z, cam_cx, cam_cy, cam_cz, 0, 0, -1);
  perspective(radians(60), width / height, 1, 10000);

  noStroke();
  fill(100, 100, 100);
  plane(500, 500);
  box();


  mov += movedX/64;
  theta = mov%TWO_PI;

  cam_dz = -((movedY - windowHeight/2) / (windowHeight/4)) ;

  cam_dz = -((mouseY - windowHeight/2) / (windowHeight/4)) ;
  updateCamCenter();


handleUserInput();
}


function keyPressed() {
  if (key == " ") {
    if(jump_toggle == false){
      jump_toggle = true;
    t0 = millis();
    }
  }

  if (key == 'w'){
    forward = true;
  }
  if (key == 's'){
    back = true;
  }
  if(key == 'a'){
    left= true;
  }
  if(key == 'd'){
    right = true;
  }
}

function keyReleased(){
    if (key == 'w'){
      forward = false;
    }
    if (key == 's'){
      back = false;
    }
    if(key == 'a'){
      left= false;
    }
    if(key == 'd'){
      right = false;
    }
}


function handleUserInput() {
  let s = 1; // moving speed
  let g = -0.01; //gravity
  let v = 1; //initial speed
  let t; //time passed

    if(forward==true){
      cam_x += s * (cam_dx);
      cam_y += s * (cam_dy);
    }
    if(back==true){
      cam_x -= s * (cam_dx);
      cam_y -= s * (cam_dy);
    }
    if(left==true){
      cam_y -= s * (cam_dx);
      cam_x += s * (cam_dy);
    }
    if(right==true){
      cam_y += s * (cam_dx);
      cam_x -= s * (cam_dy);
    }

    if (jump_toggle == true) {
      t = (millis() - t0) / 3;
      cam_z = 30+ v * t + (1 / 2) * g * sq(t);

      if (cam_z <= 30) {
        cam_z = 30;
        jump_toggle = false;
      }
    }
  updateCamCenter();
}

function updateCamCenter() {
  cam_dx = cos(theta);
  cam_dy = sin(theta);

  // compute scene center position
  cam_cx = cam_x + cam_dx;
  cam_cy = cam_y + cam_dy;
  cam_cz = cam_z + cam_dz;
}
