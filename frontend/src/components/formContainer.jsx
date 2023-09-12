// Importing necessary components from the "react-bootstrap" library.

import { Col, Container, Row } from "react-bootstrap";

// Defining a functional component called "FormContainer" that takes "children" as a prop.
const FormContainer = ({ children }) => {
  return (
    // Wrapping the component's content in a Bootstrap "Container" component.
    <Container>
      {/* Creating a row with justified content alignment in the middle (horizontally). */}
      <Row className="justify-content-md-center">
        {/* Creating a column that spans 12 columns on extra-small screens and 6 columns on medium screens. */}
        <Col xs={12} md={6}>
          {/* Rendering the "children" components or content within this column. */}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

// Exporting the "FormContainer" component as the default export.
export default FormContainer;
