import React, { Component } from 'react';
import Recipe from './Recipe';
import './RecipeList.css';
import PropTypes from 'prop-types';

class RecipeList extends Component {
  render() {
    const recipes = this.props.recipes.map((v, i) =>
      <Recipe
        key = { v.id }
        title = { v.title }
        ingredients = { v.ingredients }
        instructions = { v.instructions }
        img = { v.img }
      />
    );

    return (
      <div className="recipe-list">
        { recipes }
      </div>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RecipeList;
