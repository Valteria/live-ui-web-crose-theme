import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { connect } from "react-redux";
import { createNewArticle, getDraftList } from "../store/dispatch/dispatch";
import "../css/ArticleRepo.css";
import DraftArticle from "../components/DraftArticle";
import {
  letterArticles,
  parishActivityArticles,
} from "../database/drafts-content";

function ArticleRepo({ getDraftList }) {
  const [listArticles, setListArticles] = useState([]);
  const [cateId, setCateId] = useState("parish-activities");
  const sideBtns = document.querySelectorAll(".sidebar ul li");
  for (var i = 0; i < sideBtns.length; i++) {
    const btn = sideBtns[i];
    btn.addEventListener("click", () => {
      for (var y = 0; y < sideBtns.length; y++) {
        sideBtns[y].classList.remove("active");
      }
      setCateId(btn.getAttribute("id"));
      btn.classList.add("active");
    });
  }
  // useEffect(() => {
  //   if (cateId) {
  //     getDraftList(cateId);
  //   }
  // }, [cateId]);
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
                  <li className="active" id="parish-activities">
                    <strong>Parish Activities</strong>
                  </li>
                  <li id="letters">
                    <strong>Letters</strong>
                  </li>
                </ul>
              </div>
              <div className="contents">
                <h6>Articles</h6>
                <ul>
                  {listArticles.length === 0 && <li>No Draft</li>}
                  {listArticles.map((article, idx) => (
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

const mapDispatchToProps = (dispatch) => ({
  createNewArticle: () => {
    dispatch(createNewArticle());
  },
  getDraftList: (cateId) => {
    dispatch(getDraftList(cateId));
  },
});

export default connect(null, mapDispatchToProps)(ArticleRepo);
