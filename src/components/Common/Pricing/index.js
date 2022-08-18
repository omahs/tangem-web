import React from 'react';

import i18next, {t} from "i18next";

import Resellers from "./resellers";
import Shopify from "./shopify";
import * as styles from "./pricing.module.scss";

const Pricing = () => {
	const {language} = i18next;

	const resellersLocales = ['ru', 'by'];

  const useShopify = !resellersLocales.includes(language);

  const packs = [
    {
      id: 'pack3',
      productId: '6677839577154',
      title: t('pricing.pack3.title'),
      description: t('pricing.pack3.description'),
      image: <picture className={styles.img}>
        <source srcSet="/img/packs/pack3@1x.avif 1x, /img/packs/pack3@2x.avif 2x" type="image/avif" />
        <source srcSet="/img/packs/pack3@1x.webp 1x, /img/packs/pack3@2x.webp 2x" type="image/webp" />
        <img
          loading='lazy'
          decoding='async'
          alt='Pack of 3 Cards'
          src='/img/packs/pack3@1x.png'
          srcSet="/img/packs/pack3@2x.png 2x"
        />
      </picture>,
      defaultPrice: '69.90',
    },
    {
      id: 'pack2',
      productId: '6677836693570',
      title: t('pricing.pack2.title'),
      description: t('pricing.pack2.description'),
      image: <picture className={styles.img}>
        <source srcSet="/img/packs/pack2@1x.avif 1x, /img/packs/pack2@2x.avif 2x" type="image/avif" />
        <source srcSet="/img/packs/pack2@1x.webp 1x, /img/packs/pack2@2x.webp 2x" type="image/webp" />
        <img
          loading='lazy'
          decoding='async'
          alt='Pack of 2 Cards'
          src='/img/packs/pack2@1x.png'
          srcSet="/img/packs/pack2@2x.png 2x"
        />
      </picture>,
      defaultPrice: '54.90',
    }
  ]

	return useShopify ? <Shopify
    packs={packs}
c
  /> : <Resellers />
}

export default Pricing;
