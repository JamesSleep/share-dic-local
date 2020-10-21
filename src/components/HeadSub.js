import React from "react";
import Link from "next/link";
import Head from 'next/head';


/*
  **상단 네비게이션 컴포넌트**
  ImageContainer 로고
  List 메뉴
  
*/

const HeadSub = (props) => (
  <Head>
    <title>쉐어딕</title>
    <meta charset="utf-8" />
   
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500&display=swap" rel="stylesheet" />
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
    <link rel="stylesheet" href="/css/local/navigation.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script>
    <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.7.js"></script>
  </Head>
)

export default HeadSub;