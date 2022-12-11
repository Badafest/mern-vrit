import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import vars from "./vars";

export const GoogleAuthProvider = ({ handleLogin }) => {
  return (
    <GoogleOAuthProvider clientId={vars.GOOGLE_CLIENT_ID}>
      <GoogleLogin
        buttonText="Continue with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
        shape="pill"
      />
    </GoogleOAuthProvider>
  );
};
