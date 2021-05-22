//TODO: Working on this
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { getArticleContent } from "../store/dispatch/dispatch";
import LoadingBox from "../components/LoadingBox";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

const ArticleDetail = ({ match, getArticleContent, articleContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { loading, article } = articleContent;
  const id = match.params.id;
  useEffect(() => {
    getArticleContent(id);
  }, [getArticleContent, id]);

  useEffect(() => {
    if (article) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(article.content))
        )
      );
    }
  }, [article]);

  return (
    <div>
      <Header />
      {loading && <LoadingBox />}
      {!article ? (
        <h1>Article does not exist</h1>
      ) : (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: "<!-- ##### Blog Content Area Start ##### -->",
            }}
          />
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
                        <h2 class="post-title">{article.title}</h2>
                        <Editor
                          readOnly
                          toolbarHidden
                          editorState={editorState}
                        />
                      </div>
                    </div>
                    {/* <!-- Post Details Area End --> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- ##### Blog Content Area End ##### --> */}
        </>
      )}

      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getArticleContent: (id) => getArticleContent(dispatch, id),
});

const mapStateToProps = (state) => ({
  articleContent: state.articleContent,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
