import React from 'react';
import * as twgl from 'twgl.js';
import vs from '../../shaders/heading.vert';
import fs from '../../shaders/heading.frag';

let now;
const Heading = ({ H='h1', open, children, freq=110, toggle }) => {

  const onClick = () => {
    const scroll = (t) => {
      if (!now) now = t;
      const el = document.getElementById(children.replace(' ', ''));
      window.scroll(0, el.offsetTop);

      if (t - now > 200) {
        now = false;
      } else {
        window.requestAnimationFrame(scroll);
      }
    };
    if (open) {
      window.scroll(0, 0);
    } else {
      window.requestAnimationFrame(scroll);
    }
    toggle();
  };

  return (
    <div onClick={onClick} className={'heading' + (open ? '' : ' heading--closed')} id={children.replace(' ', '')}>
      <Visual freq={freq} />
      <H className='heading__text'>{children}</H>
    </div>
  );
};

export default Heading;

class Visual extends React.Component {

  componentDidMount() {
    const gl = this.refs.c.getContext('webgl', { antialias: true });
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