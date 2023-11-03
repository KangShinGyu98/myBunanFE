import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export type User = {
  email: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type AuthStateChangeType = "login" | "logout";

export interface AuthContextProps {
  onAuthStateChange: (type: AuthStateChangeType) => void;
  user: User | undefined | null;
  isInitializing: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAuthStateChange: (_: AuthStateChangeType) => {},
  user: undefined,
  isInitializing: true,
});

type Props = {
  children: React.ReactElement;
};

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<undefined | User | null>();
  const [isInitializing, setIsInitializing] = useState(true);

  const initialize = () => {
    const token = getToken("token");
    const decodedUser = token && decodeToken(token);
    if (token && decodedUser) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setUser(decodedUser);
    }
  };

  useEffect(() => {
    initialize();
    setIsInitializing(false);
  }, []);

  const onAuthStateChange = (type: AuthStateChangeType) => {
    if (type === "login") {
      initialize();
      return;
    }
    setUser(undefined);
    delete axios.defaults.headers.common["Authorization"];
  };
  return (
    <AuthContext.Provider
      value={{
        onAuthStateChange,
        user,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  return useContext(AuthContext);
}

export function getToken(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    return part && part.split(";").shift();
  }
}
export function decodeToken(token: string): User | null {
  const [headerEncoded, payloadEncoded] = token.split(".");

  // 대체된 base64urlDecode 함수를 사용하여 payload를 디코딩합니다.
  const payloadStr = base64urlDecode(payloadEncoded);
  const payloadObj: User = JSON.parse(payloadStr);

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (payloadObj.exp && payloadObj.exp < currentTimestamp) {
    // 토큰이 만료되었다면 null을 반환합니다.
    return null;
  }

  return payloadObj;
}

// Base64Url 디코딩 함수
function base64urlDecode(str: string): string {
  // '-'는 '+'로, '_'는 '/'로 대체합니다.
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  // Base64 문자열이 올바르게 padding 되도록 '='를 추가합니다.
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("Illegal base64url string!");
  }

  // Base64를 디코드하고, encodeURIComponent로 인코딩된 문자열을 원래 문자로 변환합니다.
  const decodedData = decodeURIComponent(
    atob(output)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return decodedData;
}
