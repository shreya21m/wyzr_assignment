import React, { useEffect } from "react";
import logo from "../logo.svg";
import { gapi } from "gapi-script";
import Login from "../Components/googleAuth";

const clientId =
  "954832916377-thvj35j5mogu49ktj08cnc5a2oj8rado.apps.googleusercontent.com";

export function Home() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  });


  return (
   
      
      
      

        <Login/>
      
  );
}
