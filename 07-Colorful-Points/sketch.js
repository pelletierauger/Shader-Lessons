let looping = true;
let keysActive = true;
let socket, cnvs, gl, shaderProgram, time;
let drawCount = 0, drawIncrement = 1;
let positionBuffer, colorBuffer;
let positions, colors;
let currentProgram;
let ratio;
const seed = 10;
const openSimplex = openSimplexNoise(seed);
let resolution = 1;

function setup() {
    socket = io.connect('http://localhost:8080');
    pixelDensity(1);
    noCanvas();
    cnvs = document.getElementById('cnvs');
    cnvs.width = window.innerWidth * resolution;
    cnvs.height = window.innerHeight * resolution;
    gl = cnvs.getContext('webgl', { preserveDrawingBuffer: true });
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    frameRate(20);

    positionBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    // gl.bindBuffer(gl.ARRAY_BUFFER, null);

    colorBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    shadersReadyToInitiate = true;
    initializeShaders();

    currentProgram = getProgram("smooth-dots");
    gl.useProgram(currentProgram);

    var positionAttribLocation = gl.getAttribLocation(currentProgram, "position");
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttribLocation);


    setTimeout(function() {
        scdConsoleArea.setAttribute("style", "display:block;");
        scdArea.style.display = "none";
        scdConsoleArea.setAttribute("style", "display:none;");
        jsCmArea.style.height = "685px";
        jsArea.style.display = "block";
        displayMode = "js";
        javaScriptEditor.cm.refresh();
    }, 1);
    setTimeout( function() {
        // keysControl.style.cursor = 'none';
        keysControl.addEventListener("mouseenter", function(event) {
        document.body.style.cursor = "none";
        document.body.style.backgroundColor = "#000000";
        appControl.setAttribute("style", "display:none;");
        let tabs = document.querySelector("#file-tabs");
        tabs.setAttribute("style", "display:none;");
        // let slider = document.querySelector("#timeline-slider");
        // slider.setAttribute("style", "display:none;");
        // slider.style.display = "none";
        // canvasDOM.style.bottom = "0";
        cinemaMode = true;
        scdArea.style.display = "none";
        scdConsoleArea.style.display = "none";
        jsArea.style.display = "none";
        jsConsoleArea.style.display = "none";
    }, false);
    keysControl.addEventListener("mouseleave", function(event) {
            if (!grimoire) {
                document.body.style.cursor = "default";
                document.body.style.backgroundColor = "#1C1C1C";
                appControl.setAttribute("style", "display:block;");
                let tabs = document.querySelector("#file-tabs");
                tabs.setAttribute("style", "display:block;");
                // let slider = document.querySelector("#timeline-slider");
                // slider.setAttribute("style", "display:block;");
                // slider.style.display = "block";
                // canvasDOM.style.bottom = null;
                if (displayMode === "both") {
                    scdArea.style.display = "block";
                    scdConsoleArea.style.display = "block";
                    jsArea.style.display = "block";
                    jsConsoleArea.style.display = "block";
                } else if (displayMode == "scd") {
                    scdArea.style.display = "block";
                    scdConsoleArea.style.display = "block";
                } else if (displayMode == "js") {
                    jsArea.style.display = "block";
                    jsConsoleArea.style.display = "block";
                }
                cinemaMode = false;
                clearSelection();
            }   
        }, false);
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
};

drawSpiral = function(selectedProgram) {
    positions = [];
    colors = [];
    let n = 27000;
    let t = drawCount * 1e-6 + 1e2;
    for (let i = 0; i < n; i += 1) {
        let x = Math.cos(i * t) * i * 5e-5;
        let y = Math.sin(i * t) * i * 5e-5;
        let r = map(i, 0, n, 1, 0);
        let g = Math.abs(Math.atan2(y, x) / Math.PI);
        let b = Math.sin(i * 1e-3) * 0.5 + 0.5;
        let a = 1;
        positions.push(x * ratio, y, 0);
        colors.push(r, g, b, a);
    }
    // -------------------------------------------
    // Updating the buffer data
    // -------------------------------------------
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    // -------------------------------------------
    // Associating shaders to buffer objects
    // -------------------------------------------
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // Get the attribute location
    var positionAttribLocation = gl.getAttribLocation(selectedProgram, "position");
    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(positionAttribLocation);
    // bind the color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // get the attribute location
    var colorAttribLocation = gl.getAttribLocation(selectedProgram, "color");
    // point attribute to the color buffer object
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    // enable the color attribute
    gl.enableVertexAttribArray(colorAttribLocation);
    /* ======== Associating shaders to buffer objects =======*/
    gl.drawArrays(gl.POINTS, 0, n);
};


drawSimplexNoiseField = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 0.5e-1;
    let dotAmount = 30000;
    dotAmount = Math.sqrt(dotAmount);
    for (let x = 0; x < dotAmount; x++) {
        for (let y = 0; y < (dotAmount * ratio); y++) {
           let n = (openSimplex.noise3D(x * 0.1, y * 0.1, t) + 1) * 0.5;
           vertices.push((x / dotAmount - 0.5) * 1.95, (y / dotAmount / ratio - 0.5) * 1.95, 50 * n, 0.3);
           // vertices.push((x / dotAmount - 0.5) * 2.5 * (1 - y / (dotAmount * ratio) * 0.45), (y / dotAmount / ratio - 0.5) * 1.75 + n * 0.2 - 0.1, 50 * n, 0.3);
        }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, vertices.length / 4);
};

function setResolution(r) {
    resolution = r;
    cnvs.width = window.innerWidth * resolution;
    cnvs.height = window.innerHeight * resolution;
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