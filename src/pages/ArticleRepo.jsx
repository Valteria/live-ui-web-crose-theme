import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ArticleListItem from "./ArticleListItem";
import { connect } from "react-redux";
import { createNewArticle } from "../store/dispatch/dispatch";
import "../css/ArticleRepo.css";

const articleContent = [
  {
    image: "http://hvmatl.net/gallery/img/articles/article-logo.png",
    title: "Title-Test",
    body: `Chúng ta đã bước vào Mùa Chay 2021 với Nghi thức Xức Tro và Ăn Chay. Chủ đề của Mùa Chay năm nay mà Đức Thánh Cha kêu mời chúng ta: “Này chúng ta lên Giêrusalem” (Mt 20:18), và Mùa Chay là thời gian làm tươi mới Niềm tin, Hy vọng và Tình yêu.
    
        Trong hành trình Mùa Chay năm nay, Đức Thánh Cha kêu mời chúng ta thực hiện các việc: Ăn chay, cầu nguyện và bố thí, như lời rao giảng của Chúa Giêsu (x. Mt 6, 1-18), là điều kiện giúp chúng ta hoán cải và thể hiện sự hoán cải. Nẻo đường khó nghèo và bỏ mình (ăn chay), quan tâm và yêu thương chăm sóc người nghèo (bố thí), và như trẻ thơ trò chuyện với Chúa Cha (cầu nguyện) làm cho chúng ta có thể sống đức tin chân thành, đức cậy sống động và đức ái tích cực. Sứ điệp có ba điểm chính:
        
        1. Đức tin mời gọi chúng ta chấp nhận sự thật và làm chứng cho sự thật trước Thiên Chúa và trước toàn thể anh chị em mình. Thiên Chúa là Đấng khởi sự công cuộc ơn cứu độ. Ngài sai Con Một của Ngài là Đức Kitô xuống trần gian, mang lấy thân phận con người của chúng ta, ngay cả trong những giới hạn, Người đã làm cho chính mình trở nên con đường dẫn đến sự sống viên mãn. Được kinh nghiệm như một hình thức tự hủy, việc ăn chay sẽ giúp cho những ai thực hành với tâm hồn đơn sơ tái khám phá ân huệ của Thiên Chúa và nhận ra rằng sự thành toàn của mình là ở nơi Thiên Chúa bởi lẽ con người được dựng nên theo hình ảnh và giống với Người. Cùng với kinh nghiệm về sự khó nghèo, người ăn chay làm cho chính mình trở nên nghèo với người nghèo và tích lũy kho báu của tình yêu vừa đón nhận vừa chia sẻ. Được hiểu và thực hành như thế, ăn chay giúp chúng ta yêu mến Thiên Chúa và tha nhân, vì yêu mến.
        
        Mùa Chay là thời gian để tin tưởng, nghĩa là để đón tiếp Thiên Chúa vào cuộc đời chúng ta và ưng thuận để Người “ở lại” với chúng ta (x. Ga 14, 23). Ăn chay giải thoát chúng ta khỏi tất cả những gì xâm chiếm cuộc đời chúng ta, như khỏi chủ nghĩa tiêu thụ và thừa mứa thông tin (cả thông tin thật lẫn thông tin giả), để mở lòng ra với Đấng đến với chúng ta, Người nghèo khó trong mọi sự nhưng “đầy tràn ân sủng và sự thật” (Ga 1, 14): Người là Con Thiên Chúa, Đấng Cứu Độ chúng ta.
        
        2. Niềm hy vọng như “nước hằng sống” cho phép chúng ta tiếp tục hành trình
        Người phụ nữ Samari mà Chúa Giêsu xin nước uống bên giếng đã không hiểu khi Chúa Giêsu nói rằng Người có thể cho bà “nước hằng sống” (Ga 4,10). Một cách tự nhiên, bà nghĩ rằng Người đề cập đến nước vật chất, nhưng Chúa Giêsu có ý nói về Chúa Thánh Thần, Đấng mà Người sẽ ban dồi dào qua mầu nhiệm Vượt qua, Đấng tuôn đổ trên chúng ta niềm hy vọng không gây thất vọng.
        
        Trong hoàn cảnh lo âu hiện nay, khi mọi việc có vẻ mong manh và bấp bênh, thì việc nói về niềm hy vọng dường như là một thách đố. Nhưng Mùa Chay chắc chắn là mùa hy vọng, khi chúng ta quay trở lại với Thiên Chúa là Đấng vẫn tiếp tục nhẫn nại để chăm sóc thụ tạo của Người, đang khi chúng ta lại thường ngược đãi (x. TĐ. Laudato si’, 32-33; 43-44). Thánh Phaolô thúc giục chúng ta đặt niềm hy vọng nơi việc hòa giải: “Hãy giao hòa với Thiên Chúa” (2Cor 5,20). Bằng cách đón nhận ơn tha thứ trong bí tích vốn là trọng tâm quá trình hoán cải của chúng ta, đến lượt mình, chúng ta có thể lan truyền ơn tha thứ cho người khác.
        
        Qua việc tĩnh tâm và thinh lặng cầu nguyện, chúng ta được ban cho có niềm hy vọng như sự cảm hứng và ánh sáng nội tâm, soi sáng những thử thách và những chọn lựa trong sứ vụ của mình. Vì thế, tĩnh tâm cốt yếu là để cầu nguyện (x. Mt 6,6) và để gặp gỡ, trong nơi kín ẩn, Thiên Chúa Cha đầy nhân ái dịu dàng.
        
        Sống Mùa Chay trong niềm hy vọng có nghĩa là ý thức rằng, trong Chúa Giêsu Kitô, chúng ta là những chứng nhân của thời đại mới, nơi mà Thiên Chúa “đổi mới mọi sự” (x. Kh 21,5).
        
        3. Theo bước Chúa Kitô, trong việc quan tâm và động lòng thương mọi người, tình yêu là biểu hiện cao nhất của đức tin và niềm hy vọng của chúng ta.
        
        Tình yêu vui mừng khi thấy người khác lớn lên. Vì vậy nó đau khổ khi người khác đau khổ, cô đơn, bệnh tật, vô gia cư, bị khinh thường hoặc thiếu thốn. Tình yêu là bước nhảy vọt của con tim, đưa chúng ta ra khỏi chính mình và tạo nên mối liên kết chia sẻ và hiệp thông.
        
        Nguyện xin Đức Maria, Mẹ Chúa Cứu Thế và cũng là Mẹ các tín hữu, đứng dưới chân thánh giá và ở trong lòng Giáo Hội, nâng đỡ chúng ta bằng sự hiện diện đầy yêu thương của Mẹ. Nguyện xin phúc lành của Chúa Phục Sinh đồng hành với chúng ta trong hành trình hướng về ánh sáng Phục Sinh.
        
        4. Năm nay Giáo Xứ không có hòa giải chung, nên xin mọi người sắp xếp thời gian để làm hòa với Thiên Chúa qua bí tích Hòa giải. Việc Hòa giải năm nay được nhấn mạnh trên khía cạnh gia đình như giáo hội thu nhỏ, hơn là cá nhân hay tập thể chung chung. Khi cha mẹ, con cái cùng sắp xếp thời gian và  có thể lên lịch hẹn với quý cha để cùng lãnh nhận bí tích hòa giải trong sự chuẩn bị, trong thanh thản, và nhất là trong sự tin tưởng tuyệt đối vào Tình Thương và Sự quan phòng đầy tình phụ tử của Thiên Chúa.
        
        Hiệp nhất trong an bình của Đức Kitô,
        Lm. G.B Pham Nguyễn Tuấn Anh
        `,
    date: "2021-02-20",
  },
];

