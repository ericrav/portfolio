import React from 'react';

const Project = ({ project }) => {
  return (
    <div className='project'>
      <h3 className='project__title'>{project.title}</h3>
      {project.url && <a target='_blank' className='project__link' href={project.url}>{project.cta}</a>}
      <p>{project.text}</p>
      <p className='project__tags'>{project.tags.map((t, i) => (
        <span key={t}>{t.split(' ').join('\u00A0')}{(i < project.tags.length - 1) && <span>&thinsp;·&thinsp;</span>}</span>
      ))}</p>
    </div>
  );
};

export default Project;