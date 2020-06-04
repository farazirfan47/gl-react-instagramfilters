import {Shaders, Node, GLSL} from 'gl-react'
import React from 'react'

const shaders = Shaders.create({
  Normal: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export default class Normal extends React.Component {
  render() {
    var {children: inputImageTexture} = this.props
    return (
<Node
      shader={shaders.Normal}
      uniforms={{
        inputImageTexture,
      }}
    />
    );
// Surface creates the canvas, an area of pixels where you can draw.
// Node instanciates a "shader program" with the fragment shader defined above.
  }
}
