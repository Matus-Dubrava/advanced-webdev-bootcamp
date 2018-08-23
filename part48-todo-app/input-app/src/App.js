import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: []
    };
  }
  render() {
    return (
      <div className="App">
        <form
          onSubmit = {(e) => {
            e.preventDefault();
            const newTodoList = Array.from(this.state.todos);
            newTodoList.push(this.state.newTodo);
            this.setState({
              newTodo: '',
              todos: newTodoList
            });
          }}
        >
          <input
            type = "text"
            name = 'inputText'
            value = { this.state.newTodo }
            onChange = {(e) => {
              this.setState({ newTodo: e.target.value })
            }}
          />
          <button
            type = 'submit'
          >Submit</button>
        </form>

        <ol>
          {this.state.todos.map((v, i) =>
            <li key={ i }>{ v }</li>
          )}
        </ol>
      </div>
    );
  }
}

export default App;
