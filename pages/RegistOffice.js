import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navigation from "../src/components/Navigation";
import Postcode from "../src/components/Postcode";
import { postData } from "../api";

const options = [
  "전자레인지", "냉장고", "도어락", "에어컨", "내부화장실",
  "외부화장실", "커피머신", "프린터", "FAX"
];

const RegistOffice = () => {
  const [visibility, setVisibility] = useState(false);
  const [registData, setRegistData] = useState({
    token: "" ,
    companyName: "",
    president: "",
    userName: "",
    userEmail: "",
    phoneNum: "",
    certification: "", //휴대폰 인증 번호
    category: "", // 사무실 등록 구분
    businessPaper: [], // 사업자 등록증
    zipcode: "",
    address1: "", 
    address2: "",
    officeNickname: "", 
    workStyle: "", // 업종
    totalFloor: "", // 전체 층 수
    myFloor: "", // 해당 층 수
    areaSize: "", // 면적
    headCount: "", // 인원 수
    leaseSystem: "", // 임대 방식
    recruitCount : "", // 모집인원
    businessRegist: null, // 사업자 등록 가능 여부
    deposit: "", // 보증금
    monthly: "", // 월세
    managementFee: "", // 관리비
    option: [],
    keyword: "",
    keywords: [],
    description: "",
    pictures: []
  });

  const setState = (property, event) => {
    if (property === "businessPaper" || property === "pictures") {
      setRegistData({
        ...registData,
        [property]: event.target.files
      });
    } else {
      setRegistData({
        ...registData,
        [property]: event.target.value
      });
    }
  }

  const setOption = event => {
    const { value, checked } = event.target;
    if (checked) {
      setRegistData({
        ...registData,
        option: [...registData.option, value]
      });
    } else {
      setRegistData({
        ...registData,
        option: registData.option.filter(prop => prop !== value)
      });
    }
  }

  const setKeywords = (event, params) => {
    event.preventDefault();
    const { value, checked } = params;
    if (checked) {
      setRegistData({
        ...registData,
        keywords: [...registData.keywords, value],
        keyword: ""
      });
    } else {
      setRegistData({
        ...registData,
        keywords: registData.keywords.filter(prop => prop !== value),
      });
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("userInformation"));
    if (!token || !userInfo) {
      alert("로그인이 필요한 기능입니다!");
      document.location.href = "/Login";
    } 
   
    setRegistData({
      ...registData,
      token,
      userName: userInfo.name,
      userEmail: userInfo.email
    });
  }

  const openPost = (event) => {
    event.preventDefault();
    setVisibility(!visibility);
  }

  const post = async event => {
    console.log(registData);
    event.preventDefault();

    let options = "", keywords = "";

    for (let i=0; i<registData.option.length; i++) {
      options += registData.option[i] + "#";
    }
    for (let i=0; i<registData.keywords.length; i++) {
      keywords += registData.keywords[i] + "#";
    }

    const form = new FormData();
    form.append("method", "proc_office_add");
    form.append("mb_token", registData.token);
    form.append("of_img", registData.pictures[0]);
    form.append("of_work_auth", registData.businessPaper[0]);
    form.append("of_cate", registData.category);
    form.append("of_address", registData.address1);
    form.append("of_memo", registData.description);
    form.append("of_zip", registData.zipcode);
    form.append("of_address_detail", registData.address2);
    form.append("of_name", registData.officeNickname);
    form.append("of_sectors", registData.workStyle);
    form.append("of_layer_all", registData.totalFloor);
    form.append("of_layer_this", registData.myFloor);
    form.append("of_area", registData.areaSize);
    form.append("of_member_all", registData.headCount);
    form.append("of_member_want", registData.recruitCount);
    form.append("of_system", registData.leaseSystem);
    form.append("of_work_ok", registData.businessRegist);
    form.append("of_deposit", registData.deposit);
    form.append("of_monthly", registData.monthly);
    form.append("of_man_price", registData.managementFee);
    form.append("of_option", options);
    form.append("of_keyword", keywords);

    const {
      data: { result, message }
    } = await postData(form);

    if (result === "Y") {
      alert("사무실 등록이 완료되었습니다");
      document.location.href = "/";
    } else {
      alert(message);
    }
  }

  return (
    <Navigation>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Alex+Brush" rel="stylesheet" />
        <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/ionicons.min.css" />
        <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/icomoon.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/local/RegistOffice.css" />
      </Head>
      <div className="hero-wrap hr_wrap" >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center" data-scrollax-parent="true">
            <div className="col-md-9 text-center">
              <h1 className="mb-3 bread m3_bread">사무실 등록하기</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ftco-animate">
              <div id="accordion">
                {/* 임대인 기본정보 */}
                <table className="question">
                  <caption className="qtit qt">임대인 기본정보</caption>
                    <tr>
                      <th className="th" scope="row" >회사명</th>
                      <td>
                        <input type="text" title="회사명" className="wid20" placeholder="회사명 입력" onChange={event=>setState("companyName", event)} />
                      </td>
                    </tr>
                    <tr>
                      <th className="th" scope="row">대표자 이름</th>
                      <td><input type="text" title="대표자 이름" className="wid20" placeholder="대표자 입력" onChange={event=>setState("president", event)} />
                      </td>
                    </tr>
                    <tr>
                      <th className="th" scope="row">회원 정보</th>
                      <td>
                        <input type="text" title="회원 이름" disabled value={registData.userName} className="wid20" /> <br/>
                        <input type="text" title="이메일" disabled value={registData.userEmail} className="wid53 text_ip"  /> <br/>
                        <input type="text" className="wid53 text_ip" title="휴대폰 번호" placeholder="휴대폰 번호 입력" onChange={event=>setState("phoneNum", event)} />
                        <span className="button"><a href="#">인증번호 받기</a></span>  <br/>
                        <input type="text" className="wid53 text_ip" title="인증번호 입력" placeholder="인증번호 입력" onChange={event=>setState("certification", event)} />
                      </td>
                    </tr>
                </table>
                {/* 사무실 정보 */}
                <table className="question">
                  <caption className="qtit">사무실 정보</caption>
                  <tr>
                    <th className="th" scope="row"> 등록 구분</th>
                    <td>
                      <select className="wid53" title="카테고리 선택" onChange={event=>setState("category", event)}>
                        <option value="">등록 구분선택</option>
                        <option value="001">월세</option>
                        <option value="002">프리패스</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">사업자 등록증</th>
                    <td className="file_input">
                      <input type="text" value={registData.businessPaper[0]?.name} className="wid53" readOnly />
                      <label>
                        파일 첨부하기
                        <input type="file" onChange={event=>setState("businessPaper", event)} />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">사무실 주소</th>
                    <td>
                      <input type="text" size="20" disabled value={registData.zipcode} />
                      <span className="button"><a href="#" onClick={event=>openPost(event)}>우편번호찾기</a></span><br/>
                      <input type="text" className="add wid53" disabled  name="address" id="address"  maxlength="80" value={registData.address1} />
                      <input type="text" title="상세 주소 입력" className="wid53 adr" placeholder= "상세 주소 입력" onChange={event=>setState("address2", event)} />
                      <Postcode visible={visibility} setVisible={setVisibility} setState={setRegistData} />
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">사무실 별명</th>
                    <td>
                      <input type="text" title="사무실 별명" className="wid53" placeholder= "사무실 별명 입력" onChange={event=>setState("officeNickname", event)} />
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row"> 업종 선택</th>
                    <td>
                      <select className="wid53" title="업종 선택" onChange={event=>setState("workStyle", event)}>
                        <option value="">업종 선택</option>
                        <option value="1">업종1</option>
                        <option value="2">업종2</option>
                        <option value="3">업종3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row" >층 수</th>
                    <td>
                      <input type="text" title="전체 층" className="wid20" placeholder="전체 층" onChange={event=>setState("totalFloor", event)}/>
                      <input type="text" title="해당 층" className="wid20" placeholder="해당 층" onChange={event=>setState("myFloor", event)}/>
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row" >면적</th>
                    <td>
                      <input type="text" title="평" className="wid20" onChange={event=>setState("areaSize", event)} />  평
                      <input type="text" title="전용 면적" className="wid20" placeholder="전용 면적"  /> m²
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row" >전체 인원</th>
                    <td>
                      <input type="text" title="인원" className="wid20" onChange={event=>setState("headCount", event)}  / > 명
                    </td>
                  </tr>
                </table>
                {/* 임대 정보 */}
                <table className="question">
                  <caption className="qtit">임대 정보</caption>
                  <tr>
                    <th className="th" scope="row"> 임대 방식</th>
                    <td>
                      <select className="wid53" title="임대방식 선택" onChange={event=>setState("leaseSystem", event)}>
                        <option value="">임대방식 선택</option>
                        <option value="001">일일</option>
                        <option value="002">월대여</option>
                        <option value="003">프리패스</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">모집인원</th>
                    <td>
                      <input type="text" title="모집인원" className="wid53" onChange={event=>setState("recruitCount", event)} /> 명
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row"> 사업자 등록</th>
                    <td>
                      <select className="wid53" title="=사업자 등록 여부" onChange={event=>setState("businessRegist", event)}>
                        <option value="">사업자등록 가능 여부 선택</option>
                        <option value="001">가능</option>
                        <option value="002">불가능</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">보증금</th>
                    <td>
                      <input type="text" title="보증금" className="wid53" placeholder="보증금 입력" onChange={event=>setState("deposit", event)} /> 만원
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">월세</th>
                    <td>
                      <input type="text" title="월세" className="wid53" placeholder="월세 입력" onChange={event=>setState("monthly", event)} /> 만원
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">관리비</th>
                    <td>
                      <input type="text" title="관리비" className="wid53" placeholder="관리비 입력" onChange={event=>setState("managementFee", event)} /> 만원
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">옵션</th>
                    <td>
                      {
                        options.map((option, index) => (
                          <label key={index}>
                            <input type="checkbox" name="re_course" id="program_0" value={option} onChange={event=>setOption(event)} />
                              {` ${option}`}
                          </label>
                        ))
                      }
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">키워드 </th>
                    <td>
                      <input type="text" title="키워드" value={registData.keyword} className="wid53" placeholder= "키워드 입력" onChange={event=>setState("keyword", event)} />
                      <span className="button">
                        <a href="#" onClick={event=>setKeywords(event, { value: registData.keyword, checked: true })}>
                          키워드 추가
                        </a>
                      </span> <br/>
                      *좌석 계약 시 사용할 수 있는 비품이나 이용할 수 있는 시설 등을 입력하실 수 있습니다.<br/>
                      *옵션은 최대 15개까지 입력 가능합니다.<br/>
                      {
                        registData.keywords.map((key, index) => (
                          <label key={index}>
                            {key}
                            <a href="#" onClick={event=>setKeywords(event, { value: key, checked: false })}> X</a>
                          </label>
                        ))
                      }
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">임대인 한마디</th>
                    <td>
                      <input type="text" title="모집인원" className="wid53_box" placeholder= "임대인 한마디 입력" onChange={event=>setState("description", event)} />
                    </td>
                  </tr>
                  <tr>
                    <th className="th" scope="row">사진 등록</th>
                    <td className="file_input">
                    <input type="text" value={registData.pictures[0]?.name} className="wid53" readOnly />
                      <label>
                        파일 첨부하기
                        <input type="file" onChange={event=>setState("pictures", event)} />
                      </label> <br/>
                      *사무실 사진은 1장 이상 필수로 등록되어야 하며, 최대 6장까지 등록 가능합니다.
                    </td>
                  </tr>
                </table>
                <div className="btngreen">
                  등록 신청된 사무실은 Share Dic 관리자가 직접 검증 후 사무실 목록에 등록됩니다. <br/>
                  정보 수정이 필요한 부분이 발생하면 관리자가 직접 SMS, E-mail 등으로 연락 드리겠습니다.
                  <a href="office_complete.html" onClick={event=>post(event)} className="Btn">신청하기</a>
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

export default RegistOffice;