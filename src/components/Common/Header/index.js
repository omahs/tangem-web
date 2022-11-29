import React, {useContext} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from '../../../../public/svg/tangem-logo.svg'
import GiftIcon from '../../../../public/svg/button-gift.svg'
import i18next, {t} from "i18next";
import styles from './header.module.scss'
import classNames from 'classnames'
import {PromoContext} from "../../../context/promo-context";

const Header = ({isDark, className, children }) => {
	const { language } = i18next;
	const router = useRouter();
  const { isGiftEnabled } = useContext(PromoContext);

	const menu = {
		start: [
			{ name: t('menu.wallet'), slug: '', href: `/${language}/`},
			{ name: t('menu.partnership'), slug: 'partnership', href: `/${language}/partnership/` },
			...(language !== 'ru' ? [
        { name: t('menu.developers'), slug: 'developers', href: 'https://developers.tangem.com', external: true}
      ]: []),
			...(['ru', 'en'].includes(language) ? [{ name: t('menu.blog'), slug: 'blog', href: `/${language}/blog/` }] : []),
		],
		end: [
      { name: t('menu.helpCenter'), slug: 'help_center', href: `/${language}/help_center/` },
			{ name: t('menu.company'), slug: 'company', href: `/${language}/company/` },
		]
	};

  return (
    <header
      className={classNames(
				styles.header,
	      {[styles.dark]: isDark & !className},
	      {[styles.light]: !isDark & !className},
	      {[className]: !!className})}
     >
	    <div className={styles.wrapper}>
	      <nav className={styles.nav}>
	        <Link href="/">
	          <a aria-label={'Tangem'} className={styles.logo}>
	            <Logo />
	          </a>
	        </Link>
					<div className={styles.menu}>
			      <input id="toggle" type="checkbox" className={styles.toggle} />
			      <label aria-label={t('buttons.toggle')} htmlFor="toggle">
				      <span/>
			      </label>
						<div className={styles.items}>
						{
							Object.keys(menu).map((key) =>
								<ul key={key}>
									{ menu[key].map(({name, href, slug, external = false}) => {
										const [slugFromRouter = ''] = router.asPath.split('/').filter(i => !!i & i !== language);
										return (
											<li key={name} className={slugFromRouter === slug ? styles.active : null} >
												{ router.asPath !== href && (
														<Link href={href}>
															<a target={external ? '_blank' : '_self'}>{name}</a>
														</Link>
													) ||
													(
														<span>{name}</span>
													)
												}
											</li>
										)
									}) }
								</ul>
							)
						}
						</div>
		      </div>
	      </nav>
          <Link
            href={{
              pathname: '/[lang]/pricing/',
              query: { lang: language },
            }}
            aria-label={t('buttons.buy')}
          >
            <a aria-label={t('buttons.buy')} className={classNames(styles.buy)}>
              { t('buttons.buy') } { isGiftEnabled && language === 'ru' ? <GiftIcon /> : null }
            </a>
          </Link>
	    </div>
	    { children }
    </header>
  )
}

export default Header
