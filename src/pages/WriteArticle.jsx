import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/WriteArticle.css";
import draftToHtml from "draftjs-to-html";
import { connect } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import { getDraftContent } from "../store/dispatch/dispatch";

function WriteArticle({
  match,
  createDraft,
  history,
  getDraftContent,
  draftContent,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
  const [image, setImage] = useState(
    "http://hvmatl.net/gallery/img/articles/article-logo.png"
  );
  const draftId = match.params.id;

  const { loading, draft } = draftContent;

  useEffect(() => {
    setContent(convertToRaw(editorState.getCurrentContent()));
    getDraftContent(draftId);
  }, [editorState, getDraftContent, draftId]);

  const saveArticle = () => {
    let contentState = editorState.getCurrentContent();
    const article = { title: title, content: convertToRaw(contentState) };
  };

  return (
    <div>
      <Header />
      {loading && <LoadingBox />}

      <div className="writeArticle">
        <div className="events-area">
          <div className="container article__controler">
            {draft?.isLetters ? (
              <div className="article__title-img">
                <div className="article__title">
                  <h3 style={{ textAlign: "center" }}>Letters</h3>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="article__img">
                  <img
                    src="http://hvmatl.net/gallery/img/articles/article-logo.png"
                    alt=""
                  />
                  <input type="file" />
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
              <button
                className="button-save"
                type="button"
                onClick={() => history.push("/article-repo")}
              >
                <i className="fa fa-arrow-left"></i>
              </button>
              <button className="button-preview" type="button">
                <i className="fa fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getDraftContent: (draftId) => getDraftContent(dispatch, draftId),
});

const mapStateToProps = (state) => ({
  createDraft: state.createDraft,
  draftContent: state.draftContent,
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle);
