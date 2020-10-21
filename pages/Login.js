import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Navigation from "../src/components/Navigation";
import { postData } from "../api";

const Login = () => {
  const router = useRouter();
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const setState = (property, event) => {
    setLoginData({
      ...LoginData,
      [property]: event.target.value
    });
  }

  const post = async (event) => {
    // 로그인 JSON 폼 데이터 작성
    event.preventDefault();
    const form = new FormData();
    form.append("method", "proc_member_login");
    form.append("mb_id", LoginData.email);
    form.append("mb_password", LoginData.password);
    // JSON 데이터 저장
    const {
      data: { message, result, mb_token: token }
    } = await postData(form);
    // 상태 조회
    if (result === "0") {
      alert(message);
      return;
    }
    // 토큰값 저장
    localStorage.setItem("token", token);
    // 회원정보 JSON 폼 데이터 작성
    const form2 = new FormData();
    form2.append("method", "proc_member_get_one");
    form2.append("mb_token", token);
    // JSON 데이터 저장
    const {
      data : { 
        member: { mb_email ,mb_hp, mb_name }
      }
    } = await postData(form2);
    // 회원 정보저장
    localStorage.setItem("userInformation", JSON.stringify({
      "email": mb_email,
      "phone": mb_hp,
      "name": mb_name
    }));
    //router.push("/"); 랜더링 오류
    document.location.href = "/";
  }

  return (
    <Navigation>
      <Head>
        <link rel="stylesheet" href="/css/open-iconic-bootstrap.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/ionicons.min.css" />
        <link rel="stylesheet" href="/css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="/css/jquery.timepicker.css" />
        <link rel="stylesheet" href="/css/flaticon.css" />
        <link rel="stylesheet" href="/css/icomoon.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/local/Login.css" />
      </Head>
      <div className="wrapper login__container">
        <div id="mb_login" className="mbskin">
          <div className="mbskin_box">
            <div className="login_header"><img src="/images/login_logo.png" alt="쉐어딕" /></div>
            <form name="flogin" onSubmit={post} method="post">
              <input type="hidden" name="url" value="" />
              <fieldset id="login_fs">
                <legend>회원로그인</legend>
                <label for="login_id" className="sound_only">회원아이디<strong className="sound_only"> 필수</strong></label>
                <input type="text" name="mb_id" id="login_id" required className="frm_input required txt_id" size="20" maxLength="20" placeholder="아이디" onChange={event=>setState("email", event)} />
                <label for="login_pw" className="sound_only">비밀번호<strong className="sound_only"> 필수</strong></label>
                <input type="password" name="mb_password" id="login_pw" required className="frm_input required text_id" size="20" maxLength="20" placeholder="비밀번호" onChange={event=>setState("password", event)} />
                <button type="submit" className="btn_submit">로그인</button>
                <div id="login_info">
                  <div className="login_if_auto chk_box">
                    <input type="checkbox" name="auto_login" id="login_auto_login" className="selec_chk" />
                    <label for="login_auto_login"><span></span> 자동로그인</label>
                  </div>
                  <div className="login_if_lpl">
                    <a href="" target="_blank" id="login_password_lost">비밀번호가 기억나지 않으신가요? </a>
                  </div>
                </div>
              </fieldset>
            </form>
            <div id="sns_login" class="login-sns sns-wrap-32 sns-wrap-over">
              <h3>소셜계정으로 로그인</h3>
              <div class="sns-wrap">
                <a href="https://softer052.cafe24.com/plugin/social/popup.php?provider=naver&amp;url=%2Fbbs%2Flogin.php" class="sns-icon social_link sns-naver" title="네이버">
                  <span class="ico"></span>
                  <span class="txt">네이버<i> 로그인</i></span>
                </a>
                <a href="https://softer052.cafe24.com/plugin/social/popup.php?provider=kakao&amp;url=%2Fbbs%2Flogin.php" class="sns-icon social_link sns-kakao" title="카카오">
                  <span class="ico"></span>
                  <span class="txt">카카오<i> 로그인</i></span>
                </a>
                <a href="https://softer052.cafe24.com/plugin/social/popup.php?provider=facebook&amp;url=%2Fbbs%2Flogin.php" class="sns-icon social_link sns-facebook" title="페이스북">
                  <span class="ico"></span>
                  <span class="txt">페이스북<i> 로그인</i></span>
                </a>  
              </div>
            </div> 
          </div>
          <div className="join_title" id="join">
            <h3>아직 회원이 아니라면?</h3>
            <a href="/SignUp" className="join">회원가입</a>
          </div>
        </div>
      </div>
    </Navigation>
  )
}

export default Login;