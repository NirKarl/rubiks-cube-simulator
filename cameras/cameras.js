// let capture;

// function setup() {
//   createCanvas(390, 240);
//   capture = createCapture(VIDEO);
//   capture.size(320, 240);
//   capture.hide();
// }

// function draw() {
//   background(255);
//   image(capture, 0, 0, 320, 240);
//   // filter(INVERT);
// }

let video1;
let video2;
let video3;
let video4;
let constraints1;
let constraints2;
let constraints3;
let constraints4;

//call the list of cameras
function gotDevices(deviceInfos) {
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind == "videoinput") {
            console.log(deviceInfo);
        }
    }
}

function streamCameras() {
    for (var i = 0; i < 2; i++) {
        console.log(videolist[i]);
    }
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

function setup() {
    createCanvas(innerWidth, innerHeight);
    //copy the device info from console to create constraints for the webcams
    constraints1 = {
        video: {
            deviceId: "a8168235654f20bb47d591894506cfc36e18e7d47ad1f8bfecaaba6468fd2b4e",
            groupId: "417c8c6df0af7e2014c5bb9059597606e67b979b97e2c232d9c7f73f55aa2d8d",
            kind: "videoinput",
            label: "USB2.0 PC CAMERA (1908:2311)"

        }
    }
    constraints2 = {
        video: {
            deviceId: "5c8c8df7fdb7d12c2fbe798fd5ee24516f95fc63ab365d4c7408e0a512a07a4a",
            groupId: "4a124877adf76597309468ca4e8fb6a2957a94a20d9640f66b1d2ff5a91da2ab",
            kind: "videoinput",
            label: "USB2.0 PC CAMERA (1908:2311)"
        }
    }
    constraints3 = {
        video: {
            deviceId: "44796c4a186e62daaed8b89d426172f403b7865b9686e8a46ed50c6a6f8f282f",
            groupId: "1ecb664e8f843ec8f1bd5ae060b7b38aaa7b674c7c4c5a2f903dff93f9c665df",
            kind: "videoinput",
            label: "USB2.0 PC CAMERA (1908:2311)"
        }
    }
    constraints4 = {
        video: {
            deviceId: "f4b3bb8e316c24029b298f3d55037c8d343c5f9f0c57a74ee1817950b385b60f",
            groupId: "7abcca8959297e3b6fcbeb5908baaa1b64e8f4ceff07ee02665a703d999f973a",
            kind: "videoinput",
            label: "USB2.0 PC CAMERA (1908:2311)"
        }
    }

    video1 = createCapture(constraints1);
    video2 = createCapture(constraints2);
    video3 = createCapture(constraints3);
    video4 = createCapture(constraints4);
    video1.size(320,280);
    video2.size(320,280);
    video3.size(320,280);
    video4.size(320,280);
    video1.hide();
    video2.hide();
    video3.hide();
    video4.hide();
}

function draw() {
    background(255);
    image(video1, 0, 0);
    image(video2, video1.width, 0);
    image(video3, video1.width+video2.width, 0);
    image(video4, video1.width+video2.width+video3.width, 0);
}
