import {Shaders, Node, GLSL} from 'gl-react'
import React from 'react'


const shaders = Shaders.create({
  Hudson: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;

      void main () {

        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;

        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;

        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;
        gl_FragColor = mapped;

      }`
  }
});

export default class Hudson extends React.Component {
  render() {
    var {children: inputImageTexture} = this.props
    return (
      <Node
      shader={shaders.Hudson}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: (require('../resources/hudsonBackground.png')),
        inputImageTexture3: (require('../resources/overlayMap.png')),
        inputImageTexture4: (require('../resources/hudsonMap.png')),
      }}
    />
    );
// Surface creates the canvas, an area of pixels where you can draw.
// Node instanciates a "shader program" with the fragment shader defined above.
  }
}