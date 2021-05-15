import React from "react";

function DraftArticle({ article }) {
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
        <button>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </li>
  );
}

export default DraftArticle;
