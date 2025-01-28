import {gql} from '@apollo/client'


export const QUERY_ME=gql`
query Me {
  me {
    savedBreeds {
      _id
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