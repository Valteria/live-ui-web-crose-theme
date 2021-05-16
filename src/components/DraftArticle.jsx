import React from "react";
import { connect } from "react-redux";
import { deleteDraft } from "../store/dispatch/dispatch";

function DraftArticle({ article, deleteDraft }) {
  return (
    <li>
      <strong>{article.title ? article.title : article.date}</strong>
      <div className="buttons-group">
        <button>
          <i className="fa fa-eye"></i>
        </button>
        <button>
          <i className="fa fa-paper-plane"></i>
        </button>
        <button onClick={() => deleteDraft(article._id)}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </li>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteDraft: (draftId) => deleteDraft(dispatch, draftId),
});

export default connect(null, mapDispatchToProps)(DraftArticle);
