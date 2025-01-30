import { useState, useEffect } from "react";
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  Figure,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { getCatBreeds } from "../utils/API";
import { saveBreedNames, getSavedCatBreeds } from "../utils/localStorage";

import { SAVE_BREED } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { searchCatBreed } from "../utils/API";
import styles from "./Home.module.css";

const Home = () => {
  const [SaveBreed] = useMutation(SAVE_BREED, {
    refetchQueries: [QUERY_ME, "Me"],
  });
  // create state for holding returned breed api data
  const [searchedBreed, setSearchedBreed] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved breedName values
  const [savedCatBreeds, setSavedCatBreeds] = useState(getSavedCatBreeds());

  // set up useEffect hook to save `savedCatBreeds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBreedNames(savedCatBreeds);
  });

  // update state(searchedBreed) with all breeds
  useEffect(() => {
    async function fetchData() {
      const breeds = await getCatBreeds();
      setSearchedBreed(breeds);
    }
    fetchData();

    return () => {
      console.log("Finalized getting all breeds");
    };
  }, [setSearchedBreed]);

  // search for breeds and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      let response = await searchCatBreed(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const items = await response.json();

      // define breed information requested from api
      const breedData = items.map((breed) => ({
        image_link: breed.image_link,
        name: breed.name,
      }));

      setSearchedBreed(breedData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a breed to our database
  const handleSaveBreed = async (breedName) => {
    // find the breed in `searchedBreed` state by the matching breed's name
    const breedToSave = searchedBreed.find((breed) => breed.name === breedName);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      delete breedToSave["meowing"];
      delete breedToSave["stranger_friendly"];
      delete breedToSave["length"];
      await SaveBreed({
        variables: {
          breed: breedToSave,
        },
      });

      // if breed successfully saves to user's account, save breed's name to state

      setSavedCatBreeds([...savedCatBreeds, breedToSave.name]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBreedDetails = (name) => {
    console.log(`Viewing details for ${name}.....`);
    document.location.assign(`/details?name=${name}`)
  };

  return (
    <>
      <div className="text-light p-2">
        <Container>
          <Form onSubmit={handleFormSubmit}>
            <Row className="justify-content-center">
              <Col xs={12} md={4}>
                <Form.Control
                  className={styles["search"]}
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="md"
                  placeholder="Search for a cat breed"
                />
              </Col>
              <Col xs={12} md={2}>
                <Button type="submit" variant="dark" size="md">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <Row>
          {searchedBreed.map((breed) => {
            return (
              <Col md="3" sm="4" key={breed.name}>
                <Card border="dark" className={styles.card}>
                  {breed.image_link ? (
                    <Figure className={styles["image-wrapper"]}>
                      <Card.Img
                        src={breed.image_link}
                        alt={`Picture for ${breed.name}`}
                        variant="top"
                      />
                    </Figure>
                  ) : null}
                  <Card.Body>
                    <Card.Title>{breed.name}</Card.Title>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCatBreeds?.some(
                          (savedBreed) => savedBreed === breed.name
                        )}
                        className={`"btn-block" ${styles["save-button"]} ${styles["card-button"]}`}
                        onClick={() => handleSaveBreed(breed.name)}
                      >
                        {savedCatBreeds?.some(
                          (savedBreed) => savedBreed === breed.name
                        )
                          ? "Saved"
                          : "Save"}
                      </Button>
                    )}
                    <Button
                      className={`"btn-block btn-info" ${styles["details-button"]} ${styles["card-button"]}`}
                      onClick={() => handleBreedDetails(breed.name)}
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Home;
