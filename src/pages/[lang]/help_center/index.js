import {t} from 'i18next';
import Header from "../../../components/Common/Header";
import React, {useContext, useEffect} from "react";
import Layout from "../../../components/Common/Layout";
import Footer from "../../../components/Common/Footer";
import {getAllLanguageSlugs, getLanguage} from "../../../lib/lang";
import * as styles from './helpCenter.module.scss';
import Link from "next/link";
import { getSections, sectionsConfig} from "../../../lib/zendesk";
import {ZendeskContext} from "../../../context/zendesk-context";
import {Search} from "../../../components/HelpCenter/Search";

const LangHelpCenter = ({sections, language}) => {
	const { setNeedOpen, setNeedLoad } = useContext(ZendeskContext);

	const videos = [
		{
			id: 'How to setup your Tangem Wallet',
			link: '9ZVsHAKaBgY'
		},
		{
			id: 'How to setup your Tangem Note',
			link: 'cR6phId05fc'
		}
	];

  useEffect(() => {
    setNeedLoad(true);
  }, [setNeedLoad]);

  return (
		<Layout title={t('pages.helpCenter.title')} description={t('description') }>
			<Header className={styles.header } />
			<main className={styles.page}>
				<div className={styles.wrapper} >
					<section className={styles.hero}>
						<h1>{ t('sections.helpCenter.title')}</h1>
						<button
							className={styles.button}
							onClick={() => setNeedOpen(true)}
						>
							{t('buttons.contact-support')}
						</button>
						<a href={t('socials.telegram')} target="_blank" className={styles.button} rel="nofollow noopener noreferrer">Telegram chat</a>
					</section>
				</div>
				<section>
					<h2>{t('sections.helpCenter.usingTangem')}</h2>
          <Search action={`/${language}/help_center/search`} className={styles.search} />
				</section>
				<section>
					<ul className={styles.sections}>
						{ sections && sections.filter(({ id }) => sectionsConfig[id])
							.map(({name, id, description}) => (
							<li key={id}>
								<Link href={`/${language}/help_center/${sectionsConfig[id].slug}`}>
									<a className={styles.card}>
										<h3>{name}</h3>
										<p>{description}</p>
										{ sectionsConfig[id].icon}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</section>
				<section>
					<h2>{t('sections.helpCenter.getStarted')}</h2>
					<ul className={styles.videos}>
						{ videos.map(({id, link})=> (
							<li key={link}>
								<iframe
									width="375" height="211"
									src={`https://www.youtube.com/embed/${link}?modestbranding=1&controls=0`}
									title={id}
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</li>
						))}
					</ul>
				</section>
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
  const sections = await getSections(language);

	return {
		props: {
			language,
			sections,
		},
	};
}

export default LangHelpCenter;
