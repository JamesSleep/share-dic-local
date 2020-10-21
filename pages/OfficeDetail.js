import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navigation from "../src/components/Navigation";
import { postData } from "../api";

const OfficeDetail = (props) => {
  const Router = useRouter();
  const [id, setId] = useState("");
  const [officeInfo, setOfficeInfo] = useState();
  const [keyword, setKeyword] = useState([]);
  const [option, setOption] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { search } = location;
    const searchArray = search.split("?");
    const paramArray = searchArray[1].split("=");
    setId(paramArray[1]);

    const form = new FormData();
    form.append("method", "proc_office_list");
    form.append("of_idx", paramArray[1]);

    const {
      data: { result, info }
    } = await postData(form);
    if (result === "Y") {
      setOfficeInfo(info);
    }
    const {
      of_keyword: keyword, of_option: option
    } = info;
    setKeyword(keyword.split("#"));
    setOption(option.split("#"));
    console.log(info);
  }

  return (
    <Navigation>
      <Head>
        <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/ionicons.min.css" />
        <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/icomoon.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/local/OfficeDetail.css" />
      </Head>
      <section className="ftco-section bg-light">
    	  <div className="container">
          <div className="row">
            <div className="col-md-12 ftco-animate">
              <div id="accordion">
                <div className="office_session_info">
                  <span className="office_number">
                    매물번호 : 123456789A123 id {id}
                  </span>
                  <span className="office_ico">
                    <i className="share_ico"><a href="#"><img src="/images/share.png" alt="공유하기" /></a></i>
                    <i className="siren_ico"><a href="#"><img src="/images/siren.png" alt="신고하기" /></a></i>
                  </span>
                  <table className="session2_wrap">
                    <th>이용방법</th>
                    <th>보증금/월세</th>
                    <th>프리패스 회원</th>
                    <th><span className="session2_btn1"><a href="#">임대인 문의하기</a></span></th>
                      <th><img src="/images/op_ico.png" alt="옵션" className="option_style" />옵션</th>
                    <tr>
                        <td>월세/1일/프리패스</td>
                        <td>{officeInfo?.of_deposit} / {officeInfo?.of_monthly} 만원 </td>
                        <td>예약 가능 </td>
                        <td><span className="session2_btn2"><a href="#">관심 매물로 등록</a></span></td>
                        <td><span className="session2_btn2"><a href="#">옵션선택</a></span></td>
                    </tr>
                  </table>
                  <table className="session2_2_wrap">
                    <tr>
                      <td>좌석 수 : 2인 ({officeInfo?.of_member_all}인 사무실)</td>
                      <td>지역 : 서울시 강남구</td>
                      <td>전용 면적 : {(Number(officeInfo?.of_area)*3.31).toFixed(2)}m2 </td>
                      <td>옵션 : {option.length}개 </td>
                      <td>키워드 : {keyword.length}개 </td>
                    </tr>
                  </table>
                  <table className="session2_3_wrap">
                    <div className="ses_wrp">
                      <div className="session2_3_block_big"></div>
                      <div className="session2_3_block"></div>
                      <div className="session2_3_block ses2_3_b"></div>
                      <div className="session2_3_block ses2_3_b"></div>
                      <div className="session2_3_block">
                        <div className="session2_3_block_add">
                          <i className="add_ico"><img src="/images/+.png" alt="+" /></i>
                          <h className="add_text">사진 더보기</h>
                        </div>
                      </div>
                    </div>
                  </table>
                  <div className="session3_wrap">
                    <div className="session3_table">
                      <div className="session3_table_title">키워드</div>
                      <div className="session3_table_text">
                        { keyword.map((tag, index) => (
                          <h key={index} className="session3_text_tag_1">{`#${tag}`}</h>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="session3_table">
                    <div className="session3_table_title">임대인 한마디</div>
                    <div className="session3_table_text">
                      {officeInfo?.of_memo}
                    </div>
                  </div>
                  <div className="session3_table">
                    <div className="session3_table_title">옵션</div>
                    <div className="session3_table_text">
                      { option.map((tag, index) => (
                        <h key={index} className="session3_text_tag_2">{`#${tag}`}</h>
                      ))}
                    </div>
                  </div>
                  <div className="session3_table">
                    <div className="session3_table_title">위치 안내</div>
                    <div className="loce">
                      <div className="session3_location_text">
                        <div className="loce_txt">
                          <i className="location_ico"><img src="/images/location.png" /></i>
                          {officeInfo?.of_address}
                        </div>
                        <div className="session3_table_map">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="session3_table">
                    <div className="session3_table_title">이용자 리뷰</div>
                    <div>
                      <div className="session3_review_wrap ses3_rv_wrp" >
                        <span className="session3_review_text">총 <strong className="ses3_rv_txt_str">2</strong>건의 리뷰가 있습니다. </span>
                        <ul className="session3_review_cate">
                          <li className="review_cate"><a href="#">최신순 </a>ㅣ</li>
                          <li className="review_cate"><a href="#"> 평점 높은 순 </a>ㅣ</li>
                          <li className="review_cate"><a href="#">평점 낮은 순</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="session3_review_box">
                    <div className="session3_rate_wrap">
                      <span className="session3_rate">
                        <i className="icon-star"></i>
                        <i className="icon-star"></i>
                        <i className="icon-star"></i>
                        <i className="icon-star"></i>
                        <i className="icon-star-o"></i>
                      </span>
                      <span>
                        <div className="session3_rate_date">2020.09.01</div>
                      </span>
                    </div>
                  </div>
                  <div className="ses3_id_wrp">
                    <div className="session3_id_wrap">
                      {officeInfo?.mb_id}
                    </div>
                    <a href="#">
                      <ul className="session3_id_report">
                        <i className="siren_ico"><img src="/images/siren_b.png" alt="신고하기" /></i>
                        리뷰신고
                      </ul>
                    </a>
                  </div>
                  <div className="ses3_cont" >
                    <div className="session3_review_contents">
                      사용자가 작성한 리뷰의 전문이 표기되는 영역으로 사용됩니다. <br/>
                      리뷰는 img등록 + Text 입력방식으로 진행되며, 글자 수는 1,500자 이내, img등록은 필수 항목이 아닙니다.
                    </div>
                  </div>
                  <div className="session3_review_box">
                    <div className="session3_rate_wrap">
                      <span className="session3_rate">
                        <i className="icon-star"></i>
                        <i className="icon-star"></i>
                        <i className="icon-star"></i>
                        <i className="icon-star"></i>
                        <i className="icon-star-o"></i>
                      </span>
                      <span>
                        <div className="session3_rate_date">2020.09.01</div>
                      </span>
                    </div>
                  </div>
                  <div className="ses3_id_wrp">
                    <div className="session3_id_wrap">
                      urch*** @ naver.com
                    </div>
                    <ul className="session3_id_report">
                      <a href="#"> <i className="siren_ico"><img src="/images/siren_b.png" alt="신고하기" /></i>
                      리뷰신고
                      </a>
                    </ul>
                  </div>
                  <div className="ses3_cont">
                    <div className="session3_review_contents_img ses_wrp"></div>
                    <div className="session3_review_contents_img ses_wrp"></div>
                    <div className="session3_review_contents_img ses_wrp"></div>
                  </div>

                  <div className="row justify-content-start pb-3">
                    <div className="heading-section ftco-animate">
                      <h5 className="detail_page_new_office">이 지역의 다른 사무실</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="destination-slider owl-carousel ftco-animate">
                        <div className="item">
                          <div className="destination">
                            <a href="#" className="img d-flex justify-content-center align-items-center dets_1">
                              <span className="premium">
                                프리미엄
                              </span>
                              <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-search2"></span>
                              </div>
                            </a>
                            <div className="intro p-3">
                              <p>2인 좌석 수용인원 30명</p>
                            </div>
                            <div className="text p-3">
                              <h3><strong><a href="#">월세 400/50</a></strong></h3>
                              <span className="listing">강남역 도보3분,6층,엘리베이터 지문인식출입문,1층 편의점 24시간 운영건물</span>
                            </div>
                          </div>
                        </div>
                        <div className="item">
                          <div className="destination">
                            <a href="#" className="img d-flex justify-content-center align-items-center dets_2">
                              <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-search2"></span>
                              </div>
                            </a>
                            <div className="intro p-3">
                              <p>2인 좌석 수용인원 30명</p>
                            </div>
                            <div className="text p-3">
                              <h3><strong><a href="#">월세 400/50</a></strong></h3>
                              <span className="listing">강남역 도보3분,6층,엘리베이터 지문인식출입문,1층 편의점 24시간 운영건물</span>
                            </div>
                          </div>
                        </div>
                        <div className="item">
                          <div className="destination">
                            <a href="#" className="img d-flex justify-content-center align-items-center dets_3">
                              <span className="premium">
                                프리미엄
                              </span>
                              <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-search2"></span>
                              </div>
                            </a>
                            <div className="intro p-3">
                              <p>2인 좌석 수용인원 30명</p>
                            </div>
                            <div className="text p-3">
                              <h3><strong><a href="#">월세 400/50</a></strong></h3>
                              <span className="listing">강남역 도보3분,6층,엘리베이터 지문인식출입문,1층 편의점 24시간 운영건물</span>
                            </div>
                          </div>
                        </div>
                        <div className="item">
                          <div className="destination">
                            <a href="#" className="img d-flex justify-content-center align-items-center dets_4">
                              <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-search2"></span>
                              </div>
                            </a>
                            <div className="intro p-3">
                              <p>2인 좌석 수용인원 30명</p>
                            </div>
                            <div className="text p-3">
                              <h3><strong><a href="#">월세 400/50</a></strong></h3>
                              <span className="listing">강남역 도보3분,6층,엘리베이터 지문인식출입문,1층 편의점 24시간 운영건물</span>
                            </div>
                          </div>
                        </div>
                        <div className="item">
                          <div className="destination">
                            <a href="#" className="img d-flex justify-content-center align-items-center dets_5" >
                              <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-search2"></span>
                              </div>
                            </a>
                            <div className="intro p-3">
                              <p>2인 좌석 수용인원 30명</p>
                            </div>
                            <div className="text p-3">
                              <h3><strong><a href="#">월세 400/50</a></strong></h3>
                              <span className="listing">강남역 도보3분,6층,엘리베이터 지문인식출입문,1층 편의점 24시간 운영건물</span>
                            </div>
                          </div>
                        </div>
                        <div className="item">
                          <div className="destination">
                            <a href="#" className="img d-flex justify-content-center align-items-center dets_6">
                              <span className="premium">
                                프리미엄
                              </span>
                              <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-search2"></span>
                              </div>
                            </a>
                            <div className="intro p-3">
                              <p>2인 좌석 수용인원 30명</p>
                            </div>
                            <div className="text p-3">
                              <h3><strong><a href="#">월세 400/50</a></strong></h3>
                              <span className="listing">강남역 도보3분,6층,엘리베이터 지문인식출입문,1층 편의점 24시간 운영건물</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script src="/js/jquery.min.js"></script>
      <script src="/js/jquery-migrate-3.0.1.min.js"></script>
      <script src="/js/popper.min.js"></script>
      <script src="/js/bootstrap.min.js"></script>
      <script src="/js/jquery.easing.1.3.js"></script>
      <script src="/js/jquery.waypoints.min.js"></script>
      <script src="/js/jquery.stellar.min.js"></script>
      <script src="/js/owl.carousel.min.js"></script>
      <script src="/js/jquery.magnific-popup.min.js"></script>
      <script src="/js/aos.js"></script>
      <script src="/js/jquery.animateNumber.min.js"></script>
      <script src="/js/bootstrap-datepicker.js"></script>
      <script src="/js/scrollax.min.js"></script>
      <script src="/js/main.js"></script>
    </Navigation>
  )
}

export default OfficeDetail;