import '../i18n/init';

import React from 'react'
import '../../public/styles/normalize.css'
import '../../public/styles/fonts.scss'
import '../../public/styles/tailwind.css'
import '../../public/styles/variables.css'
import i18next from 'i18next';
import {ZendeskProvider} from "../context/zendesk-context";
import {GeoProvider} from "../context/gift-context";
import { usePromocode } from '../hooks/usePromocode';

const App = function ({ Component, pageProps }) {
	i18next.changeLanguage(pageProps.language);
  usePromocode();
	return (
    <ZendeskProvider>
      <GeoProvider>
        <Component {...pageProps} />
      </GeoProvider>
    </ZendeskProvider>
	);
};

export default App;
