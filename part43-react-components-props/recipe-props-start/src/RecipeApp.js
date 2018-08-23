import React, { Component } from 'react';
import './RecipeApp.css';
import RecipeList from './RecipeList';
import Navbar from './Navbar';

class RecipeApp extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navbar
            links = {[
              { name: 'New Recipe', dest: '#' },
              { name: 'Home', dest: '#' },
              { name: 'About', dest: '#' },
              { name: 'Contact Us', dest: '#' }
            ]}
            title = 'Recipe App'
          />
        </header>

        <RecipeList
          recipes = {[
            {
              title: "Spaghetti",
              ingredients: ['pasta', '8 cups water'],
              instructions: "Open jar of spaghetti sauce. Bring to simme. Boil water." +
                           " Cook pasta until done. Combine pasta and sauce.",
              img: "spaghetti.jpeg"
            },
            {
              title: "Milkshake",
              ingredients: ['2 Scoops ice cream', '8 ounces milk'],
              instructions: "Combine ice cream and milk. Blend until creamy.",
              img: "milkshake.jpg"
            },
            {
              title: "Avocado Toast",
              ingredients: ['2 slices of bread', '1 avocado', '1 tablespoon olive oil',
                            '1 pinch of salt', 'pepper'],
              instructions: "Toast bread. Slice avocado and spread on bread. Add salt," +
                           " oil, and pepper to taste.",
              img: "avocado-toast.jpeg"
            }
          ]}
        />
      </div>
    );
  }
}

export default RecipeApp;
