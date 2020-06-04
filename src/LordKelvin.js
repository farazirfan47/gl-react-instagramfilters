import {Shaders, Node, GLSL} from 'gl-react'
import React from 'react'


const shaders = Shaders.create({
  LordKelvin: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;

        vec2 lookup;
        lookup.y = .5;

        lookup.x = texel.r;
        texel.r = texture2D(inputImageTexture2, lookup).r;

        lookup.x = texel.g;
        texel.g = texture2D(inputImageTexture2, lookup).g;

        lookup.x = texel.b;
        texel.b = texture2D(inputImageTexture2, lookup).b;

        gl_FragColor = vec4(texel, 1.0);

      }`
  }
});

export default class LordKelvin extends React.Component {
  render() {
    var {children: inputImageTexture} = this.props
    return (
<Node
      shader={shaders.LordKelvin}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: (require('../resources/kelvinMap.png')),
      }}
    />
    );
// Surface creates the canvas, an area of pixels where you can draw.
// Node instanciates a "shader program" with the fragment shader defined above.
  }
}