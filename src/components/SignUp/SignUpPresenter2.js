import React from "react";

export default ({ signUpUpdate, nextStep }) => (
  <div class="register">
    <form 
      id="fregisterform" 
      name="fregisterform"
      onSubmit={event=>event.preventDefault()}
    >
      <div id="register_form" class="form_01">   
        <div class="register_form_inner">
          <h2>사이트 이용정보 입력</h2>
          <ul>
            <li>
              <label for="reg_mb_id">
                이메일<strong class="sound_only">필수</strong>
                <button type="button" class="tooltip_icon">
                  <i class="fa fa-question-circle-o" aria-hidden="true"></i><span class="sound_only">설명보기</span>
                </button>
                <span class="tooltip">영문자, 숫자, _ 만 입력 가능. 최소 3자이상 입력하세요.</span>
              </label>
              <input 
                type="text" 
                id="reg_mb_id" 
                class="frm_input full_input" 
                required
                minlength="3" 
                maxlength="20" 
                placeholder="이메일"
                onChange={event=>signUpUpdate("email", event)}
              />
              <span id="msg_mb_id"></span>
            </li>
            <li class="half_input left_input margin_input">
              <label for="reg_mb_password">비밀번호<strong class="sound_only">필수</strong></label>
              <input 
                type="password" 
                id="reg_mb_password" 
                class="frm_input full_input" 
                required
                minlength="3" 
                maxlength="20" 
                placeholder="비밀번호" 
                onChange={event=>signUpUpdate("password1", event)}
              />
            </li>
            <li class="half_input left_input">
              <label for="reg_mb_password_re">비밀번호 확인<strong class="sound_only">필수</strong></label>
              <input 
                type="password" 
                id="reg_mb_password_re" 
                class="frm_input full_input" 
                required
                minlength="3" 
                maxlength="20" 
                placeholder="비밀번호 확인" 
                onChange={event=>signUpUpdate("password2", event)}
              />
            </li>
          </ul>
        </div>

        <div class="tbl_frm01 tbl_wrap register_form_inner">
          <h2>개인정보 입력</h2>
          <ul>
            <li>
              <label for="reg_mb_name">이름<strong class="sound_only">필수</strong></label>
              <input 
                type="text" 
                id="reg_mb_name" 
                class="frm_input full_input" 
                required
                size="10"
                placeholder="이름" 
                onChange={event=>signUpUpdate("name", event)}
              />
            </li>
            <li>
              <label for="reg_mb_nick">
                연락처<strong class="sound_only">필수</strong>
                <button type="button" class="tooltip_icon">
                  <i class="fa fa-question-circle-o" aria-hidden="true"></i><span class="sound_only">설명보기</span>
                </button>
                <span class="tooltip">공백없이 한글,영문,숫자만 입력 가능 (한글2자, 영문4자 이상)<br/> 닉네임을 바꾸시면 앞으로 일 이내에는 변경 할 수 없습니다.</span>
              </label>
              <input 
                type="text" 
                id="reg_mb_nick" 
                required 
                class="frm_input required nospace full_input" 
                size="10" 
                maxlength="20"
                placeholder="연락처"
                onChange={event=>signUpUpdate("phone", event)}
              />
              <span id="msg_mb_nick"></span>	                
            </li>
          </ul>
        </div>
    
        {/* <div class="tbl_frm01 tbl_wrap register_form_inner">
          <h2>기타 개인설정</h2>
          <ul>
            <li class="chk_box">
              <input type="checkbox" name="mb_mailling" value="1" id="reg_mb_mailling" class="selec_chk" />
              <label for="reg_mb_mailling">
                <span></span>
                <b class="sound_only">메일링서비스</b>
              </label>
              <span class="chk_li">정보 메일을 받겠습니다.</span>
            </li>
            <li class="chk_box">
              <input type="checkbox" name="mb_open" value="1" id="reg_mb_open" class="selec_chk" />
              <label for="reg_mb_open">
                <span></span>
                <b class="sound_only">정보공개</b>
              </label>      
              <span class="chk_li">다른분들이 나의 정보를 볼 수 있도록 합니다.</span>
              <button type="button" class="tooltip_icon">
                <i class="fa fa-question-circle-o" aria-hidden="true"></i><span class="sound_only">설명보기</span>
              </button>
              <span class="tooltip">
                  정보공개를 바꾸시면 앞으로 일 이내에는 변경이 안됩니다.
              </span>
              <input type="hidden" name="mb_open_default" /> 
            </li>		        
          </ul>
        </div> */}

      </div>
      <div class="btn_confirm">
        <a href="<?php echo G5_URL ?>" class="btn_close">취소</a>
        <button 
          type="submit" 
          id="btn_submit" 
          class="btn_submit" 
          onClick={nextStep}
        >
          회원가입
        </button>
      </div>
    </form>
  </div>
)