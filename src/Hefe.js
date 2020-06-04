import {Shaders, Node, GLSL} from 'gl-react'
import React from 'react'

const shaders = Shaders.create({
  Hefe: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec3 edge = texture2D(inputImageTexture2, uv).rgb;
        texel = texel * edge;

        texel = vec3(
                       texture2D(inputImageTexture3, vec2(texel.r, .83333)).r,
                       texture2D(inputImageTexture3, vec2(texel.g, .5)).g,
                       texture2D(inputImageTexture3, vec2(texel.b, .16666)).b);

        vec3 luma = vec3(.30, .59, .11);
        vec3 gradSample = texture2D(inputImageTexture4, vec2(dot(luma, texel), .5)).rgb;
        vec3 final = vec3(
                            texture2D(inputImageTexture5, vec2(gradSample.r, (1.0-texel.r))).r,
                            texture2D(inputImageTexture5, vec2(gradSample.g, (1.0-texel.g))).g,
                            texture2D(inputImageTexture5, vec2(gradSample.b, (1.0-texel.b))).b
                            );

          vec3 metal = texture2D(inputImageTexture6, uv).rgb;
          vec3 metaled = vec3(
                              texture2D(inputImageTexture5, vec2(metal.r, (1.0-texel.r))).r,
                              texture2D(inputImageTexture5, vec2(metal.g, (1.0-texel.g))).g,
                              texture2D(inputImageTexture5, vec2(metal.b, (1.0-texel.b))).b
                              );

        gl_FragColor = vec4(metaled, 1.0);

      }`
  }
});


export default class Hefe extends React.Component {
  render() {
    var {children: inputImageTexture} = this.props
    return (
    <Node
      shader={shaders.Hefe}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: (require('../resources/edgeBurn.png')),
        inputImageTexture3: (require('../resources/hefeMap.png')),
        inputImageTexture4: (require('../resources/hefeGradientMap.png')),
        inputImageTexture5: (require('../resources/hefeSoftLight.png')),
        inputImageTexture6: (require('../resources/hefeMetal.png'))
      }}
    />
    );
// Surface creates the canvas, an area of pixels where you can draw.
// Node instanciates a "shader program" with the fragment shader defined above.
  }
}
