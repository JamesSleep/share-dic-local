import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from 'next/head';
import Router from "next/router";

/*
  **상단 네비게이션 컴포넌트**
  ImageContainer 로고
  List 메뉴
  
*/

const HeadSub = (props) => {
  const [current, setCurrent] = useState("/");

  useEffect(() => {
    const path = Router.pathname;
    setCurrent(path);
  }, []);

  return (
    <Head>
      <title>쉐어딕</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&display=swap" rel="stylesheet" />
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=efd7fad8cd176cfb38b40df7e829743c"></script>
      <link rel="stylesheet" href="/css/style.css" />
      { current !== "/" && current !== "/Login" && (
        <link href="/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
      )}
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
      <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
      <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.7.js"></script>
    </Head>
  )
}

export default HeadSub;