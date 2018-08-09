import React, { Component } from 'react';
import Heading from './components/Heading';
import Project from './components/Project';
import content from '../content.yaml';

console.log(content);

class App extends Component {

  render() {
    return (
      <div>
        {/*<div className="gallery" style="display: none;"><div className="gallery__image"></div></div>*/}
        <div className="container">
          <Heading H='h1' freq={110}>Eric Rabinowitz</Heading>
          <p>I am a full-stack developer and creative coder based in Atlanta, where I also studied Computer Science and Industrial Design at Georgia Tech. My primary tools are React, NodeJS, and Processing, and I am currently exploring more WebGL.</p>

          <ul className='nav'>
            <li><a href='#EricRabinowitz'><span className='nav__num'>110</span> <strong>Eric Rabinowitz</strong></a></li>
            <li><a href='#Projects'><span className='nav__num'>220</span> Projects</a></li>
            <li><a href='#Work'><span className='nav__num'>330</span> Work</a></li>
            <li><a href='#Studies'><span className='nav__num'>440</span> Studies</a></li>
            <li><a href='#Endnotes'><span className='nav__num'>550</span> Endnotes</a></li>
          </ul>

          <Heading H='h2' freq={220}>Projects</Heading>
          {content.projects.map(p => <Project key={p.title} project={p} />)}
          <Heading H='h2' freq={330}>Work</Heading>
          {content.work.map(p => <Project key={p.title} project={p} />)}
          <Heading H='h2' freq={440}>Studies</Heading>
          {content.studies.map(p => <Project key={p.title} project={p} />)}
          <Heading H='h2' freq={550}>Endnotes</Heading>
        </div>
      </div>
    );
  }
}

export default App;