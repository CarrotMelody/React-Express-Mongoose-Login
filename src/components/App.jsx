import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { Button } from "antd";
import { UserAtom } from "../store";
import { request } from "../api";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, setState] = useAtom(UserAtom);

  useEffect(() => {
    if (!state.token) navigate("/login");
  }, [pathname]);

  const logout = () => {
    // 將用戶資料及 token 清除
    setState({ account: null, authority: 3, token: null });
    // 將 token 清除
    request.defaults.headers["Authorization"] = null;
    // 跳轉至登入頁
    navigate("/login");
  };

  return (
    <div className="column h-100 jc-center al-center">
      <div className="column jc-center">
        <p className="t-center">
          歡迎 {state.account}！您的權限為：{state.authority}。
        </p>
        <Button type="primary" onClick={logout}>
          登出
        </Button>
      </div>
    </div>
  );
}

export default App;
