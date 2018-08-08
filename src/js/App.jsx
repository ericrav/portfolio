import React, { Component } from 'react';
import Heading from './components/Heading';

class App extends Component {

  render() {
    return (
      <div>
        {/*<div className="gallery" style="display: none;"><div className="gallery__image"></div></div>*/}
        <div className="container">
          <Heading H='h1'>Eric Rabinowitz</Heading>
          <p>I am a full-stack developer and creative coder based in Atlanta, where I also studied Computer Science and Industrial Design at Georgia Tech. My primary tools are React, NodeJS, and Processing, and I am currently exploring more WebGL. You can find me on these websites:</p>
          <ul><li><a target="_blank" href="http://twitter.com/ericrav">twitter.com/ericrav</a>
          </li><li><a target="_blank" href="http://instagram.com/ericrabin">instagram.com/ericrabin</a>
          </li><li><a target="_blank" href="http://github.com/ericrav">github.com/ericrav</a>
          </li></ul>

          <Heading H='h2'>Projects</Heading>

          <h3>9to5.tv // Works&nbsp;in&nbsp;Progress</h3>
          <a target="_blank" className="project_link" href="https://9to5.tv/">View Website</a>
          <p>In 2016, Pablo Gnecco, Derek Bruno, and Travis Broyles won the <a target="_blank" href="http://www.fieldexperimentatl.com/">Field Experiment</a> grant to create a live-streamed and interactive co-working space that invites online participants into artists’ creative processes and performances. I later joined the team and built the website and a suite of digital tools to allow realtime manipulation of projects being live-streamed. </p>
          <p>We launched an open call (<a target="_blank" href="http://opencall.9to5.tv/">archive link</a>) for live-streamed performances as well as physical and online gallery installations, and in September 2017, we opened our production studio and gallery space with Georgia State in their yet-to-be-opened <a target="_blank" href="http://cmii.gsu.edu/">CMII</a> building.</p>
          <p>Projects included: Harald Haraldsson’s <a target="_blank" href="http://www.creativeapplications.net/android/ab-experimental-ar-livestream-with-audience-participation/">A&hairsp;/&hairsp;B</a>—a live-streamed walk around New York’s Chinatown where the online audience voted which way Harald walked; a dating simulator performance where actors responded to script choices made by the online audience; and a series of workshops and talkshows where the audience chatted and added reaction stickers and GIFs, custom to each show, to the video stream.</p>

          <p className="tags">JS&thinsp;·&thinsp;React&thinsp;·&thinsp;WebSockets</p>

          <h3>ScreenLinks</h3>
          <p>Created during <span className="ntf">9to5</span> for display on Georgia State CMII’s NanoLumens screen, ScreenLinks in an experiment to create concert or event visuals that audiences can easily play with from their phone’s web browser and collectively share on a large screen. The project aimed to give audience members a more personal way to connect with and influence a performance by providing controls that could be used at any time.</p>
          <p>During a series of weekly music performances for <span className="ntf">9to5</span>, I experimented with different visuals and interfaces, including a collaborative drawing board and interactive 3d visuals. For the last concert, I created a <i>Space Invaders</i>-style game, where players tilted their phones to move a spaceship and fire at blocks that activated videos of the musicians. Versions of this project were also created for Georgia State’s CMII Opening Day and Chemistry advertising agency.</p>

          <p className="tags">JS&thinsp;·&thinsp;THREE&thinsp;·&thinsp;GLSL&thinsp;·&thinsp;WebSockets</p>

          <h3>LineLabs</h3>
          <a className="project_link" target="_blank" href="https://d2c4uq3hxwtz2z.cloudfront.net/">Launch Beta</a>
          <p>Linelabs is an online visualization tool that encourages people to discover relationships between dozens of linear urban infrastructure reuse projects around the world. I am building this project for <a target="_blank" href="https://ryangravel.com/generator/">Generator</a>, a nonprofit studio cultivating ideas about the future of cities.</p>

          <p className="tags">JS&thinsp;·&thinsp;D3&thinsp;·&thinsp;React</p>

          <h3>Knowd</h3>
          <a className="project_link" target="_blank" href="https://theknowd.com">View Website</a>
          <p>Currently being beta tested at the Goat Farm Arts Center, Knowd is a web- and SMS-based platform for entrepreneurs and artists to find opportunities in their professional networks. Knowd gives co-working spaces a collaborative relationship management tool and quick way to make referrals by matching people’s needs and resources. By making networks more transparent and easier to navigate, we aim to help people see more of what they can offer to others and gain more equitable access to collaborators and work opportunities.</p>

          <p className="tags">JS&thinsp;·&thinsp;React&thinsp;·&thinsp;Redux&thinsp;·&thinsp;Twilio&thinsp;·&thinsp;AWS&nbsp;Lambda&thinsp;·&thinsp;OrientDB</p>
        </div>
      </div>
    );
  }
}

export default App;