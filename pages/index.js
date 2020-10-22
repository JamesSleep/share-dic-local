import Head from 'next/head';
import Navigation from '../src/components/Navigation';
import { useState, useEffect } from 'react';
import { postData } from '../api';
import OfficeCard from '../src/components/OfficeCard';

export default function Home() {
  const [newOfficeList, setNewOfficeList] = useState([]);
  
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const form = new FormData();
    form.append("method", "proc_office_list");
    form.append("of_address_lat", "129.039685");
    form.append("of_address_lng", "35.160967");
    form.append("offset", "4");
    form.append("page", "1");
    const { data } = await postData(form);
    console.log(data[0]);
    setNewOfficeList(data);
  } 

  return (
    <Navigation>
      <div className="hero-wrap js-fullheight backimg">
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-start" data-scrollax-parent="true">
            <div className="col-md-9 ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
              <h1 className="mb-4" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">사무실 임대 아직도 발품파니?<br/><strong>SHAREDIC으로 간편하게 알아봐!</strong></h1>
              <div className="block-17 my-4">
                <form action="" method="post" className="d-block d-flex">
                  <div className="fields d-block d-flex ">
                    <div className="select-wrap one-third">
                      <input type="text" className="form-control" placeholder="원하시는 지역이나 지하철역을 입력해 주세요." />
                    </div>
                  </div>
                  <input type="submit" className="search-submit btn btn-primary" value="Search" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="ftco-section ftco-destination">
        <div className="container">
          <div className="row justify-content-start mb-5 pb-3">
            <div className="col-md-7 heading-section ftco-animate">
              <h2 className="mb-4"><strong>새로 등록되었습니다.</strong></h2>
              <span className="subheading">SHARE DIC의 신규등록된 사무실</span>
            </div>
          </div>
          <div className="office__row">
            { newOfficeList.map((office, index) => (
              <OfficeCard office={office} />
            ))}

          </div>
        </div>
      </section>

      <section className="notice_wrap">
        <div className="board__wrap">
          <div className="notice_title">공지사항</div>
          <iframe src="https://softer052.cafe24.com/bbs/board.php?bo_table=notice" />      
        </div>
        <div className="board__wrap">
          <div className="notice_title">FAQ</div>
          <iframe src="https://softer052.cafe24.com/bbs/faq.php?fm_id=1" />
        </div>
      </section>

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-start mb-5 pb-3">
            <div className="col-md-7 heading-section ftco-animate">
              <h2 className="mb-4"><strong>사무실 임대 TIP!</strong></h2>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm col-md-6 col-lg ftco-animate">
              <div className="destination destinat">
                <a href="#" className="img img-2 d-flex justify-content-center align-items-center tip_img1" >
                </a>
                <div className="text p-3">
                  <div className="d-flex">
                    <div className="one">
                      <h3><a href="#">이용시설TIP</a></h3>
                    </div>
                  </div>
                  <p>주차대수, 주차권 발급 여부 반드시 확인하세요!</p>
                </div>
              </div>
            </div>
            <div className="col-sm col-md-6 col-lg ftco-animate">
              <div className="destination destinat">
                <a href="#" className="img img-2 d-flex justify-content-center align-items-center tip_img2">
                </a>
                <div className="text p-3">
                  <div className="d-flex">
                    <div className="one">
                      <h3><a href="#">이용시설TIP</a></h3>
                    </div>
                  </div>
                  <p>주차대수, 주차권 발급 여부 반드시 확인하세요!</p>
                </div>
              </div>
            </div>
            <div className="col-sm col-md-6 col-lg ftco-animate">
              <div className="destination destinat">
                <a href="#" className="img img-2 d-flex justify-content-center align-items-center tip_img1">
                </a>
                <div className="text p-3">
                  <div className="d-flex">
                    <div className="one">
                      <h3><a href="#">이용시설TIP</a></h3>
                    </div>
                  </div>
                  <p>주차대수, 주차권 발급 여부 반드시 확인하세요!</p>
                </div>
              </div>
            </div>
            <div className="col-sm col-md-6 col-lg ftco-animate">
              <div className="destination destinat">
                <a href="#" className="img img-2 d-flex justify-content-center align-items-center tip_img2" />
                <div className="text p-3">
                  <div className="d-flex">
                    <div className="one">
                      <h3><a href="#">이용시설TIP</a></h3>
                    </div>
                  </div>
                  <p>주차대수, 주차권 발급 여부 반드시 확인하세요!</p>
                </div>
              </div>
            </div>
            <div className="tip_button"></div>
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
      <script src="/js/jquery.timepicker.min.js"></script>
      <script src="/js/scrollax.min.js"></script>
      <script src="/js/main.js"></script>
    </Navigation>
  )
}
