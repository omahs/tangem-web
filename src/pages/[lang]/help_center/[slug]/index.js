import { getLanguage, getSortedLangsData } from "../../../../lib/lang";
import { getSectionArticles, getSectionBySlug, getSectionsSlug } from "../../../../lib/zendesk";
import {t} from "i18next";
import Layout from "../../../../components/Common/Layout";
import Header from "../../../../components/Common/Header";
import * as styles from "./section.module.scss";
import Footer from "../../../../components/Common/Footer";
import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import Breadcrumbs from "../../../../components/Common/Breadcrumbs";
import {parseHtml} from "../../../../lib/html-parse";

const Accordion = ({ id, title, body }) => {

  const [isActive, setIsActive] = useState(false);
  const ref = useRef();

  useEffect(()=> {
    if (id === parseInt(window.location.hash.slice(2), 10)) {
      setIsActive(true);
    }
  }, [id]);

  useEffect(() => {
    if(!ref.current) {
      return function empty() {
        //
      }
    }
    ref.current.style.maxHeight = isActive ? ref.current.scrollHeight + "px" : null;
  }, [isActive]);

  return (
    <li onClick={() => setIsActive((v) => !v)}>
      <article className={classNames(styles.article, {[styles.active]: isActive})} >
        <h2>{title}</h2>
        <button className={styles.button}></button>
        <div className={styles.body} ref={ref}>{parseHtml(body)}</div>
        <div className={styles.link} id={`a${id}`}></div>
      </article>
    </li>
  );
};

const LangHelpCenterSection = ({ language, articles, section }) => {
	const breadcrumbs = [
		{
			href: `/${language}/help_center`,
			name: t('menu.helpCenter'),
		},
		{
			name: section.name
		}];
	const [currentArticleId, setCurrentArticleId] = useState('a0');
	const [clickedArticleId, setClickedArticleId] = useState('');
  const [isScrollBlocked, setIsScrollBlocked] = useState(false);

	useEffect(() => {
    const { hash } = window.location;
		if (hash) {
      try {
        const elem = document.querySelector(hash);
        if (elem) {
          if (window.innerWidth >= 768) {
            setClickedArticleId(hash.slice(1));
          } else {
            setCurrentArticleId(hash.slice(1))
          }
          return function empty() {}
        }
      } catch (e) {

      }
		}
    if (window.innerWidth >= 768) {
      const [first] = document.getElementsByClassName(styles.link);
      if (first) {
        setClickedArticleId(first.getAttribute('id'));
      }
    }
	}, [])

	useEffect(() => {
    if (window.innerWidth < 768) {
      return function empty() {}
    }
		let startPosition = 0;
		const [first, ...rest] = document.getElementsByClassName(styles.link);

		if (first) {
			const { top } = first.getBoundingClientRect();
			startPosition = top;
		}
		let positions = [];
		for (const elem of rest) {
			const { top } = elem.getBoundingClientRect();
			positions = [...positions, { top: top - startPosition, id: elem.id }];
		}
    const [last] = positions.slice(-1);

		let scrollTimeout;

		function handleScroll() {
			if (!first || isScrollBlocked) {
				return function empty() {}
			}
      const topPage = window.scrollY || document.documentElement.scrollTop;
			if (clickedArticleId) {
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => {
					window.location.hash = clickedArticleId;
					setCurrentArticleId(clickedArticleId);
					setClickedArticleId('');
					}, 100);
			} else {
				let currentId = first.id;
				for (const {top, id} of positions) {
					if (topPage < top) {
						break;
					}
					if (topPage >= top) {
						currentId = id;
					}
				}
				setCurrentArticleId(currentId);
			}
      if (topPage + window.innerHeight > last.top) {
        const scroll = document.querySelector(`.${styles.scroll}`);
        scroll.scrollTo({
          top: scroll.scrollTop + scroll.clientHeight,
          behavior: "smooth"
        });
      }
		}
		let passiveSupported = false;
		try {
			window.addEventListener(
				"test",
				null,
				Object.defineProperty({}, "passive", { get: function() { passiveSupported = true; } }));
		} catch(err) {}

		window.addEventListener('scroll', handleScroll, passiveSupported ? { passive: true } : false);
		return function removeListener() {
			window.removeEventListener('scroll', handleScroll, passiveSupported ? { passive: true } : false);
		}
	}, [clickedArticleId, isScrollBlocked]);

	useEffect(() => {
    if (clickedArticleId !== '') {
      return function empty() {}
    }

		if (currentArticleId === 'a0') {
			return function empty() {}
		}

		const selector = `#link-${currentArticleId}`;
		const element = document.querySelector(selector);
		if (!element) {
			return function empty() {}
		}
		const scroll = document.querySelector(`.${styles.scroll}`);
		const { height, top: startScroll } = scroll.getBoundingClientRect();
		const { top, bottom } = element.getBoundingClientRect();
		if (top < startScroll) {
			scroll.scrollTo({
				top: Math.max(scroll.scrollTop + top - startScroll, 0),
				behavior: "smooth"
			});
		}
		if (bottom - startScroll > height) {
			scroll.scrollTo({
				top: scroll.scrollTop + bottom - startScroll - height,
				behavior: "smooth"
			});
		}
	}, [currentArticleId, clickedArticleId]);

	useEffect(() => {
		if (['a0', ''].includes(clickedArticleId)) {
			return function empty() {}
		}
		const elem = document.querySelector(`#${clickedArticleId}`);
		if (elem) {
			elem.scrollIntoView({
				behavior: 'smooth',
				block: "start",
			});
			setCurrentArticleId(clickedArticleId);
		}
	}, [clickedArticleId])

	function handleClick(e) {
		e.preventDefault();
		const elem = document.querySelector(e.target.getAttribute('href'));
		setClickedArticleId(elem.id);
	}

  const titlePostfix = t('pages.helpCenter.titlePostfix', '');
  const pageTitle = titlePostfix ? `${section.name}: ${titlePostfix}` : section.name;
  const description = t('pages.helpCenter.description', '');
  const pageDescription = description ? `${section.name}. ${description}` : t('description');
  return (
		<Layout title={pageTitle} description={pageDescription}>
			<Header className={styles.header}>
        <Breadcrumbs items={breadcrumbs} />
      </Header>
			<div className={styles.wrapper}>
				<aside>
					<div
            className={styles.scroll}
            onMouseEnter={() => setIsScrollBlocked(true)}
            onMouseLeave={() => setIsScrollBlocked(false)}
          >
						<ul className={styles.menu}>
							{ articles.map(({title, id}) => (
								<li key={id}>
									<a
										onClick={handleClick}
										className={classNames({[styles.current]: `a${id}` === currentArticleId })}
										href={`#a${id}`}
									>
										{title}
									</a>
                  <div className={styles.anchor} id={`link-a${id}`}></div>
								</li>
							))}
						</ul>
					</div>
				</aside>
				<main>
					<h1 className={styles['visually-hidden']}>{section.name}</h1>
					<ul className={styles.articles}>
						{ articles.map(({title, id, body}) => (
              <Accordion key={id} id={id} title={title} body={body} />
						))}
					</ul>
				</main>
			</div>
			<Footer />
		</Layout>
	);
}

export async function getStaticPaths() {
	const languages = getSortedLangsData();
  const paths = getSectionsSlug(languages);

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: {lang, slug} }) {
	const language = getLanguage(lang);
	const section = await getSectionBySlug(language, slug);
	const articles = await getSectionArticles(language, section.id);
	return {
		props: {
			language,
			articles,
			section,
		},
	};
}

export default LangHelpCenterSection;
