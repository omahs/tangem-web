import React from 'react';
import Shopify from "../../components/Common/Pricing/shopify";
import {t} from "i18next";
import Layout from "../../components/Common/Layout";
import * as styles from "../../components/Common/Pricing/pricing.module.scss";

const Lobstr = () => {
  const packs = [
    { id: 'lobstr',
      productId: '4358895075394',
      title: "",
      description: "",
      image: <picture className={styles.img}>
        <source srcSet="/img/packs/lobstr@1x.avif 1x, /img/packs/lobstr@2x.avif 2x" type="image/avif" />
        <source srcSet="/img/packs/lobstr@1x.webp 1x, /img/packs/lobstr@2x.webp 2x" type="image/webp" />
        <img
          loading='lazy'
          decoding='async'
          alt='Pack of 3 Cards'
          src='/img/packs/lobstr@1x.png'
          srcSet="/img/packs/lobstr@2x.png 2x"
        />
      </picture>,
      defaultPrice: '59.90',
    }
  ]

  return <Layout title={ t('title') } description={t('description')} >
    <main>
      <Shopify
        packs={packs}
        title= "Buy Vault Signer Card"
        description="Signer Card uses multisignature technology to maximize the security of your digital assets issued on the Stellar network."
      />
    </main>
  </Layout>
}

export default Lobstr;
