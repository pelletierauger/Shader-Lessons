function setBothShaders(fragCode) {
    // vertex shader source code
    var vertCode = `
        // our vertex data
        attribute vec3 aPosition;
        // our texcoordinates
        attribute vec2 aTexCoord;
        // this is a variable that will be shared with the fragment shader
        // we will assign the attribute texcoords to the varying texcoords to move them from the vert shader to the frag shader
        // it can be called whatever you want but often people prefiv it with 'v' to indicate that it is a varying
        varying vec2 vTexCoord;
        void main() {
        // copy the texture coordinates
        vTexCoord = aTexCoord;
        // copy the position data into a vec4, using 1.0 as the w component
        vec4 positionVec4 = vec4(aPosition, 1.0);
        positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
        // send the vertex information on to the fragment shader
        gl_Position = positionVec4;
        }
    `;
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);
    // Compile the vertex shader
    gl.compileShader(vertShader);
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
    // Compile the fragmentt shader
    gl.compileShader(fragShader);
    // Create a shader program object to
    // store the combined shader program
    shaderProgram = gl.createProgram();
    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader);
    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);
    // Link both the programs
    gl.linkProgram(shaderProgram);
    // Use the combined shader program object
    gl.useProgram(shaderProgram);
    time = gl.getUniformLocation(shaderProgram, "time");
    resolution = gl.getUniformLocation(shaderProgram, "resolution");
}


function setRectangle() {
    let vertices = new Float32Array(
    [
        -1, 1, 1, 1, 1, -1, // Triangle 1
        -1, 1, 1, -1, -1, 1 // Triangle 2
    ]);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    let itemSize = 2;
    let numItems = vertices.length / itemSize;
    shaderProgram.aVertexPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.enableVertexAttribArray(shaderProgram.aVertexPosition);
    gl.vertexAttribPointer(shaderProgram.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);
}