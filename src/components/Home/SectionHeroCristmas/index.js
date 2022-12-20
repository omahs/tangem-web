import React, { useState } from 'react';
import styles from './hero.module.scss';
import i18next, {t} from 'i18next';
import classNames from "classnames";
import YouTubeVideo from "../../Common/YouTubeVideo";
import Link from "next/link";

const SectionHeroChristmas = () => {
  const [videoStarted, setVideoStarted] = useState(false);
  const {language} = i18next;

  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className={classNames(styles.title)}>
          <h1>{ t('sections.safe.title') }</h1>
          <p>{ t('sections.safe.description') }</p>
          <Link
            href={{
              pathname: '/[lang]/pricing/',
              query: { lang: language },
            }}
          >
            <a className={styles.link}>{ t('buttons.buy-now') }</a>
          </Link>
        </div>
        <div className={styles.phone}>
          <div className={styles.container}>
            <picture>
              <source media='(min-width: 768px)' srcSet={`/img/christmas/phone.avif 1x, /img/christmas/phone@2x.avif 2x`} type="image/avif" />
              <source media='(min-width: 768px)' srcSet={`/img/christmas/phone.webp 1x, /img/christmas/phone@2x.webp 2x`} type="image/webp" />
              <source media='(min-width: 768px)' srcSet={`/img/christmas/phone.png 1x, /img/christmas/phone@2x.png 2x`} type="image/png" />
              <source srcSet={`/img/christmas/phone-mobile.avif 1x, /img/christmas/phone-mobile@2x.avif 2x`} type="image/avif" />
              <source srcSet={`/img/christmas/phone-mobile.webp 1x, /img/christmas/phone-mobile@2x.webp 2x`} type="image/webp" />
              <img
                alt={t('sections.safe.title')}
                src={`/img/christmas/phone-mobile.png`}
                srcSet={`/img/christmas/phone-mobile@2x.png 2x`}
                height={952}
                width={1183}
              />
            </picture>
          </div>
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

export default SectionHeroChristmas;
