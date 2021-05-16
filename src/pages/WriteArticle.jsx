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
import { Button, FormControl, InputGroup } from "react-bootstrap";

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
    // setContent(convertToRaw(editorState.getCurrentContent()));
    getDraftContent(draftId);
  }, [getDraftContent, draftId]);

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
                  <img src={image ? image : null} alt="" />
                  <div className="article__img-input">
                    <InputGroup>
                      <FormControl
                        placeholder="Enter URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                      <InputGroup.Append>
                        <Button>
                          <i className="fa fa-save"></i>
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
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
                className="button-save"
                type="button"
                onClick={saveArticle}
                variant="primary"
              >
                Test Save
              </Button>
              <Button className="button-preview" variant="success">
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
});

const mapStateToProps = (state) => ({
  createDraft: state.createDraft,
  draftContent: state.draftContent,
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle);
