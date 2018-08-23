import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

const InstructorItem = (props) => {
  return (
    <li>
      <h1>{ props.name }</h1>
      <h4>
        Hobbies: { props.hobbies.join(', ') }
      </h4>
    </li>
  );
}
InstructorItem.propTypes = {
  name: PropTypes.string.isRequired,
  hobbies: PropTypes.arrayOf(PropTypes.string).isRequired
};

class App extends Component {
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
    };

    setTimeout(() => {
      const randInst = Math.floor(
        Math.random() *
        this.state.instructors.length
      );

      const hobbyIdx = Math.floor(
        Math.random() *
        this.state.instructors[randInst].hobbies.length
      );

      const instructors = this.state.instructors.map((inst, i) => {
        if (i === randInst) {
          const hobbies = Array.from(inst.hobbies);
          hobbies.splice(hobbyIdx, 1);
          return {
            name: inst.name,
            hobbies
          };
        }

        return inst;
      })

      this.setState({ instructors });
    }, 3000);
  }

  render() {
    const instructors = this.state.instructors.map((inst, i) =>
      <InstructorItem
        key = { i }
        name = { inst.name }
        hobbies = { inst.hobbies }
      />
    );

    return (
      <ul className="instructor-list">
        { instructors }
      </ul>
    );
  }
}

export default App;
