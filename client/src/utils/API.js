// make a search to cat's api
// https://api.api-ninjas.com/v1/cats?name=Abyssinian
export const searchCatBreed = (query) => {
  return fetch(`https://api.api-ninjas.com/v1/cats?name=${query}`, {
    headers: {
      "X-Api-Key": "klNzjI7v9eHRO+eVjMir0w==PECa7kj8fM8ZYDXw",
    },
  });
};

export const getCatBreeds = async () => {
  const breeds = [
    "Aegean",
    "Abyssinian",
    // "American Bobtail",
    // "American Curl",
    // "American Shorthair",
    // "American Wirehair",
    // "Bengal",
    // "Birman",
    // "British Shorthair",
    // "Burmese",
    // "Chartreux",
    // "Cornish Rex",
    // "Devon Rex",
    // "Egyptian Mau",
    // "Havana Brown",
    // "Japanese Bobtail",
    // "Korat",
    // "Maine Coon",
    // "Manx",
    // "Norwegian Forest",
    // "Ocicat",
    // "Oriental",
    // "Persian",
    // "Sphynx",
  ];

  let breedFeatures = [];

  for (const breed of breeds) {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/cats?name=${breed}`,
      {
        headers: {
          "X-Api-Key": "klNzjI7v9eHRO+eVjMir0w==PECa7kj8fM8ZYDXw",
        },
      }
    );

    const data = await response.json();
    breedFeatures.push(data[0]);
  }

  return breedFeatures;
};
