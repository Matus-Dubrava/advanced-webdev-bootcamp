import React, { Component } from 'react';
import Recipe from './Recipe';
import './RecipeList.css';
import PropTypes from 'prop-types';

class RecipeList extends Component {
  render() {
    const recipes = this.props.recipes.map((v, i) =>
      <Recipe
        key = { i }
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

RecipeList.defaultProps = {
  recipes: []
};

export default RecipeList;
