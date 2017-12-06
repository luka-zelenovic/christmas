var imgElf;
var imgSanta;
var bg;
var santasings = true;
var x;
var elfsings = false;
var santa = 0;
var elf = -1;
var gift;

var snowflakes = [];
var ngiven = true;
function preload() {
	imgElf = loadImage('assets/elf.png');
	imgSanta = loadImage('assets/santa.png');
	bg = loadImage('assets/bg.png	');
	gift = loadImage('assets/gift.png	');
	
}

function setup() {
	frameRate = 1;
	// Create the canvas
	createCanvas(windowWidth, windowHeight);
	
	// Deal with microphone
	mic = new p5.AudioIn();
	mic.start();
}

function draw() {
	
	background(200);
	image(bg,0,0,windowWidth,windowHeight);
	stroke(255);
textAlign(CENTER);
	textSize(windowWidth/10);
	
	//get the volume
	var volume = mic.getLevel();
	push();
	translate(width / 2, height / 2);
	
	var position = map(volume, 0, 1, -windowWidth/2-windowWidth/3, windowWidth/2);
	var talking = map(volume, 0, 1, -windowWidth/20, windowWidth/10);
	if (santasings) {
		santaSings(position,talking);
	}
	if (elfsings) {
		elfSings (position,talking);
	}
	pop();
	if(santasings || elfsings) {
		
    var amount= map(volume,0,1,0,5);
    for(i=1; i <= amount; i++) {
      var obj = {
        x: random(0,1),
        y: random(0,-height/10),
        size: random(1, amount+2)
      }
     
      snowflakes.push(obj);
    }
  
  
  
  for(var i=0; i< snowflakes.length; i++) {
    var fallingSpeed = 1;
    
  
    snowflakes[i].y += fallingSpeed + snowflakes[i].y*0.006; 
    
    
    fill(235,235,188)
    noStroke();
    fill(255);
    ellipse(snowflakes[i].x*width, snowflakes[i].y, snowflakes[i].size);
  }
	}
	
	
	

}

//if the window is resized, update the sketchs
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function santaSings (position,talking) {
	this.position = position;
	this.talking = talking;
	image(imgSanta, position, 0,windowWidth/3,windowHeight/3);
	
	stroke(0);
	strokeWeight(4);
	line(position+windowWidth/3,0+windowHeight/6,position+windowWidth/3+talking*2,0+windowHeight/6);
	line(position+windowWidth/3,0+windowHeight/6 +windowHeight/20,position+windowWidth/3+talking*2,0+windowHeight/5);
	line(position+windowWidth/3,0+windowHeight/6 -windowHeight/20,position+windowWidth/3+talking*2,0+windowHeight/7);
	fill(255,0,0);
	 santa ++;
	text('Merry Christmas!', 0,0);
	if (ngiven) {
	var x = random(-windowWidth,windowWidth);
	var y= random(-windowHeight,windowHeight);
	image(gift,x,y,windowWidth/8,windowHeight/8);
		
	}
	if (santa > 360)
		{
			ngiven = false;
			santasings = false;
			elfsings = true;
			elf = 0;
			santa = -1;
			return;
		}
	
	
}

function elfSings (position,talking) {
	this.position = position;
	this.talking = talking;
	image(imgElf, -position-windowWidth/3, 0,windowWidth/3,windowHeight/3);
	stroke(0);
	strokeWeight(4);
	line(-position-windowWidth/3,0+windowHeight/6,-position-windowWidth/3 -talking*2,0+windowHeight/6);
	line(-position-windowWidth/3,0+windowHeight/6 +windowHeight/20,-position-windowWidth/3-talking*2,0+windowHeight/5);
	line(-position-windowWidth/3,0+windowHeight/6 -windowHeight/20,-position-windowWidth/3-talking*2,0+windowHeight/7);
	elf ++;
	fill(255);
	text('Merry Christmas!', 0,0);
	if (ngiven === false) {
	var x = random(-windowWidth,windowWidth);
	var y= random(-windowHeight,windowHeight);
	ellipse(x,y,windowWidth/8,windowHeight/8);
		
	}
	if (elf > 360)
		{
			ngiven = true;
			elfsings = false;
			santasings = true;
			santa = 0;
			elf = -1;
			return;
		}
	
	
}