import React from 'react';
import * as twgl from 'twgl.js';
import vs from '../../shaders/heading.vert';
import fs from '../../shaders/heading.frag';

const Heading = ({ H='h1', children, freq=110 }) => {
  return (
    <div className='heading' id={children.replace(' ', '')}>
      <Visual freq={freq} />
      <H className='heading__text'>{children}</H>
    </div>
  );
};

export default Heading;

class Visual extends React.Component {

  componentDidMount() {
    const gl = this.refs.c.getContext('webgl');
    const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };

    const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

    const render = (time) => {
      twgl.resizeCanvasToDisplaySize(gl.canvas);
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      const uniforms = {
        time: time * 0.001,
        sharpness: 8,
        freq: this.props.freq,
        resolution: [gl.canvas.width, gl.canvas.height],
      };

      gl.useProgram(programInfo.program);
      twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
      twgl.setUniforms(programInfo, uniforms);
      twgl.drawBufferInfo(gl, bufferInfo);

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <canvas ref='c' />;
  }
}