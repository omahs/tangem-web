import React from 'react';

import i18next, {t} from "i18next";

import Resellers from "./resellers";
import Shopify from "./shopify";
import * as styles from "./pricing.module.scss";
import DeliveryIcon from "../../../../public/svg/delivery-buy.svg";
import ReturnIcon from "../../../../public/svg/return.svg";
import SupportIcon from "../../../../public/svg/support.svg";
import Features from "./features";

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
  ];

  const features = [
    {
      id: 'delivery',
      text: t('pricing.features.delivery'),
      icon: <DeliveryIcon />
    },
    {
      id: 'return',
      text: t('pricing.features.return'),
      icon: <ReturnIcon />
    },
    {
      id: 'support',
      text: t('pricing.features.support'),
      icon: <SupportIcon />
    }
  ];

	return useShopify ?
    <Shopify
      packs={packs}
      title={t('pricing.buy.title')}
      description={t('pricing.buy.description')}
    >
      <Features items={features} />
    </Shopify>:
    <Resellers>
      <Features items={features} />
    </Resellers>
}

export default Pricing;
