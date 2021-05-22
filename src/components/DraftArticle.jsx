import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteDraft } from "../store/dispatch/dispatch";
import { useHistory } from "react-router";

function DraftArticle({ article, deleteDraft }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const history = useHistory();
  const deleteModalClose = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    if (isDelete) {
      deleteDraft(article._id);
      setIsDelete(false);
      setDeleteModal(false);
    }
  }, [article._id, isDelete, deleteDraft]);

  return (
    <li>
      <strong onClick={() => history.push(`/write-article/${article._id}`)}>
        {article.title ? article.title : article.date}
      </strong>
      <div className="buttons-group">
        <button onClick={() => history.push(`/article-review/${article._id}`)}>
          <i className="fa fa-eye"></i>
        </button>

        <button onClick={() => setDeleteModal(true)}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
      <Modal show={deleteModal} onHide={deleteModalClose}>
        <Modal.Header>
          <div>
            You are attempting to delete{" "}
            <b>
              <i>{article.title ? article.title : article.date}.</i>
            </b>{" "}
            Are you sure?
          </div>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => setIsDelete(true)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </li>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteDraft: (draftId) => deleteDraft(dispatch, draftId),
});

export default connect(null, mapDispatchToProps)(DraftArticle);
