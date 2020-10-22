import React from "react";

const system = {
  "001": "1일",
  "002": "월세",
  "003": "프리패스",
}

const OfficeCard = ({office}) => {
  const translationTag = (text="") => {
    const textArray = text.split("#");
    const len = textArray.length; 
    let result = "";

    for (let i=0; i<len; i++) {
      if (i === len - 1) {
        result += textArray[i];
        break;
      }
      result += textArray[i] + ',';
    }
    return result;
  }
  return (
    <a key={office.of_idx} href="#" className="office__card">
      <img src={`https://softer052.cafe24.com/data/img/${office.of_img}`} />
      <div className="middle__text">
        {office.of_member_want}인 좌석 수용인원 {office.of_member_all}명
      </div>
      <div className="text__wrap">
        <div className="price__text">
          {system[office.of_system]} {office.of_deposit}/{office.of_monthly}
        </div>
        <span className="hash__tag">
          {office.of_address.substring(0, 6)} <br />
          {translationTag(office.of_keyword)} <br/>
          {translationTag(office.of_option)}
        </span>
      </div>
    </a>
  )
}

export default OfficeCard;
