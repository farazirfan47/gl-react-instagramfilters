import {Shaders, Node, GLSL} from 'gl-react'
import React from 'react'

const shaders = Shaders.create({
  Nashville: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;

      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .83333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .16666)).b);
        gl_FragColor = vec4(texel, 1.0);

      }`
  }
});

export default class Nashville extends React.Component {
  render() {
    var {children: inputImageTexture} = this.props
    return (
<Node
      shader={shaders.Nashville}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: (require('../resources/nashvilleMap.png')),
      }}
    />
    );
// Surface creates the canvas, an area of pixels where you can draw.
// Node instanciates a "shader program" with the fragment shader defined above.
  }
}
