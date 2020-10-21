import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from 'next/head';
import { useRouter } from 'next/router'
import { postData } from "../../api";
import HeadSub from "./HeadSub";

const Navigation = ({ children }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const ck_login = async () =>{
    if(props.loginCheck == "on"){
        const form = new FormData();
        form.append("method", "proc_member_get_one");
        form.append("mb_token", localStorage.token);
        // JSON 데이터 저장
        const {data:{result}} = await postData(form);
        console.log(result);
        if(result == "N"){
            alert("로그인정보가 만료되었습니다.");
            router.push("/");
        }
    }
  }
  useEffect(() => {
    useCheckLogin();
  },[]);

  const useCheckLogin = () => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  const pagingHandler = event => {
    //event.preventDefault();
    if (isLogin) {
      localStorage.clear();
      document.location.href = "/";
    } else {
      router.push("/Login");
    }
  }
    
  return (
    <>
      <HeadSub />
      <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        <div className="container">
          <a className="navbar-brand" href="/"><img src="/images/logo.png" alt="쉐어딕" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="oi oi-menu"></span>
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active"><a href="/SearchOffice" className="nav-link">사무실 찾기</a></li>
              <li className="nav-item"><a href="/RegistOffice" className="nav-link">사무실 내놓기</a></li>
              <li className="nav-item"><a href="/FreePass" className="nav-link">프리패스</a></li>
              <li className="nav-item"><a href="/" className="nav-link">관심매물</a></li>
              <li className="nav-item"><a href="/Notification" className="nav-link">알림</a></li>
              <li className="nav-item"><a href="/Chatting" className="nav-link"><span>채팅</span></a></li>
              <li className="nav-item cta">
                <a href="#" onClick={pagingHandler} className="nav-link">
                  <span>{isLogin ? "로그아웃" : "로그인"}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
      <footer className="ftco-footer ftco-bg-dark ftco-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">사무실</h2>
                <ul className="list-unstyled">
                  <li><a href="#" className="py-2 d-block">찾기</a></li>
                  <li><a href="#" className="py-2 d-block">내놓기</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4 ">
                <h2 className="ftco-heading-2">회원가입</h2>
                <ul className="list-unstyled">
                  <li><a href="#" className="py-2 d-block">임차인 회원가입</a></li>
                  <li><a href="#" className="py-2 d-block">임대인 회원가입</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">소식</h2>
                <ul className="list-unstyled">
                  <li><a href="#" className="py-2 d-block">각종 TIP</a></li>
                  <li><a href="#" className="py-2 d-block">이벤트</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">고객센터</h2>
                <div className="list-unstyled">
                  <li><a href="/bbs/board.php?bo_table=notice" className="py-2 d-block">공지사항</a></li>
                  <li><a href="/bbs/faq.php?fm_id=1" className="py-2 d-block">자주 묻는 질문</a></li>
                  <li><a href="#" className="py-2 d-block">서비스 이용 안내</a></li>
                  <li><a href="#" className="py-2 d-block">약관보기</a></li>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="ftco-footer-widget mb-4">
                <h2 className="ftco-heading-2">SHARE DIC</h2>
                <div className="list-unstyled">
                  <li><a href="#" className="py-2 d-block">회사소개</a></li>
                  <li><a href="#" className="py-2 d-block">오시는 길</a></li>
                  <li><a href="#" className="py-2 d-block">제휴문의</a></li>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-left">
              <p className="foot_p1">대표이사 : ooo <br/>사업자 등록번호 : 123-45-67890 ㅣ 통신판매업신고번호 : 제2020서울 강남 12345호 <br/> 주소 : 사업자주소표기 <br/> 고객센터 : 평일10:00~15:30토/일요일/공휴일 휴무 <br/>
                광고문의 : 02-1234-5678 ㅣ 메일문의 : urchoco@naver.com</p>
              <p className="foot_p2">CopyrightⓒShareDIC All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Navigation;