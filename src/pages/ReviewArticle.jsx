import React, { useEffect, useState } from "react";
import "../css/ReviewArticle.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { connect, useDispatch } from "react-redux";
import {
  deleteRepo,
  getDraftContent,
  postArticle,
} from "../store/dispatch/dispatch";
import LoadingBox from "../components/LoadingBox";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
import { Button } from "react-bootstrap";
import { POST_ARTICLE_RESET } from "../store/actionType";
import { Modal } from "react-bootstrap";

function ReviewArticle({
  getDraftContent,
  match,
  draftContent,
  history,
  postArticle,
  articlePublished,
  deleteRepo,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { loading, draft } = draftContent;
  const { loading: loadingPublish, success: successPublish } = articlePublished;
  const [postModal, setPostModal] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getDraftContent(match.params.id);
    if (successPublish) {
      deleteRepo(match.params.id);
      history.push("/article-repo");
      dispatch({ type: POST_ARTICLE_RESET });
    }
  }, [
    match.params.id,
    getDraftContent,
    successPublish,
    deleteRepo,
    history,
    dispatch,
  ]);

  useEffect(() => {
    if (draft && draft?.content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(draft.content)))
      );
    }
    if (isPost) {
      postArticle(draft);
    }
  }, [draft, isPost, postArticle]);

  const postModelClose = () => {
    setPostModal(false);
  };

  return (
    <div>
      <Header />
      <div className="reviewArticle__container">
        {loading && <LoadingBox />}
        {draft && (
          <section class="blog-content-area section-padding-100">
            <div class="container">
              <div class="row justify-content-between">
                {/* <!-- Blog Posts Area --> */}
                <div class="col-12 col-lg-12">
                  <div class="blog-posts-area">
                    {/* <!-- Post Details Area Start --> */}

                    <div class="single-post-details-area">
                      {/* <!-- <div class="post-thumbnail mb-30 col-12 col-lg-2"><img src="" alt=""></div> --> */}

                      <div class="post-content col-12 col-lg-auto">
                        {draft.isLetters ? (
                          <h2 class="post-title">{draft.title}</h2>
                        ) : (
                          <h2 class="post-title">Parish Activies</h2>
                        )}
                        <Editor
                          readOnly
                          toolbarHidden
                          editorState={editorState}
                        />
                      </div>
                    </div>
                    {/* <!-- Post Details Area End --> */}
                  </div>
                  <div className="reviewArticle__buttonGroup">
                    <Button
                      variant="primary"
                      onClick={() =>
                        history.push(`/write-article/${draft._id}`)
                      }
                    >
                      Editor
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => history.push(`/article-repo`)}
                    >
                      Repository
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => setPostModal(true)}
                    >
                      {loadingPublish ? <LoadingBox /> : "Post"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={postModal} onHide={postModelClose}>
              <Modal.Header>
                <div>
                  Are you wanting to post{" "}
                  <b>
                    <i>{draft.title ? draft.title : draft.date}.</i>
                  </b>
                </div>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="primary" onClick={postModelClose}>
                  Cancel
                </Button>
                <Button variant="success" onClick={() => setIsPost(true)}>
                  Post
                </Button>
              </Modal.Footer>
            </Modal>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  draftContent: state.draftContent,
  articlePublished: state.articlePublished,
});

const mapDispatchToProps = (dispatch) => ({
  getDraftContent: (draftId) => getDraftContent(dispatch, draftId),
  postArticle: (draft) => postArticle(dispatch, draft),
  deleteRepo: (draftId) => deleteRepo(dispatch, draftId),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewArticle);
