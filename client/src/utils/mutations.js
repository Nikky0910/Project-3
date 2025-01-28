import {gql} from '@apollo/client'


export const LOGIN=gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`

export const ADD_USER=gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
  }
}
`

export const SAVE_BREED=gql`
mutation SaveBreed($breed: BreedInput!) {
  saveBreed(breed: $breed) {
    savedBreeds {
      name
      image_link
      origin
      family_friendly
      shedding
      general_health
      playfulness
      children_friendly
      grooming
      intelligence
      other_pets_friendly
      min_weight
      max_weight
      min_life_expectancy
      max_life_expectancy
    }
  }
}
`

export const REMOVE_BREED=gql`
mutation RemoveBreed($name: String!) {
  removeBreed(name: $name) {
    savedBreeds {
      name
      image_link
      origin
      family_friendly
      shedding
      general_health
      playfulness
      children_friendly
      grooming
      intelligence
      other_pets_friendly
      min_weight
      max_weight
      min_life_expectancy
      max_life_expectancy
    }
  }
}
`