import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";

const clientId =
  "954832916377-thvj35j5mogu49ktj08cnc5a2oj8rado.apps.googleusercontent.com";

function Login() {
  const [user, setUser] = useState("");  //will contain the email id of the current user -> to store queries in DB

  const onSuccess = (res, e) => {
    console.log("Login success! Current user:", res.profileObj.email);
    setUser(res.profileObj.email);  //stores current user's email
  };

  const onFailure = (res) => {
    console.log("Login failed! res: ", res);  //failure state
  };

  const onLogoutSuccess = () => {
    console.log("log out successful");  //for signing out the user
  };

  return (
    <div>
      {!user ? (
        <GoogleLogin
          className=" bg-black"
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ) : (
        <>
          <Link to="/search">
            <button className=" rounded-lg font-bold text-3xl bg-primaryCoral text-white md:m-0 md:p-4 p-2   mx-4">
              Search books
            </button>
          </Link>
          {/* <GoogleLogout
            clientId={clientId}
            buttonText={"Sign Out"}
            onLogoutSuccess={onLogoutSuccess}
          /> */}
        </>
      )}
    </div>
  );
}

export default Login;
