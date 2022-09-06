import React from "react";
import {t} from 'i18next';
import { getAllLanguageSlugs, getLanguage } from '../../../lib/lang';
import {main} from './resellers.module.scss'

import Resellers from "../../../components/Common/Pricing/resellers";
import Layout from "../../../components/Common/Layout";
import Features from "../../../components/Common/Pricing/features";
import DeliveryIcon from "../../../../public/svg/delivery-buy.svg";
import ReturnIcon from "../../../../public/svg/return.svg";
import SupportIcon from "../../../../public/svg/support.svg";

export const LangResellerPage = () => {
  const features = [
    {
      id: 'delivery',
      text: t('pricing.features.delivery'),
      icon: <DeliveryIcon />
    },
    {
      id: 'return',
      text: t('pricing.features.return'),
      icon: <ReturnIcon />
    },
    {
      id: 'support',
      text: t('pricing.features.support'),
      icon: <SupportIcon />
    }
  ];

	return (
		<Layout title={t('title')} description={t('description')}>
			<main className={main}>
				<Resellers>
          <Features items={features} />
        </Resellers>
			</main>
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths = getAllLanguageSlugs();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const language = getLanguage(params.lang);
	return {
		props: {
			language,
		},
	};
}


export default LangResellerPage
