import { Container, Card, Button, Row, Col, Figure } from "react-bootstrap";

// import { getMe, deleteBook } from "../utils/API";
import Auth from "../utils/auth";
import { removeBreedName } from "../utils/localStorage";
import { QUERY_ME } from "../utils/queries";

import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_BREED } from "../utils/mutations";
import styles from "./Home.module.css";

function SavedBreeds() {
  const [RemoveBreed] = useMutation(REMOVE_BREED);
  // use this to determine if `useEffect()` hook needs to run again
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // create function that accepts the breed's mongo name value as param and deletes the breed from the database
  const handleDeleteBreed = async (name) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await RemoveBreed({ variables: { name } });

      window.location.reload();
      // setUserData(updatedUser);
      // upon success, remove breed's name from localStorage
      removeBreedName(name);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBreedDetails = (name) => {
    console.log(`Viewing details for ${name}.....`);
    document.location.assign(`/details?name=${name}`)
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container>
        <h2 className="pt-5">
          {userData.savedBreeds.length
            ? `Viewing ${userData.savedBreeds.length} saved ${
                userData.savedBreeds.length === 1 ? "breed" : "breeds"
              }:`
            : "You have no saved breeds!"}
        </h2>
        <Row>
          {userData.savedBreeds.map((breed) => {
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
                    <Button
                      className={["btn-block btn-danger", styles["card-button"]]}
                      onClick={() => handleDeleteBreed(breed.name)}
                    >
                      Delete
                    </Button>
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
}

export default SavedBreeds;
