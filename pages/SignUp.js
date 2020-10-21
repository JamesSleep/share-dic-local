import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { postData } from "../api";

const SignUp = () => {
  const router = useRouter();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password1: "",
    password2: "",
    name: "",
    phone: "",
  });

  const setState = (property, event) => {
    setSignUpData({
      ...signUpData,
      [property]: event.target.value
    });
  };

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
      for (let key of form.keys()) {
        console.log("key:", key);
      }
      for (let value of form.values()) {
        console.log("key:", value);
      }
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <a href="/">홈</a><a href="/Login">로그인</a>
      <input type="text" placeholder="email" onChange={event=>setState("email", event)} />
      <input type="text" placeholder="password" onChange={event=>setState("password1", event)} />
      <input type="text" placeholder="password check" onChange={event=>setState("password2", event)} />
      <input type="text" placeholder="name" onChange={event=>setState("name", event)} />
      <input type="text" placeholder="phone" onChange={event=>setState("phone", event)} />
      <input type="submit" value="회원가입" onClick={()=>post()}/>
    </div>
  )
}

export default SignUp;