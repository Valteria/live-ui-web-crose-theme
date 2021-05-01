import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../css/WriteArticle.css";
import draftToHtml from "draftjs-to-html";
import { useDispatch } from "react-redux";
import { dispatchArticle } from "../store/dispatch/dispatch";
import { connect } from "react-redux";

function WriteArticle() {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const [content, setContent] = useState();
  // const dispatch = useDispatch();

  useEffect(() => {
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  const saveArticle = () => {
    if (title) {
      dispatchArticle(title, content);
    }
  };

  return (
    <div>
      <Header />
      <div className="article__edition">
        <div className="events-area">
          <div className="container">
            <div className="article__title-img">
              <div className="article__title">
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

            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              toolbarClassName="toolbar-class"
              onEditorStateChange={onEditorStateChange}
              placeholder="Enter your story..."
            />
            <div className="group__button">
              <button
                className="button-save"
                type="button"
                onClick={saveArticle}
              >
                SAVE
              </button>
              <button className="button-preview" type="button">
                PREVIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  dispatchArticle: (title, content) =>
    dispatchArticle(dispatch, title, content),
});

export default connect(mapDispatchToProps)(WriteArticle);
