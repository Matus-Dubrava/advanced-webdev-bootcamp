import React, { Component } from 'react';
import './Instructors.css';

function getRandomNumber(n) {
  return Math.floor(Math.random() * n);
}

function copyInstructors(instructors) {
  const newInstructors = [];

  instructors.forEach((instructor) => {
    newInstructors.push({
      name: instructor.name,
      hobbies: Array.from(instructor.hobbies)
    });
  });

  return newInstructors;
}

class Instructors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['sailing', 'react']
        },
        {
          name: 'Matt',
          hobbies: ['math', 'd3']
        },
        {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        },
        {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    }

    setTimeout(() => {
      const instructorIdx = getRandomNumber(this.state.instructors.length);
      const hobbyIdx =
        getRandomNumber(this.state.instructors[instructorIdx].hobbies.length);
      const newInstructors = copyInstructors(this.state.instructors);

      newInstructors[instructorIdx].hobbies.splice(hobbyIdx, 1);

      this.setState({
        instructors: newInstructors
      });
    }, 3000);
  }

  render() {
    const instructorsItems = this.state.instructors.map((v, i) =>
      <div className="instructor" key={ i }>
        <h2>{ v.name }</h2>
        <div>Hobbies: { v.hobbies.join(', ') }</div>
      </div>
    );
    return (
      <ul className="instructors">
        { instructorsItems }
      </ul>
    );
  }
}

export default Instructors;
