import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { getArticles } from "../store/dispatch/dispatch";
import LoadingBox from "../components/LoadingBox";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

const ActivitiesPage = ({ getArticles, match, articlesList }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { loading, articles } = articlesList;
  const category = match.path;
  useEffect(() => {
    getArticles(category);
  }, [getArticles, category]);

  useEffect(() => {
    if (articles) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(articles.content))
        )
      );
    }
  }, [articles]);

  return (
    <>
      <Header />
      <section className="section-padding-25">
        <h2 className="section-heading">Sinh Hoạt Giáo Xứ</h2>
        {loading && <LoadingBox />}
        {articles && (
          <Editor readOnly toolbarHidden editorState={editorState} />
        )}
      </section>
      <Footer />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getArticles: (category) => getArticles(dispatch, category),
});

const mapStateToProps = (state) => ({
  articlesList: state.articlesList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesPage);
