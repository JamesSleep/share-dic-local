import React from "react";
import Slider from "@material-ui/core/Slider";

const filter_list = {
  system: [
    { value: "", text: "전체"},
    { value: "002", text: "월세"},
    { value: "001", text: "1일"},
    { value: "003", text: "프리패스"},
  ],
  option: [
    "전자레인지", "냉장고", "도어락", "에어컨", "내부 화장실", "외부 화장실", "커피 머신", "프린터", "FAX"
  ]
};

const SearchFilter = ({ 
  filter, handleChange, setFilter, valueTranslation
}) => {
  const marks = [
    {
      value: 0,
      label: '0'
    },
    {
      value: 100,
      label: '무제한'
    },
  ]

  const switchValue = (property, value) => {
    switch (property) {
      case "deposit": {
        if (value >= 10000) {
          return `${(value / 10000).toFixed(0)}억 ${value % 10000}만원`;
        }
        return `${value}만원`;
      }
      case "monthly": {
        return `${value}만원`;
      }
      case "count": {
        return `${value}명`;
      }
      default: break;
    }
  }

  const markValueHandler = (property, value) => {
    const [min, max] = value;
    if (min === 0) {
      if (max === 100) {
        return "무제한"
      } else {
        return `${
          switchValue(property, valueTranslation(property, max))
        } 이하`;
      }
    } else {
      if (max === 100) {
        return `${
          switchValue(property, valueTranslation(property, min))
        } 이상 ~ 무제한`;
      } else {
        return `${
          switchValue(property, valueTranslation(property, min))
        } 이상 ~ ${
          switchValue(property, valueTranslation(property, max))
        } 이하`;
      }
    }
  }

  return (
    <div className="filter__wrap">
      <div className="select__system">
        <div className="filter__title">이용 방식</div>
        <div className="system__wrap">
          { filter_list.system.map((value, index) => (
            <button
              key={index}
              className={
                filter.system === value.value ?
                "sys_active" : "sys_non_active"
              }
              onClick={()=>setFilter({
                ...filter,
                system: value.value
              })}
            >
              {value.text}
            </button>
          ))}
        </div>
      </div>
      <div className="fix__price">
        <div className="price__row">
          <div className="filter__title">
            <div>보증금</div>
            <div className="slider__value">{markValueHandler("deposit", filter.deposit)}</div>
          </div>
          <Slider 
            value={filter.deposit}
            onChange={(event, newValue)=>handleChange("deposit", newValue)}
            aria-labelledby="range-slider"
            marks={marks}
          />
        </div>
        <div className="price__row">
          <div className="filter__title">
            <div>월세</div>
            <div className="slider__value">{markValueHandler("monthly", filter.monthly)}</div>
          </div>
          <Slider 
            value={filter.monthly}
            onChange={(event, newValue)=>handleChange("monthly", newValue)}
            aria-labelledby="range-slider"
            marks={marks}
          />
        </div>
        <div className="price__row">
          <div className="filter__title">
            <div>좌석수</div>
            <div className="slider__value">{markValueHandler("count", filter.count)}</div>
          </div>
          <Slider 
            value={filter.count}
            onChange={(event, newValue)=>handleChange("count", newValue)}
            aria-labelledby="range-slider"
            marks={marks}
          />
        </div>
      </div>
      <div className="select__option">
        <div className="filter__title">부가서비스</div>
        <div className="option__list">
          { filter_list.option.map((value, index) => (
            <button
              key={index}
              className={
                filter.option.filter(a => a === value).length > 0 ?
                "sys_active" : "sys_non_active"
              }
              onClick={()=>{
                const len = filter.option.filter(a => a === value).length;
                if (len > 0) {
                  setFilter({...filter, option: filter.option.filter(a => a !== value)});
                } else {
                  setFilter({...filter, option: [...filter.option, value]});
                }
              }}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className="button__column">
        <button 
          className="search__btn"
        >
          검색
        </button>
        <button 
          className="reset__btn"
          onClick={()=>setFilter({
            system: "전체",
            order: "최근 등록순",
            deposit: [0, 100],
            monthly: [0, 100],
            count: [0, 100],
            option: [],
          })}
        >
          초기화
        </button>
      </div>
    </div>
  )
}

export default SearchFilter;