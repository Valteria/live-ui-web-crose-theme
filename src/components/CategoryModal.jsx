import { Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function CategoryModal() {
  const [cate, setCate] = useState("letters");
  const handleSubmit = () => {
    console.log(cate);
  };
  return (
    <>
      <Modal.Header closeButton>
        <h6>Select a kind of your new article</h6>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="radio"
            label="Letters"
            value="letters"
            name="group"
            checked
            onChange={(e) => setCate(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="Parish Activities"
            value="parish-activities"
            name="group"
            onChange={(e) => setCate(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Link
          className="confirmCreateArticle"
          to="/write-article"
          onClick={handleSubmit}
        >
          Confirm
        </Link>
      </Modal.Footer>
    </>
  );
}

export default CategoryModal;
