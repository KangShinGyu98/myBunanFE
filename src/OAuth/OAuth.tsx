const CLIENT_ID = "6498178f0d3734410261b5b12f57f076";
const REDIRECT_URI = "http://localhost:5173/openApi/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

import React from "react";

const OAuth = () => {
  return (
    <a href={KAKAO_AUTH_URL} className="kakaobtn">
      카카오 로그인 서버
    </a>
  );
};

export default OAuth;
