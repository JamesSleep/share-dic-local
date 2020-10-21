import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { postData } from "../api";
import Navigation from "../src/components/Navigation";

const SearchOffice = () => {
  const Router = useRouter();
  const [officeList, setOfficeList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const form = new FormData();
    form.append("method", "proc_office_list");
    /* form.append("keys[0]", "of_sectors");
    form.append("values[0]", "부동산");
    form.append("likes[0]", "Y");
    form.append("keys[1]", "of_address");
    form.append("values[1]", "서울");
    form.append("likes[1]", "Y"); */
    form.append("of_address_lat", "129.039685");
    form.append("of_address_lng", "35.160967");
    form.append("offset", "10");
    form.append("page", "1");

    const { data: list } = await postData(form);
    //console.log(list);
    setOfficeList(list);
  }

  const translationTag = (text="") => {
    const textArray = text.split("#");
    const len = textArray.length; 
    let result = "";

    for (let i=0; i<len; i++) {
      if (textArray[i + 1] === "" || i === len -2) {
        result += textArray[i];
        break;
      }
      result += textArray[i] + ',';
    }
    return result;
  }

  const pageHandler = (event, id) => {
    event.preventDefault();
    document.location.href = `/OfficeDetail/?id=${id}`;
  }

  return (
    <Navigation>
      <Head>
        <link rel="stylesheet" href="/css/style.css" />
        <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/templatemo-style.css" />
        <link rel="stylesheet" href="/assets/css/owl.css" />
        <link rel="stylesheet" href="/css/local/SearchOffice.css" />
      </Head>
      <div className="is-preload">
        <div id="wrapper">
          <div id="main"></div>
          <div id="sidebar" className="sidebar_cls">
            <div className="search_wrap">
              <div className="sch-bar">
                <div className="wrap">
                  <input type="text" name="t_search" id="t_search" className="clearable" placeholder="건물명, 주소, 지하철역 입력" />
                  <button type="button" id="search.keyword.submit" className="go btn_search">검색</button>
                </div>
              </div>
            </div>
            <div className="card-ui-box">
              <div id="info_search.place" className="search_place">
                <div className="search_title">
                  <h className="place_tit">[서울/강남역] 주변 매물 총 </h>
                  <span className="cutwrap">
                    <h id="info.search_place.cnt" className="cnt">20</h>
                  </span>
                  <div className="search_place_sel_box search_box">
                    <select name="search_place_sel" className="sel sh_psel">
                      <option value="">구분 선택</option>
                      <option value="12">입주</option>
                      <option value="6">이슈</option>
                      <option value="9">건물소식</option>
                      <option value="10">프로모션</option>
                      <option value="11">리테일</option>
                      <option value="13">임대정보</option>
                      <option value="14">매매정보</option>
                      <option value="99">기타</option>
                    </select>
                    <select name="search_place_sel" className="sel sh_psel">
                      <option value="">구분 선택</option>
                      <option value="12">입주</option>
                      <option value="6">이슈</option>
                      <option value="9">건물소식</option>
                      <option value="10">프로모션</option>
                      <option value="11">리테일</option>
                      <option value="13">임대정보</option>
                      <option value="14">매매정보</option>
                      <option value="99">기타</option>
                    </select>
                  </div>
                </div>
                <div className="search_place_list_wrap">
                  <div className="search_place_list">
                    <ul>
                      <div>
                        {
                          officeList.map(office => (
                            <li key={office.of_idx} className="search_place_click">
                              <a href="#" onClick={event=>pageHandler(event, office.of_idx)}>
                                <div className= "img_area">
                                  <img src={`https://softer052.cafe24.com/data/img/${office.of_img}`} />
                                  { office.of_system === "003" & (
                                    <div className="tag_text">
                                      <span className="premium">프리패스</span>
                                    </div>
                                  )}
                                </div>
                                <div className="search_place_into">
                                  <span className="place_into_text p_in_text">
                                    2인 좌석 수용인원 {office.of_member_all}명
                                  </span>
                                </div>
                                <div className="search_place_title">
                                  <span className="place_title_text p_title_text">
                                    월세 {`${office.of_deposit}/${office.of_monthly}`}
                                  </span>
                                </div>
                                <div className="search_place_Contents">
                                  <span className="place_Contents_text">
                                    {translationTag(office.of_keyword)}<br/>
                                    {translationTag(office.of_option)}
                                  </span>
                                </div>
                              </a>
                            </li>
                          ))
                        }
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="assets/js/browser.min.js"></script>
        <script src="assets/js/breakpoints.min.js"></script>
        <script src="assets/js/transition.js"></script>
        <script src="assets/js/owl-carousel.js"></script>
        <script src="assets/js/custom.js"></script>
      </div>
    </Navigation>
  )
}

export default SearchOffice;