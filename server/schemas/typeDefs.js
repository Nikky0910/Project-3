const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBreeds: [Breed]!
    breedCount: Int
  }

  type Breed {
    _id: ID
    name:String
    image_link:String
    origin: String
    family_friendly: Int
    shedding:Int
    general_health: Int
    playfulness: Int
    children_friendly: Int
    grooming: Int
    intelligence: Int
    other_pets_friendly: Int
    min_weight: Int
    max_weight: Int
    min_life_expectancy: Int
    max_life_expectancy: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  input BreedInput {
    name:String
    image_link:String
    origin: String
    family_friendly: Int
    shedding:Int
    general_health: Int
    playfulness: Int
    children_friendly: Int
    grooming: Int
    intelligence: Int
    other_pets_friendly: Int
    min_weight: Int
    max_weight: Int
    min_life_expectancy: Int
    max_life_expectancy: Int
  }

  type Query {
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    saveBreed(breed: BreedInput!): User

    removeBreed(name: String!): User
  }
`;

module.exports = typeDefs;
