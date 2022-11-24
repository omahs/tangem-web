import React, { useState } from 'react';
import styles from './hero.module.scss';
import i18next, {t} from 'i18next';
import classNames from "classnames";
import YouTubeVideo from "../../Common/YouTubeVideo";
import Link from "next/link";
import GiftIcon from "../../../../public/svg/button-gift.svg";
import BinanceIcon from "../../../../public/svg/binance-bonus.svg";

const SectionHeroBlackFriday = () => {
	const [videoStarted, setVideoStarted] = useState(false);
  const {language} = i18next;

  const imgLocale = 'en'; // ['ru', 'by'].includes(language) ? 'ru' : 'en';

	return (
		<section className={styles.hero}>
			<div className={styles.grid}>
		    <div className={classNames(styles.title, {[styles.long]: true })}>
			    <h1>{ t('sections.safe.title') }</h1>
			    <p>{ t('sections.safe.description') }</p>
          <div className={styles.panel} >
            <Link
              href={{
                pathname: '/[lang]/pricing/',
                query: { lang: language },
              }}
            >
              <a className={styles.link}>{ t('buttons.buy-now') } <GiftIcon /></a>
            </Link>
            <span>{ t('sections.safe.bonus') }</span>
            <BinanceIcon />
          </div>
				</div>
				<div className={styles.phone}>
					<picture>
						<source media='(min-width: 768px)' srcSet={`/img/hero/phone-${imgLocale}.avif 1x, /img/hero/phone-${imgLocale}@2x.avif 2x`} type="image/avif" />
						<source media='(min-width: 768px)' srcSet={`/img/hero/phone-${imgLocale}.webp 1x, /img/hero/phone-${imgLocale}@2x.webp 2x`} type="image/webp" />
						<source media='(min-width: 768px)' srcSet={`/img/hero/phone-${imgLocale}.png 1x, /img/hero/phone-${imgLocale}@2x.png 2x`} type="image/png" />
						<source srcSet={`/img/hero/phone-mobile-${imgLocale}.avif 1x, /img/hero/phone-mobile-${imgLocale}@2x.avif 2x`} type="image/avif" />
						<source srcSet={`/img/hero/phone-mobile-${imgLocale}.webp 1x, /img/hero/phone-mobile-${imgLocale}@2x.webp 2x`} type="image/webp" />
						<img
							alt={t('sections.safe.title')}
							src={`/img/hero/phone-mobile-${imgLocale}.png`}
							srcSet={`/img/hero/phone-mobile-${imgLocale}@2x.png 2x`}
							height={599}
							width={726}
						/>
					</picture>
				</div>
			</div>
			<div className={styles.video}>
				<div className={styles.frame}>
					<button className={styles.play} onClick={() => setVideoStarted(true)}>
						<img src='/svg/play.svg' alt='play' loading='lazy' />
					</button>
					{ videoStarted && <div className={styles.youtube}><YouTubeVideo videoId={t('video.id')} /></div> }
				</div>
			</div>
		</section>
  )
}

export default SectionHeroBlackFriday;
