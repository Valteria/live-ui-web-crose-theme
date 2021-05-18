import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  convertFromHTML,
  Editor as EditorOrigin,
} from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/WriteArticle.css";
import draftToHtml from "draftjs-to-html";
import { connect } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import { getDraftContent, saveUpdateDraft } from "../store/dispatch/dispatch";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

function WriteArticle({
  match,
  createDraft,
  history,
  getDraftContent,
  draftContent,
  saveUpdateDraft,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
  const [image, setImage] = useState(
    "http://hvmatl.net/gallery/img/articles/article-logo.png"
  );
  const [newImage, setNewImage] = useState("");
  const [date, setDate] = useState(null);

  const draftId = match.params.id;

  const { loading, draft } = draftContent;

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setContent(editorState.getCurrentContent());
  };

  useEffect(() => {
    getDraftContent(draftId);
  }, [getDraftContent, draftId]);

  const saveArticle = () => {
    let contentState = editorState.getCurrentContent();
    const article = {
      title: title,
      content: convertToRaw(contentState),
      date: date,
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
                  <div className="article__description-words">
                    <EditorOrigin
                      toolbarHidden
                      readOnly
                      editorState={editorState}
                      placeholder="Desciption will be here..."
                    />
                  </div>
                </div>
              </div>
            ) : (
              <h3 style={{ textAlign: "center" }}>Parish Activities</h3>
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
                onClick={() => history.push("/article-repo")}
                variant="secondary"
              >
                <i className="fa fa-arrow-left"></i>
              </Button>

              <Button
                className="button-preview"
                variant="success"
                onClick={saveArticle}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle);
