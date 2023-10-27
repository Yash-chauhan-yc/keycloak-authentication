"use client";
import React, { useEffect } from "react";
import Keycloak from "keycloak-js";
const initOptions = {
  url: "http://localhost:8080/",
  realm: "myOrg3",
  clientId: "myclient",
  onLoad: "check-sso",
  KeycloakResponseType: "code",
};
const kc = new Keycloak(initOptions);
kc.init({
  onLoad: initOptions.onLoad,
  KeycloakResponseType: "code",
  silentCheckSsoRedirectUri:
    window.location.pathname + "/silent-check-sso.html",
  checkLoginIframe: false,
  pkceMethod: "S256",
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">Company</span>Name
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-green-500 mb-2">
                Sign in to account
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex flex-col items-center mb-3">
                <button
                  onClick={() => {
                    kc.login();
                  }}
                  className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover-bg-green-500 hover-text-white"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <button
              onClick={() => {
                kc.logout({
                  redirectUri: "http://localhost:3000/",
                });
              }}
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover-bg-white hover-text-green-500"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
