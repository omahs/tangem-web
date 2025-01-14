import React from 'react';
import styles from './footer.module.scss';
import dynamic from 'next/dynamic';
import Logo from '../../../../public/svg/tangem-logo.svg';
import i18next, {t} from "i18next";
import classNames from "classnames";
import Link from "next/link";
import {getLanguage} from "../../../lib/lang";
import classnames from "classnames";

const DynamicZendesk = dynamic(
  () => import('../Zendesk'),
  { ssr: false }
)

const Footer = ({className}) => {
  const { language } = i18next;
  const lang = getLanguage(language);
  const documents = t('legalDocuments');

  return (
    <footer className={classnames(styles.footer, className)}>
      <div className={styles.wrapper} >
        <div className={styles.grid}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.address} itemScope itemType="https://schema.org/Organization">
            <span itemProp="name">Global Headquarters, Tangem AG</span>, <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">Baarerstrasse 10</span>, <span itemProp="postalCode">6300 Zug</span>, <span itemProp="addressCountry">Switzerland</span>
            </span>
          </div>
          <div className={classNames(styles.customer, styles.list)}>
            <span className={styles.head}>{t('menu.legalPart')}</span>
            { documents.map(({title, href}) => <a key={href} target="_blank" href={ href } rel="noreferrer">{title}</a> )}
         </div>
          <div className={classNames(styles.company, styles.list)}>
            <span className={styles.head}>{t('menu.companyPart')}</span>

            <Link href={`/${lang}/company/`}>
              <a>{t('menu.about')}</a>
            </Link>
            <Link href={`/${lang}/partnership/`}>
              <a>{t('menu.partnership')}</a>
            </Link>
            <a href={t('menu.mediaKit.link')} target="_blank" rel='nofollow noopener noreferrer'>{t('menu.mediaKit.title')}</a>
          </div>
          <div className={styles.socials}>
            <a href={t('socials.telegram')} target="_blank" rel="nofollow noopener noreferrer">
              <img src='/svg/telegram.svg' alt='telegram' loading='lazy' />
            </a>
            <a href="https://twitter.com/tangem" target="_blank" rel="nofollow noopener noreferrer">
              <img src='/svg/twitter.svg' alt='twitter' loading='lazy' />
            </a>
            <a href="https://m.facebook.com/TangemCards/" target="_blank" rel="nofollow noopener noreferrer">
              <img src='/svg/facebook.svg' alt='facebook' loading='lazy' />
            </a>
            <a href="https://instagram.com/tangemcards" target="_blank" rel="nofollow noopener noreferrer">
              <img src='/svg/instagram.svg' alt='instagram' loading='lazy' />
            </a>
            <a href="https://github.com/tangem" target="_blank" rel="nofollow noopener noreferrer">
              <img src='/svg/github.svg' alt='github' loading='lazy' />
            </a>
            <a href="https://youtube.com/channel/UCFGwLS7yggzVkP6ozte0m1w" target="_blank" rel="nofollow noopener noreferrer">
              <img src='/svg/youtube.svg' alt='youtube' loading='lazy' />
            </a>
            <a href="https://www.linkedin.com/company/tangem" target="_blank" rel="nofollow noopener noreferrer">
              <img src='/svg/linkedin.svg' alt='linkedin' loading='lazy' />
            </a>
          </div>
        </div>
        <div className={styles.copyright}>
          Copyright © {(new Date()).getFullYear()} Tangem AG. All Rights Reserved
        </div>
      </div>
      <span className={styles.made}>
		    From Switzerland
	    </span>
      <DynamicZendesk />
    </footer>
  )
}

export default Footer
