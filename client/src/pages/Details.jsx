import { Container, Row, Col, Image, ProgressBar } from "react-bootstrap";
import styles from "./Details.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { searchCatBreed } from "../utils/API";

// Query breed details from GQL
const Details = () => {
  const [breed, setBreed] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let name = window.location.search
      name = name.split("=")[1]
      const response = await searchCatBreed(name);
      const data = await response.json();
      setBreed(data[0]);
    };
    fetchData();
  }, [setBreed]);

  return (
    <>
      <Container>
        {Object.keys(breed).length ? (
          <Row>
            <Col className="my-5" sm={12} md={6}>
              <Image className="w-100" src={breed.image_link} rounded></Image>
            </Col>
            <Col className="my-5 px-5 py-0" sm={12} md={6}>
              {/* name */}
              <Row>
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Breed Name: </h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <h5 className="m-0 p-0">{breed.name}</h5>
                </Col>
              </Row>

              {/* origin */}
              <Row>
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Origin: </h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <h5 className="m-0 p-0">{breed.origin}</h5>
                </Col>
              </Row>

              {/* family friendly */}
              <Row className="mt-4 align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Family friendly: </h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={5}
                    now={breed.family_friendly}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                    How affectionate the cat is to family.
                  </p>
                </Col>
              </Row>

              {/* intelligence */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Intelligence: </h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={5}
                    now={breed.intelligence || 2}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                    How smart the cat is.
                  </p>
                </Col>
              </Row>

              {/* playfulness */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Playfulness: </h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={5}
                    now={breed.playfulness}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                    How playful the cat is. Serious and stern or very playful.
                  </p>
                </Col>
              </Row>

              {/* general_health */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">General Health:</h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={5}
                    now={breed.general_health}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                    Resistance to illness.
                  </p>
                </Col>
              </Row>
              {/* shedding */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Shedding:</h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={5}
                    now={breed.shedding}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                    How much the cat sheds.
                  </p>
                </Col>
              </Row>

              {/* grooming */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Grooming:</h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={5}
                    now={breed.grooming}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                  Low bar-indicates maximum effort; Full bar-indicates minimum effort.
                  </p>
                </Col>
              </Row>

              {/* children_friendly */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Children friendly:</h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={5}
                    now={breed.children_friendly}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                  How well the cat gets along with children
                  </p>
                </Col>
              </Row>

              {/* min_life_expectancy */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Min life expectancy:</h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={20}
                    now={breed.min_life_expectancy}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                  Minimum life expectancy in years.
                  </p>
                </Col>
              </Row>

              {/* max_life_expectancy */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Max life expectancy:</h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={20}
                    now={breed.max_life_expectancy}
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                  Maximum life expectancy in years.
                  </p>
                </Col>
              </Row>

              {/* other_pets_friendly */}
              <Row className="align-items-baseline">
                <Col className="p-0" md={4} lg={4} xl={3} align="end">
                  <h5 className="m-0 p-0">Other Pets Friendly:</h5>
                </Col>
                <Col className="p-0 px-4 mb-1">
                  <ProgressBar
                    className={["mb-2", styles.progress]}
                    min={1}
                    max={5}
                    now={breed.other_pets_friendly}
                    variant="info-text-emphasis"
                    visuallyHidden
                  />
                  <p className={`m-0 ${styles["detail-description"]}`}>
                  How well the cat gets along with other pets in the household (for example, dogs). 
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <p>No breed found</p>
        )}
      </Container>
    </>
  );
};

export default Details;
