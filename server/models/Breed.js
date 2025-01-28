const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const breedSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image_link: {
    type: String,
    required: true
  },
  origin: {
    type: String
  },
  family_friendly:  {
    type: Number
  },
  shedding: {
    type: Number
  },
  general_health:  {
    type: Number
  },
  playfulness:  {
    type: Number
  },
  children_friendly:  {
    type: Number
  },
  grooming:  {
    type: Number
  },
  intelligence:  {
    type: Number
  },
  other_pets_friendly:  {
    type: Number
  },
  min_weight:  {
    type: Number
  },
  max_weight:  {
    type: Number
  },
  min_life_expectancy:  {
    type: Number
  },
  max_life_expectancy:  {
    type: Number
  },
});

module.exports = breedSchema;
