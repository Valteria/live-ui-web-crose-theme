import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createNewArticle } from "../store/dispatch/dispatch";
import { useHistory } from "react-router";

function CategoryModal({ createNewArticle, createDraft }) {
  const [cate, setCate] = useState("letters");
  const history = useHistory();
  const handleSubmit = () => {
    createNewArticle(cate === "letters" ? true : false);
  };
  useEffect(() => {
    if (createDraft.draft) {
      history.push(`/write-article/${createDraft.draft._id}`);
    }
  }, [createDraft, history]);
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
        <Button className="confirmCreateArticle" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </>
  );
}

const mapDispatchToMaps = (dispatch) => ({
  createNewArticle: (isLetters) => createNewArticle(dispatch, isLetters),
});
const mapStateToProps = (state) => ({
  createDraft: state.createDraft,
});

export default connect(mapStateToProps, mapDispatchToMaps)(CategoryModal);
