import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/WriteArticle.css";

import { connect, useDispatch } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import { getDraftContent, saveUpdateDraft } from "../store/dispatch/dispatch";
import { Button } from "react-bootstrap";
import UploadImageToCloud from "../components/UploadImageToCloud";
import { SAVE_DRAFT_RESET } from "../store/actionType";

function WriteArticle({
  match,
  history,
  getDraftContent,
  draftContent,
  saveUpdateDraft,
  draftUpdated,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(
    "http://hvmatl.net/gallery/img/articles/article-logo.png"
  );
  const [newImage, setNewImage] = useState("");
  const [date, setDate] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const dispatch = useDispatch();

  const { loading, draft } = draftContent;
  const { success, draft: updatedDraft } = draftUpdated;
  console.log(draftUpdated);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    if (!articleId || articleId !== match.params.id) {
      setArticleId(match.params.id);
    }

    getDraftContent(match.params.id);
  }, [getDraftContent, articleId, match.params.id]);

  useEffect(() => {
    if (draft && draft?.content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(draft.content)))
      );
      setTitle(draft.title);
      setDate(draft.date);
      setImage(draft.image);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [draft]);

  useEffect(() => {
    if (success) {
      history.push(`/article-review/${updatedDraft._id}`);
      dispatch({ type: SAVE_DRAFT_RESET });
    }
  }, [success, history, updatedDraft, dispatch]);

  const saveArticle = () => {
    const article = {
      title: draft.isLetters ? title : null,
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      date: date,
      image: draft.isLetters ? image : null,
      _id: articleId,
    };
    saveUpdateDraft(article);
  };

  const handleChangeUrl = () => {
    if (newImage) {
      setImage(newImage);
      document
        .querySelector(".article__img-inputURL")
        .classList.remove("visible");
    }
  };

  const handleReviewBtn = () => {
    saveArticle();
  };

  const handleBackBtn = () => {
    saveArticle();
    history.push("/article-repo");
  };

  return (
    <div>
      <Header />
      {loading && <LoadingBox />}

      <div className="writeArticle">
        <div className="events-area">
          <div className="container article__controler">
            {draft?.isLetters ? (
              <div className="article__review">
                <div className="article__img">
                  <img src={image ? image : null} alt="" />
                  <div
                    className="article__img-upload"
                    onClick={() => {
                      document
                        .querySelector(".article__img-inputURL")
                        .classList.add("visible");
                    }}
                  >
                    <Button className="article__img-upload-btn">
                      <i className="fa fa-upload"></i>
                    </Button>
                  </div>
                  <div className="article__img-inputURL">
                    <input
                      type="text"
                      placeholder="Paste URL here"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                    />
                    <div className="article__img-groupBtn">
                      <Button
                        variant="danger"
                        onClick={() => {
                          document
                            .querySelector(".article__img-inputURL")
                            .classList.remove("visible");
                        }}
                      >
                        x
                      </Button>
                      <Button variant="success" onClick={handleChangeUrl}>
                        <i className="fa fa-save"></i>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="article__description">
                  <input
                    type="text"
                    required
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="article__description-title"
                  />
                  <input
                    type="text"
                    value={date}
                    placeholder={draft.date}
                    onChange={(e) => setDate(e.target.value)}
                    className="article__description-date"
                  />
                  <UploadImageToCloud />
                </div>
              </div>
            ) : (
              <div className="my-3">
                <h3 style={{ textAlign: "center" }}>Parish Activities</h3>
                <UploadImageToCloud />
              </div>
            )}
            <div className="article__editor">
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbarClassName="toolbar-class"
                onEditorStateChange={onEditorStateChange}
                placeholder="Enter your story..."
              />
            </div>
            <div className="group__button">
              <Button
                className="button-back"
                onClick={handleBackBtn}
                variant="secondary"
              >
                <i className="fa fa-arrow-left"></i>
              </Button>

              <Button
                className="button-preview"
                variant="success"
                onClick={handleReviewBtn}
              >
                <i className="fa fa-eye"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getDraftContent: (draftId) => getDraftContent(dispatch, draftId),
  saveUpdateDraft: (article) => saveUpdateDraft(dispatch, article),
});

const mapStateToProps = (state) => ({
  createDraft: state.createDraft,
  draftContent: state.draftContent,
  cloudImage: state.cloudImage,
  draftUpdated: state.draftUpdated,
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle);
