import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { connect } from "react-redux";
import { createNewArticle } from "../store/dispatch/dispatch";
import "../css/ArticleRepo.css";
import DraftArticle from "../components/DraftArticle";
import ArticleContent from "../database/articles-content";

function ArticleRepo() {
  const sideBtns = document.querySelectorAll(".sidebar ul li");
  for (var i = 0; i < sideBtns.length; i++) {
    const btn = sideBtns[i];
    btn.addEventListener("click", () => {
      for (var y = 0; y < sideBtns.length; y++) {
        sideBtns[y].classList.remove("active");
      }
      btn.classList.add("active");
    });
  }
  return (
    <div>
      <Header />
      <div class="events-area section-padding-100">
        <div class="container">
          <div class="row articles-container">
            {/* <!-- Articles Title --> */}
            <div class="col-12">
              <div class="events-title">
                <center>
                  <h2>Repository Draft</h2>
                </center>
                <center>
                  <Link
                    className="btn btn-success mb-3"
                    to="/write-article"
                    onClick={() => createNewArticle()}
                  >
                    New Article
                  </Link>
                </center>
              </div>
            </div>
            {/* <!-- Articles List --> */}
            <div className="dashboard">
              <div className="sidebar">
                <h6>Category</h6>
                <ul>
                  <li className="active">
                    <strong>Parish Activities</strong>
                  </li>
                  <li>
                    <strong>Letters</strong>
                  </li>
                </ul>
              </div>
              <div className="contents">
                <h6>Articles</h6>
                <ul>
                  {ArticleContent.map((article, idx) => (
                    <DraftArticle key={idx} article={article} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchProps = (dispatch) => ({
  createNewArticle: () => {
    dispatch(createNewArticle());
  },
});

export default connect(null, mapDispatchProps)(ArticleRepo);
