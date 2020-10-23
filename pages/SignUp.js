import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { postData } from "../api";
import Navigation from "../src/components/Navigation";
import SignUpPresenter1 from "../src/components/SignUp/SignUpPresenter1";
import SignUpPresenter2 from "../src/components/SignUp/SignUpPresenter2";

const SignUp = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [check, setCheck] = useState({
    "0": false, "1": false
  });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password1: "",
    password2: "",
    name: "",
    phone: "",
  });

  const checkboxHandler = (event) => {
    setCheck({
      ...check,
      [event.target.value]: event.target.checked
    });
  }

  const signUpUpdate = (property, event) => {
    setSignUpData({
      ...signUpData,
      [property]: event.target.value
    });
  };

  const nextStep = () => {
    if (page === 0) {
      if (check[0] && check[1]) {
        setPage(1);
      } else {
        alert("회원가입약관의 내용에 동의하셔야 회원가입 하실 수 있습니다.");
      }
    } 
    if (page === 1) {
      post();
    }
  }

  const post = async () => {
    console.log(signUpData);
    const form = new FormData();
    form.append("method", "proc_member_add");
    form.append("mb_id", signUpData.email);
    form.append("mb_password", signUpData.password1);
    form.append("mb_password_ck", signUpData.password2);
    form.append("mb_name", signUpData.name);
    form.append("mb_hp", signUpData.phone);
    const {
      data : { message, result }
    } = await postData(form);
    if (result === "Y") {
      router.push("/");
    } else {
      console.log("error:",message);
      alert(message);
    }
  };

  return (
    <Navigation>
      <div id="wrapper">
        { page === 0 && (
          <SignUpPresenter1 
            check={check}
            setCheck={setCheck}
            checkboxHandler={checkboxHandler}
            nextStep={nextStep}
          />
        )}
        { page === 1 && (
          <SignUpPresenter2 
            signUpUpdate={signUpUpdate}
            nextStep={nextStep}
          /> 
        )}
      </div>
    </Navigation>
  )
}

export default SignUp;