import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { searchRecipes } from '../utils/utils.js';
import actions from '../actions/index.js';
import { push } from 'react-router-redux';
import { EMPTY_RECIPE } from '../constants/EmptyRecipe.js';
import '../scss/_nav.scss';

class Nav extends Component {
  render() {
    const { user, avatar, search, recipeID, navToCreate, dispatch } = this.props;
    let { searchString } = this.props;
    let signInOut, linkToProfile;
    if (!user.id) {
      signInOut = <button class="sign-in-btn"> <a href="/auth/google">Sign In</a> </button>;
    } else {
      signInOut = <a href="/auth/signout">Sign Out</a>;
      linkToProfile = (
        <Link to={`/profile/${user.id}`}>
          <img className="avatar" src={avatar} alt="avatar"></img>
        </Link>);
    }
    return (
        <div className="nav-bar">
          <div className="nav-bar-left">
            <Link to="/">
              <object style={{maxHeight: '24px'}} type="image/svg+xml" className="logo" data="../assets/forkful-very-long.svg">
                <img style={{maxHeight: '24px'}} src="../assets/forkful-very-long.svg" />
              </object></Link>
            <input
              className="search-bar"
              placeholder="Search for recipes"
              onKeyDown={(e) => { e.keyCode === 13 ? search(searchString) : searchString = e.target.value }}
            ></input>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navToCreate();
              }}> Create
            </button>
            <button>
              <a href="/dashboard">Discover</a>
            </button>
          </div>
          <div className="nav-bar-right">
              {signInOut}
              {linkToProfile}
          </div>
          {/* <Link to={`/recipe/${recipeID}`}>Recipe</Link>*/}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    avatar: state.user.photos[0].value,
    recipeID: state.recipe.id,
    // map a local variable to props
    searchString: '',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => {
      searchRecipes(query, (recipeArray) => {
        dispatch(actions.setRecipeList(recipeArray));
        dispatch(push('/search'));
      });
    },
    navToCreate: () => {
      dispatch(actions.setRecipe(EMPTY_RECIPE));
      dispatch(push('/create'));
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
