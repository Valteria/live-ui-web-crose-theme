import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { connect, useDispatch } from "react-redux";
import { getArticles, getDraftList } from "../store/dispatch/dispatch";
import "../css/ArticleRepo.css";
import DraftArticle from "../components/DraftArticle";
import { Button, Modal } from "react-bootstrap";
import CategoryModal from "../components/CategoryModal";
import { DELETE_DRAFT_RESET } from "../store/actionType";

function ArticleRepo({
  getDraftList,
  draftsList,
  deleteDraft,
  getArticles,
  articlesList,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cateId, setCateId] = useState("letters");
  const [headId, setHeadId] = useState("/Drafts");
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalOpen(false);
  };

  const { success } = deleteDraft;

  const selectTab = (groupBtn, setId) => {
    for (var i = 0; i < groupBtn.length; i++) {
      const btn = groupBtn[i];
      btn.addEventListener("click", () => {
        for (var y = 0; y < groupBtn.length; y++) {
          groupBtn[y].classList.remove("active");
        }
        setId(btn.getAttribute("id"));
        btn.classList.add("active");
      });
    }
  };

  useEffect(() => {
    // Select Category
    const sideBtns = document.querySelectorAll(".sidebar ul li");
    selectTab(sideBtns, setCateId);
    getDraftList(cateId);

    // Select Drafts Or Posts
    const headBtn = document.querySelectorAll(".contents__headTable");
    selectTab(headBtn, setHeadId);
    getArticles(headId);

    if (success) {
      dispatch({ type: DELETE_DRAFT_RESET });
    }
  }, [cateId, getDraftList, success, dispatch, getArticles, headId]);
  console.log(articlesList);

  return (
    <div>
      <Header />
      <div className="events-area section-padding-100">
        <div className="container">
          <div className="row articles-container">
            {/* <!-- Articles Title --> */}
            <div className="col-12 mb-3">
              <div className="events-title">
                <center>
                  <h2>Repository</h2>
                  <Button
                    className="newArticleBtn"
                    onClick={() => setModalOpen(true)}
                  >
                    New Article
                  </Button>
                </center>
              </div>
            </div>
            {/* <!-- Articles List --> */}
            <div className="dashboard">
              <div className="sidebar">
                <div className="sidebar__headTable">
                  <h6>Category</h6>
                </div>
                <ul>
                  <li id="letters" className="active">
                    <strong>Letters</strong>
                  </li>
                  <li id="parish-activities">
                    <strong>Parish Activities</strong>
                  </li>
                </ul>
              </div>
              <div className="contents">
                <div className="contents__group">
                  <div className="contents__headTable active" id="/Drafts">
                    <h6>Drafts</h6>
                  </div>
                  <div className="contents__headTable" id="/Articles">
                    <h6>Posts</h6>
                  </div>
                </div>
                <ul>
                  {draftsList.drafts?.length === 0 && <li>No Draft</li>}
                  {draftsList.drafts?.map((article, idx) => (
                    <DraftArticle key={idx} article={article} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modalOpen} onHide={closeModal}>
        <CategoryModal closeModal={closeModal} />
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getDraftList: (cateId) => getDraftList(dispatch, cateId),
  getArticles: (headId) => getArticles(dispatch, headId),
});

const mapStateToProps = (state) => ({
  draftsList: state.draftsList,
  deleteDraft: state.deleteDraft,
  articlesList: state.articlesList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleRepo);
