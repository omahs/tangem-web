import '../i18n/init';

import React from 'react'
import '../../public/styles/normalize.css'
import '../../public/styles/fonts.scss'
import '../../public/styles/tailwind.css'
import i18next from 'i18next';
import {ZendeskProvider} from "../context/zendesk-context";

const App = function ({ Component, pageProps }) {
	i18next.changeLanguage(pageProps.language);
	return (
    <ZendeskProvider>
      <Component {...pageProps} />
    </ZendeskProvider>
	);
};

export default App;
