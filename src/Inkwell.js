import {Shaders, Node, GLSL} from 'gl-react'
import React from 'react'

const shaders = Shaders.create({
  Inkwell: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;

      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(dot(vec3(0.3, 0.6, 0.1), texel));
        texel = vec3(texture2D(inputImageTexture2, vec2(texel.r, .83333)).r);
        gl_FragColor = vec4(texel, 1.0);

      }`
  }
});

export default class Inkwell extends React.Component {
  render() {
    var {children: inputImageTexture} = this.props
    return (
    <Node
      shader={shaders.Inkwell}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: (require('../resources/inkwellMap.png')),
      }}
    />
    );
// Surface creates the canvas, an area of pixels where you can draw.
// Node instanciates a "shader program" with the fragment shader defined above.
  }
}
