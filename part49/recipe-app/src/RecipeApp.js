import React, { Component } from 'react';
import './RecipeApp.css';
import RecipeList from './RecipeList';
import Navbar from './Navbar';
import RecipeInput from './RecipeInput';

class RecipeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [
        {
          id: 0,
          title: "Spaghetti",
          ingredients: ['pasta', '8 cups water'],
          instructions: "Open jar of spaghetti sauce. Bring to simme. Boil water." +
                       " Cook pasta until done. Combine pasta and sauce.",
          img: "spaghetti.jpeg"
        },
        {
          id: 1,
          title: "Milkshake",
          ingredients: ['2 Scoops ice cream', '8 ounces milk'],
          instructions: "Combine ice cream and milk. Blend until creamy.",
          img: "milkshake.jpg"
        },
        {
          id: 2,
          title: "Avocado Toast",
          ingredients: ['2 slices of bread', '1 avocado', '1 tablespoon olive oil',
                        '1 pinch of salt', 'pepper'],
          instructions: "Toast bread. Slice avocado and spread on bread. Add salt," +
                       " oil, and pepper to taste.",
          img: "avocado-toast.jpeg"
        }
      ],
      nextRecipeId: 3,
      links: [
        { name: 'New Recipe', dest: '#' },
        { name: 'Home', dest: '#' },
        { name: 'About', dest: '#' },
        { name: 'Contact Us', dest: '#' }
      ]
    };

    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(recipe) {
    this.setState((prevState, props) => {
      const newRecipe = { ...recipe, id: this.state.nextRecipeId }
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <Navbar
            links = { this.state.links }
            title = 'Recipe App'
          />
        </header>
        <RecipeInput onSave={this.handleSave} />
        <RecipeList
          recipes = { this.state.recipes }
        />
      </div>
    );
  }
}

export default RecipeApp;
