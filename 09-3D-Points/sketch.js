let looping = true;
let keysActive = true;
let socket, cnvs, gl, shaderProgram, time;
let drawCount = 0, drawIncrement = 1;
let resolutionUniformLocation, timeUniformLocation;
let vertexIDAttribLocation;
let positions, colors;
let currentProgram;
let ratio;
let resolution = 1;
let indices = [];
for (let i = 0; i < 10000000; i++) {
    indices.push(i);
}
indices = new Float32Array(indices);
let indicesBuffer;

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

    indicesBuffer = gl.createBuffer();

    shadersReadyToInitiate = true;
    initializeShaders();

    currentProgram = getProgram("smooth-dots-vertex");
    gl.useProgram(currentProgram);

    vertexIDAttribLocation = gl.getAttribLocation(currentProgram, "vertexID");
    // -------------------------------------------
    // Updating the indices buffer
    // -------------------------------------------
    gl.bindBuffer(gl.ARRAY_BUFFER, indicesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(vertexIDAttribLocation, 1, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(vertexIDAttribLocation);
    
    resolutionUniformLocation = gl.getUniformLocation(smoothDotsVertex.program, "resolution");
    gl.uniform2f(resolutionUniformLocation, cnvs.width, cnvs.height);
    timeUniformLocation = gl.getUniformLocation(smoothDotsVertex.program, "time");
    
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
        keysControl.addEventListener("mouseenter", function(event) {
        document.body.style.cursor = "none";
        document.body.style.backgroundColor = "#000000";
        appControl.setAttribute("style", "display:none;");
        let tabs = document.querySelector("#file-tabs");
        tabs.setAttribute("style", "display:none;");
        cinemaMode = true;
        scdArea.style.display = "none";
        scdConsoleArea.style.display = "none";
        jsArea.style.display = "none";
        jsConsoleArea.style.display = "none";
    }, false);
    keysControl.addEventListener("mouseleave", function(event) {
            document.body.style.cursor = "default";
            document.body.style.backgroundColor = "#1C1C1C";
            appControl.setAttribute("style", "display:block;");
            let tabs = document.querySelector("#file-tabs");
            tabs.setAttribute("style", "display:block;");
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
        }, false);
    }, 1);
    ratio = window.innerHeight / window.innerWidth; 
    if (!looping) {
        noLoop();
    }
}

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    currentProgram = getProgram("smooth-dots-vertex");
    gl.useProgram(currentProgram);
    drawSpiral(currentProgram);
    drawCount += drawIncrement;
};

drawSpiral = function(selectedProgram) {
    gl.uniform1f(timeUniformLocation, drawCount);
    // 57600 = (240 * 240)
    gl.drawArrays(gl.POINTS, 0, 57600);
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