import React, {useContext, useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Logo from '../../../../public/svg/tangem-logo.svg'
import GiftIcon from '../../../../public/svg/button-gift.svg'
import i18next, {t} from "i18next";
import styles from './header.module.scss'
import classNames from 'classnames'
import {PromoContext} from "../../../context/promo-context";

const Header = ({ className, children, hideBuyButton = false }) => {
	const { language } = i18next;
	const router = useRouter();
  const { isGiftEnabled, isChristmasEnabled } = useContext(PromoContext);
  const [promoStyles, setPromoStyles] = useState([]);

  useEffect(() => {
    setPromoStyles(isChristmasEnabled ? [styles.christmas] : [])
  }, [isChristmasEnabled]);

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

  const [slugFromRouter = ''] = router.asPath.split('/').filter(i => !!i & i !== language);

  return (
    <header
      className={classNames(
				styles.header,
        promoStyles,
	      {[className]: !!className})}
     >
	    <div className={styles.wrapper}>
	      <nav className={styles.nav}>
	        <Link href="/">
	          <a className={styles.logo}>
	            <Logo />
	          </a>
	        </Link>
					<div className={styles.menu}>
			      <input id="toggle" type="checkbox" className={styles.toggle} />
			      <label htmlFor="toggle">
				      <span/>
			      </label>
						<div className={styles.items} itemScope itemType="https://www.schema.org/SiteNavigationElement">
						{
							Object.keys(menu).map((key) =>
								<ul key={key}>
									{ menu[key].map(({name, href, slug, external = false}) => (
                    <li itemProp="name" key={name} className={slugFromRouter === slug ? styles.active : null} >
                      <Link href={href} >
                        <a itemProp="url"  target={external ? '_blank' : '_self'}>{name}</a>
                      </Link>
                    </li>
										))}
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
          >
            <a className={classNames(styles.buy, {[styles.hidden]: hideBuyButton})}>{ t('buttons.buy') } { isGiftEnabled ? <GiftIcon /> : null }</a>
          </Link>
	    </div>
	    { children }
    </header>
  )
}

export default Header
