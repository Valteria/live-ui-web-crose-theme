import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { connect, useDispatch } from "react-redux";
import { getDraftList } from "../store/dispatch/dispatch";
import "../css/ArticleRepo.css";
import DraftArticle from "../components/DraftArticle";
import { Button, Modal } from "react-bootstrap";
import CategoryModal from "../components/CategoryModal";
import { DELETE_DRAFT_RESET } from "../store/actionType";

function ArticleRepo({ getDraftList, draftsList, deleteDraft }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [cateId, setCateId] = useState("letters");
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalOpen(false);
  };

  const { success } = deleteDraft;

  useEffect(() => {
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

    if (success) {
      dispatch({ type: DELETE_DRAFT_RESET });
    }

    getDraftList(cateId);
  }, [cateId, getDraftList, success, dispatch]);

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
                <h6>Category</h6>
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
                <h6>Articles</h6>
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
});

const mapStateToProps = (state) => ({
  draftsList: state.draftsList,
  deleteDraft: state.deleteDraft,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleRepo);
