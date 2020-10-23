import React from "react";

export default ({ check, setCheck, checkboxHandler, nextStep }) => (
  <div class="register">
    <form name="fregister" id="fregister" onSubmit={event=>event.preventDefault()} method="POST" autocomplete="off">
      <p><i class="fa fa-check-circle" aria-hidden="true"></i> 회원가입약관 및 개인정보처리방침안내의 내용에 동의하셔야 회원가입 하실 수 있습니다.</p>
      <section id="fregister_term">
        <h2>회원가입약관</h2>
        <textarea disabled={true}>
          해당 홈페이지에 맞는 회원가입약관을 입력합니다.
        </textarea>
        <fieldset class="fregister_agree">
          <input type="checkbox" checked={check[0]} name="agree" value="0" id="agree11" class="selec_chk" onChange={event =>checkboxHandler(event)} />
          <label for="agree11"><span></span><b class="sound_only">회원가입약관의 내용에 동의합니다.</b></label>
        </fieldset>
      </section>

      <section id="fregister_private">
        <h2>개인정보처리방침안내</h2>
        <div>
          <table>
            <caption>개인정보처리방침안내</caption>
            <thead>
              <tr>
                <th>목적</th>
                <th>항목</th>
                <th>보유기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>이용자 식별 및 본인여부 확인</td>
                <td>아이디, 이름, 비밀번호</td>
                <td>회원 탈퇴 시까지</td>
              </tr>
              <tr>
                <td>고객서비스 이용에 관한 통지,<br />CS대응을 위한 이용자 식별</td>
                <td>연락처 (이메일, 휴대전화번호)</td>
                <td>회원 탈퇴 시까지</td>
              </tr>
            </tbody>
          </table>
        </div>

        <fieldset class="fregister_agree">
          <input type="checkbox" checked={check[1]} name="agree2" value="1" id="agree21" class="selec_chk" onChange={event =>checkboxHandler(event)} />
          <label for="agree21"><span></span><b class="sound_only">개인정보처리방침안내의 내용에 동의합니다.</b></label>
        </fieldset>
      </section>

      <div id="fregister_chkall" class="chk_all fregister_agree">
        <input type="checkbox" checked={check[0] && check[1]}  name="chk_all" id="chk_all" class="selec_chk" onChange={event => setCheck({0: event.target.checked, 1: event.target.checked})} />
        <label for="chk_all"><span></span>회원가입 약관에 모두 동의합니다</label>
      </div>
      <div class="btn_confirm">
        <a href="#" class="btn_close">취소</a>
        <button type="submit" onClick={nextStep} class="btn_submit">다음</button>
      </div>
    </form>
  </div>
);