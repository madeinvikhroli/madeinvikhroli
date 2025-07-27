"use client";
import React, { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import Image from "next/image";
import toggle from "../../../../../public/assets/navbar/toggle.svg";

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cookies = parseCookies();
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (window?.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = window?.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      setCurrentLanguage(languageValue);
    }
    if (window?.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(window?.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);
  if (!currentLanguage || !languageConfig) {
    return null;
  }
  const switchLanguage = (lang: string) => () => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang);
    window.location.reload();
  };
  return (
    <div className="text-center notranslate font-semibold flex flex-row items-center gap-2">
      {languageConfig.languages.map((ld: LanguageDescriptor, i: number) => (
        <React.Fragment key={ld.name}>
          <p
            key={ld.name}
            onClick={switchLanguage(ld.name)}
            className="cursor-pointer select-none"
          >
            {ld.name === "mr" ? "म" : ld.name}
          </p>
          {i < 1 && (
            <Image
              src={toggle}
              alt="divider"
              width={28}
              height={16}
              className={`${currentLanguage === "mr" ? "rotate-180" : ""}`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };
