import i18next, {t} from "i18next";
import Header from "../../../components/Common/Header";
import SectionHero from "../../../components/Company/SectionHero";
import Footer from "../../../components/Common/Footer";
import {getAllLanguageSlugs, getLanguage} from "../../../lib/lang";
import React from "react";
import SectionTeam from "../../../components/Company/SectionTeam";
import SectionPartners from "../../../components/Company/SectionPartners";
import SectionHiring from "../../../components/Company/SectionHiring";
import * as styles from "./company.module.scss";
import Layout from "../../../components/Common/Layout";

const LangCompany = () => {
	const { language } = i18next;

	return (
		<Layout title={t('pages.company.title')} description={t('description')} >
			<Header className={styles.header} />
			<main>
				<SectionHero />
				<SectionTeam />
				<SectionPartners />
				{ language === 'ru' && <SectionHiring /> }
			</main>
			<Footer />
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

export default LangCompany;
