import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { connect } from "react-redux";

function ReviewArticle() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(ReviewArticle);
