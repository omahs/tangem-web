import {getAllLanguageSlugs, getLanguage} from "../../../../lib/lang";
import Layout from "../../../../components/Common/Layout";
import {t} from "i18next";
import * as styles from "./search.module.scss";
import React, {useEffect, useState} from "react";
import Header from "../../../../components/Common/Header";
import Footer from "../../../../components/Common/Footer";
import {useRouter} from "next/router";
import {parseHtml} from "../../../../lib/html-parse";
import {searchArticles} from "../../../../lib/zendesk";
import {Search} from "../../../../components/HelpCenter/Search";

const LangHelpCenterSearch = ({language}) => {
	const router = useRouter()
	const [ query, setQuery ] = useState('');
	const [ resultQuery, setResultQuery ] = useState('');
	const [ results, setResult ] = useState([]);

	useEffect(() => {
		setQuery(router.query.query)
	}, [router.query.query]);

	useEffect(() => {
		async function find() {
			if (!query) {
				setResult([]);
				return function empty() {}
			}

			const result = await searchArticles(language, query);
			setResultQuery(query);
			setResult(result);
		}

		find()
	}, [language, query])

	function handleSubmit(e) {
    e.preventDefault();
		const text = e.target.querySelector('input').value;
		setQuery(text);
    router.replace(`/${language}/help_center/search?query=${text}`, undefined,{ shallow: true });
	}

  return (
		<Layout title={t('pages.helpCenter.search.title')} description={t('description')}>
			<div className={styles.page}>
				<Header className={styles.header} />
				<main >
					<section>
						<h1>{t('pages.helpCenter.search.title')}</h1>
            <Search
              onSubmit={handleSubmit}
              query={query}
              className={styles.search}
            />
						<p className={styles.label}>
							{ resultQuery !== '' ? (results.length
									? `${t('pages.helpCenter.search.results', {query: resultQuery})}`
									: `${t('pages.helpCenter.search.noResults', {query: resultQuery})}`)
								: ""
							}
						</p>
					</section>
					<section>
						<ul className={styles.articles}>
							{ results.map(({id, title, body}) => (
								<li key={id}>
									<article className={styles.article}>
										<h2>{title}</h2>
                    <div>{parseHtml(body)}</div>
									</article>
								</li>
							)) }
						</ul>
					</section>
					</main>
				<Footer />
			</div>
		</Layout>
	);
}


export async function getStaticPaths() {
	return {
		paths: getAllLanguageSlugs(),
		fallback: false,
	};
}

export async function getStaticProps({ params: { lang }}) {
	return {
		props: {
			language: getLanguage(lang),
		},
	};
}

export default LangHelpCenterSearch;
