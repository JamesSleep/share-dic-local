/*global kakao*/

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { postData } from "../api";
import Navigation from "../src/components/Navigation";
import { BsFillFunnelFill } from "react-icons/bs";
import OfficeCard from "../src/components/OfficeCard";
import SearchFilter from "../src/components/SearchFilter";
import Map from "../src/components/Map";
import { filtering } from "../src/utils/filltering";

const SYSTEM_LIST = {
  "001": "1일",
  "002": "월세",
  "003": "프리패스",
}

const SearchOffice = () => {
  const Router = useRouter();
  const [officeList, setOfficeList] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useState({
    system: "",
    order: "최근 등록순",
    deposit: [0, 100],
    monthly: [0, 100],
    count: [0, 100],
    option: [],
  });

  useEffect(() => {
    getList();
  }, [filter]);

  const handleChange = (property, newValue) => {
    setFilter({
      ...filter,
      [property]: newValue
    });
  };

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
    console.log(list);
    setOfficeList(filtering(list, filter));
  }

  const fixSliderValue = (property, value) => {
    switch (property) {
      case "deposit": return value * 500;
      case "monthly": return value * 50;
      case "count": return value;
      default: break;
    }
  }

  const pageHandler = (event, id) => {
    event.preventDefault();
    document.location.href = `/OfficeDetail/?id=${id}`;
  }

  return (
    <Navigation>
      <div className="main__container">
        <div className="office__list">
          <div className="search__wrap">
            <input type="text" placeholder="건물명, 주소, 지하철역 입력" />
            <button onClick={event=>setIsClick(true)}>검색</button>
          </div>
          <div className="list__wrap">
            <div className="list__header">
              <div className="search__info">
                { isClick && (
                  `[서울/강남역] 주변 매물 총 ${officeList.length}`
                )}
              </div>
              <div>
                <span className="filter" onClick={()=>setIsFilter(!isFilter)}>
                  <BsFillFunnelFill size="23px" />
                </span>
                <select 
                  value={filter.system} 
                  onChange={event=>setFilter({...filter, system: event.target.value})}
                >
                  <option value="">전체</option>
                  <option value="002">월세</option>
                  <option value="001">1일</option>
                  <option value="003">프리패스</option>
                </select>
                <select
                  value={filter.order} 
                  onChange={event=>setFilter({...filter, order: event.target.value})}
                >
                  <option value="최근 등록순">최근 등록순</option>
                  <option value="높은 가격순">높은 가격순</option>
                  <option value="낮은 가격순">낮은 가격순</option>
                </select>
              </div>
            </div>
            <div className="list__container">
              { isFilter && (
                <SearchFilter 
                  filter={filter}
                  setFilter={setFilter}
                  handleChange={handleChange}
                  valueTranslation={fixSliderValue}
                />
              )}
              <div className="list">
                { officeList.map((office, index) => (
                  <OfficeCard key={index} office={office} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`map__container ${isFilter&&"reacted__map"}`} id="kakao_map">
          <Map />
        </div>
      </div>
    </Navigation>
  )
}

export default SearchOffice;