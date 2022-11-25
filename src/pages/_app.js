import '../i18n/init';
import React from 'react'
import '../../public/styles/normalize.css'
import '../../public/styles/fonts.scss'
import '../../public/styles/tailwind.css'
import '../../public/styles/variables.css'
import i18next from 'i18next';
import {ZendeskProvider} from "../context/zendesk-context";
import {PromoProvider} from "../context/promo-context";

const App = function ({ Component, pageProps }) {
	i18next.changeLanguage(pageProps.language);
	return (
    <ZendeskProvider>
      <PromoProvider>
        <Component {...pageProps} />
      </PromoProvider>
    </ZendeskProvider>
	);
};

export default App;
