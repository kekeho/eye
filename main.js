// Copyright (c) 2021 Hiroki Takemura (kekeho)
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


const FPS = 30;
let EyeImages = {
    smile: null,
};

// 全てのeyestatusの終わりには、かならず目を開き、黒目を真ん中にもってくる(それで全てがつながる)
let EyeStatus = {
    OPEN: 0,
    SMILE: 1,
};

class EyeState {
    constructor(status) {
        this.status = status;
    }

    updateProgress(frame) {
        if (frame % (30*3) === 0) {
            this.status = getRandomInt(0, 2);
            console.log(this.status);
        }
    }
}


class Eye {
    constructor(centerX, centerY, size, state) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.size = size;
        this.eyeState = state;
    }

    draw(frame) {
        this.drawShirome(frame);
        this.drawKurome(frame);
    }

    drawShirome(frame) {
        fill(255);
        noStroke();
        ellipse(this.centerX, this.centerY, this.size / 1.3, this.size);
    }

    drawKurome(frame) {
        noStroke();
        fill(50);

        let kuromeX = this.centerX;
        let kuromeY = this.centerY + this.size / 5;

        if (this.eyeState.status == EyeStatus.OPEN) {
            // default
            ellipse(kuromeX, kuromeY, this.size / 5.5, this.size / 5.5);
        } else if (this.eyeState.status == EyeStatus.SMILE) {
            // smile
            let imageSize = this.size / 3;
            image(EyeImages.smile, kuromeX - imageSize/2, kuromeY - imageSize/2, imageSize, imageSize);
        }
    }
};



let size = Math.min(window.innerWidth, window.innerHeight) - 250
let state = new EyeState(EyeStatus.SMILE)
let leftEye = new Eye(window.innerWidth / 2 - size / 2 + 50, window.innerHeight / 2, size, state);
let rightEye = new Eye(window.innerWidth / 2 + size / 2 - 50, window.innerHeight / 2, size, state);


function preload() {
    EyeImages.smile = loadImage('img/smile.svg');
}


function setup() {
    frameRate(FPS);
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('app');
    background(240);
}


frame = 0;
function draw() {
    background(240);

    leftEye.draw(frame);
    rightEye.draw(frame);


    state.updateProgress(frame);
    frame = frame + 1;
}
