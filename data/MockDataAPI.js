import { Text } from 'react-native';
import React, { Component } from 'react';
import { recipes, fullRecipes } from './DataArray';

export function getRecipes() {
  const recipesArray = [];
  fullRecipes.map(data => {
    recipesArray.push(data);
  });
  return recipesArray;
}
