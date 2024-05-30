let looping = true;
let keysActive = true;
let socket, cnvs, gl, shaderProgram, time, resolution;
let drawCount = 0, drawIncrement = 1;
let vertices, vbuffer, dotsVBuf;
let currentProgram;
let ratio;
const seed = 10;
const openSimplex = openSimplexNoise(seed);

function setup() {
    socket = io.connect('http://localhost:8080');
    pixelDensity(1);
    noCanvas();
        cnvs = createCanvas(windowWidth, windowWidth * 9 / 16, WEBGL);
    canvasDOM = document.getElementById('defaultCanvas0');
    // noCanvas();
    // cnvs = document.getElementById('my_Canvas');
    gl = canvas.getContext('webgl');
    cnvs.width = window.innerWidth;
    cnvs.height = window.innerHeight;
    // gl = cnvs.getContext('webgl', { preserveDrawingBuffer: true });
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    vbuffer = gl.createBuffer();
    frameRate(20);
    dotsVBuf = gl.createBuffer();
    shadersReadyToInitiate = true;
    initializeShaders();
    currentProgram = getProgram("smooth-dots");
    gl.useProgram(currentProgram);
    setTimeout(function() {
        scdConsoleArea.setAttribute("style", "display:block;");
        scdArea.style.display = "none";
        scdConsoleArea.setAttribute("style", "display:none;");
        jsCmArea.style.height = "685px";
        jsArea.style.display = "block";
        displayMode = "js";
        javaScriptEditor.cm.refresh();
    }, 1);
    ratio = window.innerHeight / window.innerWidth; 
    if (!looping) {
        noLoop();
    }
}

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawSpiral(currentProgram);
    // drawSimplexNoiseField(currentProgram);
    drawCount += drawIncrement;
}

drawSpiral = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    for (let i = 0; i < 27000; i += 1) {
        let x = Math.cos(i * t) * i * 5e-5;
        let y = Math.sin(i * t) * i * 5e-5;
        vertices.push(x * ratio, y, 15, 0.3);
    }
    /*======== Associating shaders to buffer objects ========*/
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    gl.drawArrays(gl.POINTS, 0, 27000);
}


drawSimplexNoiseField = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 0.5e-1;
    let dotAmount = 30000;
    dotAmount = Math.sqrt(dotAmount);
    for (let x = 0; x < dotAmount; x++) {
        for (let y = 0; y < (dotAmount * ratio); y++) {
           let n = (openSimplex.noise3D(x * 0.1, y * 0.1, t) + 1) * 0.5;
           vertices.push((x / dotAmount - 0.5) * 1.95, (y / dotAmount / ratio - 0.5) * 1.95, 50 * n, 0.3);
        }
    }
    /*======== Associating shaders to buffer objects ========*/
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "coordinates");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    gl.drawArrays(gl.POINTS, 0, vertices.length / 4);
}

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
    }
}