import {Html, Head, Main, NextScript} from 'next/document'
import i18next from "i18next";
import React from "react";

export default function Document() {
	const { language } = i18next;

	return (
		<Html lang={language}>
			<Head>
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
							j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
							'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
							})(window,document,'script','dataLayer','GTM-N7NQVMC');
            `,
					}}
				/>
			</Head>
			<body>
			<noscript>
				<iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-N7NQVMC"
					height="0"
					width="0"
					style={{ display: "none", visibility: "hidden"}}
				/>
				<div>
          <img
            src="https://mc.yandex.ru/watch/89538595"
            style={{ position: "absolute", left: "-9999px" }}
            alt="" />
				</div>
			</noscript>
			<Main />
			<div id="portal" />
      <NextScript />
			</body>
		</Html>
	)
}
