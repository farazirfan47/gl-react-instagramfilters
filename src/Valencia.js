import {Shaders, Node, GLSL} from 'gl-react'
import React from 'react'

const shaders = Shaders.create({
  Valencia: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;


      mat3 saturateMatrix = mat3(
                                1.1402,
                                -0.0598,
                                -0.061,
                                -0.1174,
                                1.0826,
                                -0.1186,
                                -0.0228,
                                -0.0228,
                                1.1772);

      vec3 lumaCoeffs = vec3(.3, .59, .11);

      void main () {

        vec3 texel = texture2D(inputImageTexture, uv).rgb;

        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .8333333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .1666666)).b
                    );

        texel = saturateMatrix * texel;
        float luma = dot(lumaCoeffs, texel);
        texel = vec3(
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.r))).r,
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.g))).g,
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.b))).b);

        gl_FragColor = vec4(texel, 1.0);
      }`
  }
});

export default class Valencia extends React.Component {
  render() {
    var {children: inputImageTexture} = this.props
    return (
<Node
      shader={shaders.Valencia}
      uniforms={{
        inputImageTexture,
        inputImageTexture2: (require('../resources/valenciaMap.png')),
        inputImageTexture3: (require('../resources/valenciaGradientMap.png')),
      }}
    />
    );
// Surface creates the canvas, an area of pixels where you can draw.
// Node instanciates a "shader program" with the fragment shader defined above.
  }
}