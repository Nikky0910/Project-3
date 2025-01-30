export const getSavedCatBreeds = () => {
  const savedBreedNames = localStorage.getItem('saved_names')
    ? JSON.parse(localStorage.getItem('saved_names'))
    : [];

  return savedBreedNames;
};

export const saveBreedNames = (breeds) => {
  if (breeds.length) {
    localStorage.setItem('saved_names', JSON.stringify(breeds));
  } else {
    localStorage.removeItem('saved_names');
  }
};

export const removeBreedName = (breedName) => {
  const savedBreedNames = localStorage.getItem('saved_names')
    ? JSON.parse(localStorage.getItem('saved_names'))
    : null;

  if (!savedBreedNames) {
    return false;
  }

  const updatedSavedBreedNames = savedBreedNames?.filter((savedBreedName) => savedBreedName !== breedName);
  localStorage.setItem('saved_names', JSON.stringify(updatedSavedBreedNames));

  return true;
};