function ArticleRepo() {
  return (
    <div>
      <Header />
      <div class="events-area section-padding-100">
        <div class="container">
          <div class="row articles-container">
            {/* <!-- Articles Title --> */}
            <div class="col-12">
              <div class="events-title">
                <center>
                  <h2>Repository Draft</h2>
                </center>
                <center>
                  <Link
                    className="btn btn-success mb-3"
                    to="/write-article"
                    onClick={() => createNewArticle()}
                  >
                    New Article
                  </Link>
                </center>
              </div>
            </div>
            {/* <!-- Articles List --> */}
            <div className="dashboard">
              <div className="sidebar">
                <h6>Category</h6>
                <ul>
                  <li className="active">
                    <strong>Parish Activities</strong>
                  </li>
                  <li>
                    <strong>Letters</strong>
                  </li>
                </ul>
              </div>
              <div className="contents">
                <h6>Articles</h6>
                <ul>
                  <li>
                    <strong>
                      Article 1asf asf sf asf sa fda sf a sf as as f asf sa f sd
                      dsf
                    </strong>
                    <div className="buttons-group">
                      <button>
                        <i className="fa fa-eye"></i>
                      </button>
                      <button>
                        <i className="fa fa-paper-plane"></i>
                      </button>
                      <button>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </li>
                  <li>
                    <strong>
                      Article 1asf asf sf asf sa fda sf a sf as as f asf sa f sd
                      dsf
                    </strong>
                    <div className="buttons-group">
                      <button>
                        <i className="fa fa-eye"></i>
                      </button>
                      <button>
                        <i className="fa fa-paper-plane"></i>
                      </button>
                      <button>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </li>
                  <li>
                    <strong>
                      Article 1asf asf sf asf sa fda sf a sf as as f asf sa f sd
                      dsf
                    </strong>
                    <div className="buttons-group">
                      <button>
                        <i className="fa fa-eye"></i>
                      </button>
                      <button>
                        <i className="fa fa-paper-plane"></i>
                      </button>
                      <button>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchProps = (dispatch) => ({
  createNewArticle: () => {
    dispatch(createNewArticle());
  },
});

export default connect(null, mapDispatchProps)(ArticleRepo);
