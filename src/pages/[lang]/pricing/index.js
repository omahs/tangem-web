import {getAllLanguageSlugs, getLanguage} from "../../../lib/lang";
import {loadInsalesProducts} from "../../../lib/insales";
import i18next, {t} from "i18next";
import Layout from "../../../components/Common/Layout";
import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import Header from "../../../components/Common/HeaderNew";
import Footer from "../../../components/Common/Footer";
import * as styles from './pricing.module.scss';
import classNames from "classnames";
import Button from "../../../components/Common/Button";
import DeliveryIcon from "../../../../public/svg/delivery-buy.svg";
import ReturnIcon from "../../../../public/svg/return.svg";
import SupportIcon from "../../../../public/svg/support.svg";
import {getResellers} from "../../../lib/tangem";
import Script from "next/script";
import {SHOPIFY_API_KEY, SHOPIFY_DOMAIN} from "../../../config";
import ArrowIcon from "../../../../public/svg/faq_arrow.svg";
import {PromoContext} from "../../../context/promo-context";

const LangPricingPage = ({prices}) => {

  const packs = [
    {
      id: 'pack3',
      productId: '6677839577154',
      title: t('pricing.pack3.title'),
      description: t('pricing.pack3.description'),
      image: <picture className={styles.img}>
        <source srcSet="/img/pricing/pack3.avif 1x, /img/pricing/pack3@2x.avif 2x" type="image/avif" />
        <source srcSet="/img/pricing/pack3.webp 1x, /img/pricing/pack3@2x.webp 2x" type="image/webp" />
        <img
          alt={t('pricing.pack3.title')}
          src='/img/pricing/pack3.png'
          srcSet="/img/pricing/pack3@2x.png 2x"
          width={650}
          height={474}
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
        <source srcSet="/img/pricing/pack2.avif 1x, /img/pricing/pack2@2x.avif 2x" type="image/avif" />
        <source srcSet="/img/pricing/pack2.webp 1x, /img/pricing/pack2@2x.webp 2x" type="image/webp" />
        <img
          loading='lazy'
          decoding='async'
          alt={t('pricing.pack2.title')}
          src='/img/pricing/pack2.png'
          srcSet="/img/pricing/pack2@2x.png 2x"
          width={650}
          height={474}
        />
      </picture>,
      defaultPrice: '54.90',
    }
  ];

  const {language} = i18next;

  const useShopify = !['ru', 'by'].includes(language);
  const isRuLocale = ['ru', 'by'].includes(language);

  const { isBlackFridayEnabled } = useContext(PromoContext);

  const [currentPack, setCurrentPack] = useState(packs[0]);
  const [quantity, setQuantity] = useState(1);
  const [shopifyLoaded, setShopifyLoaded] = useState(false);
  const [products, setProducts] = useState({});
  const [resellersList, setResellersList] = useState([]);
  const [resellersOpen, setResellersOpen] = useState(false);
  const [promoStyles, setPromoStyles] = useState([]);
  const refResellers = useRef();

  useEffect(() => {
    async function getData() {
      try {
        const resellers = await getResellers(language);
        setResellersList(resellers);
      } catch (e) {
      }
    }

    getData()
  }, [language]);

  function handleClick(name) {
    if (ga !== undefined) {
      ga('send', 'event', 'button', 'click', name);
    }
  }

  function handleBuy() {
    if (useShopify) {
      if (!currentPack || !currentPack.id) {
        return
      }
      const cardId =`buy-now-${currentPack.productId}`;

      const elem = document
        .getElementById(cardId)
        .querySelector('iframe')
        .contentDocument
        .querySelector('.shopify-buy__quantity');

      if (elem.value > quantity) {
        const decrement = document
          .getElementById(cardId)
          .querySelector('iframe')
          .contentDocument
          .querySelector('.shopify-buy__quantity-increment');
        for (let i = elem.value; i < quantity; i-- ) {
          decrement.click();
        }
      }

      if (elem.value < quantity) {
        const increment = document
          .getElementById(cardId)
          .querySelector('iframe')
          .contentDocument
          .querySelector('.shopify-buy__quantity-increment');

        for (let i = elem.value; i < quantity; i++ ) {
          increment.click();
        }
      }

      document
        .getElementById(cardId)
        .querySelector('iframe')
        .contentDocument
        .querySelector('.shopify-buy__btn')
        .click()
    }
    else {
      window.location.href = `https://sales.tangem.com/?variant_id=${prices[currentPack.id].id}&qty=${quantity}`;
    }
  }

  useEffect(() => {
    if (typeof ShopifyBuy === "undefined"  && !shopifyLoaded) {
      return function empty() {
        //
      }
    }

    const shopifyClient = ShopifyBuy.buildClient({
      domain: SHOPIFY_DOMAIN,
      storefrontAccessToken: SHOPIFY_API_KEY,
    });

    const ui = ShopifyBuy.UI.init(shopifyClient);

    async function init(id) {
      return await ui.createComponent('product', {
        id,
        options: {
          product: {
            buttonDestination: 'checkout',
            contents: {
              quantity: true, // determines whether to show any quantity inputs at all
              quantityIncrement: true, // button to increase quantity
              quantityDecrement: true, // button to decrease quantity
              quantityInput: true, // input field to directly set quantity
              button: true,
              img: false,
              title: false,
            }
          },
          cart: {
            startOpen: false,
            popup: false,
          }
        },
        node: document && document.getElementById(`buy-now-${id}`),
      });
    }

    for (const {productId, id} of packs) {
      init(productId).then((product) => {
        setProducts((v) => ({[id]: product.selectedVariant, ...v}))
      });
    }

  },[shopifyLoaded]);

  useEffect(() => {
    if(!refResellers.current) {
      return function empty() {
        //
      }
    }
    refResellers.current.style.maxHeight = resellersOpen ? refResellers.current.scrollHeight + "px" : null;
  }, [resellersOpen]);


  useEffect(() => {
    setPromoStyles(isBlackFridayEnabled ? [styles.friday] : [])
  }, [isBlackFridayEnabled]);

  function getFormatPrice(value) {
    const parseValue = Number.parseFloat(value);
    if (Number.isNaN(parseValue)) {
      return value;
    }
    const locale = useShopify ? 'en-US' : prices.locale;
    const options = {
      style: 'currency',
      minimumFractionDigits: (useShopify ? 2 : prices.fractionDigits),
      currency: (useShopify ? 'usd' : prices.currency)
    }

    return parseValue.toLocaleString(locale, options);
  }

  function getPrice({id, defaultPrice}) {
    if (useShopify) {
      return products[id] ? products[id].price : defaultPrice
    }
    return prices[id].price;
  }

  function getOldPrice({id}) {
    if (useShopify) {
      return products[id] ? products[id].compareAtPrice : ''
    }
    return prices[id].old_price;
  }

  const currentPrice = useMemo(() => {
    if (useShopify) {
      return products[currentPack.id] ? products[currentPack.id].price : currentPack.defaultPrice
    }
    return prices[currentPack.id].price;

  }, [prices, products, useShopify, currentPack.id, currentPack.defaultPrice]);

  const Features = () => {
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

    return (
      <div className={styles.props}>
        {features && features.map(({id, icon, text}) => (
          <div key={id} className={styles.prop}>
            {icon}
            <p>{text}</p>
          </div>
        ))}
      </div>
    );
  }


  return (
    <Layout title={t('pages.pricing.title')} description={t('pages.pricing.description')}>
      { useShopify &&
        <>
          <Script
          id="buy-button"
          src="https://sdks.shopifycdn.com/buy-button/2.2.1/buybutton.min.js"
          strategy="afterInteractive"
          onLoad={() => setShopifyLoaded(true)}
          />
          {
            packs.map(({productId}) => <div key={productId} id={`buy-now-${productId}`} style={{display: 'none'}} />)
          }
        </>
      }
      <Header className={classNames(...promoStyles)} />
      <div className={classNames(styles.page, ...promoStyles )}>
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.picture}>
              { currentPack && currentPack.image }
            </div>
            <div className={styles.choice}>
              <div>
                <h1 className={styles.title}>{ t('pricing.buy.title')}</h1>
                <p>{ t('pricing.buy.description')}</p>
              </div>
              { isBlackFridayEnabled ?
                <div className={styles.gift}>
                  <p>{ t('pricing.blackFriday.gift.title')}</p>
                  <p className={styles.gold}>{ t('pricing.blackFriday.gift.description')}</p>
                  <a href={t('pricing.blackFriday.gift.docs')} className={classNames(styles.pdf, styles.gold)} target="_blank" rel="noreferrer">
                    { t('pricing.blackFriday.gift.more') }
                  </a>
                </div> : null
              }
              <form className={styles.form} >
                <span>{ isBlackFridayEnabled ? t('pricing.blackFriday.choice') : t('pricing.choice') }</span>
                <fieldset className={styles['check-shopify']}>
                  { packs.map((pack) =>(
                    <React.Fragment key={pack.id}>
                      <input
                        type="radio"
                        name="pack"
                        value={pack.id}
                        id={pack.id}
                        checked={pack.id === currentPack.id}
                        onChange={ () => setCurrentPack(pack)}
                        className={styles.radio}
                      />
                      <label htmlFor={pack.id}>
                        <div className={styles.info}>
                          <h4>{ pack.title }</h4>
                          <span className={styles.price}>{ getFormatPrice(getPrice(pack)) }</span>
                          <span>{ pack.description }</span>
                          <span>{ useShopify ? '' : getFormatPrice(getOldPrice(pack)) }</span>
                        </div>
                      </label>
                    </React.Fragment>
                  ))}
                </fieldset>
              </form>
              <span className={styles['quantity-label']}>{t('pricing.quantity')}</span>
              <div className={styles['counter-block']}>
                <div className={styles.counter}>
                  <button
                    className={classNames(styles.decrement, {[styles.disabled]: quantity < 2})}
                    onClick={()=>setQuantity(v => Math.max(v - 1, 1))}
                  ></button>
                  <span className={styles.quantity}>{quantity}</span>
                  <button
                    className={styles.increment}
                    onClick={()=>setQuantity(v => v + 1)}
                  ></button>
                </div>
              </div>
              { currentPack.id &&
                <div className={styles.total} >
                  <div>
                    <span className={styles.label}>{t('pricing.total')}</span>
                    <span className={styles.value}>{ getFormatPrice(quantity * currentPrice) }</span>
                  </div>
                  <div>
                    <Button className={styles.buy} onClick={handleBuy}>{t('buttons.buy-now')}</Button>
                  </div>
                </div>
              }
              { !!resellersList.length &&
                <>
                  <div
                    className={classNames(styles.stories, resellersOpen && styles.open)}
                    onClick={() => setResellersOpen((v) => !v)}
                  >
                    <span >{t('pricing.stores')}</span>
                    <button type="button">
                      <ArrowIcon />
                    </button>
                  </div>
                  <ul className={styles.list} ref={refResellers} >
                    { resellersList.map((item) => (
                      <li key={item.id}>
                        <img
                          decoding='async'
                          alt={item.name}
                          src={`/img/resellers/${item.id}@1x.png`}
                          srcSet={`/img/resellers/${item.id}@2x.png 2x`}
                        />
                        <a target='_blank' href={item[currentPack.id]} onClick={() => handleClick(item.name)} rel="noreferrer">{t('buttons.resellerOpenLink')}</a>
                      </li>
                    ))
                    }
                  </ul>
                </>}
            </div>
            <div>
              <Features />
              { isBlackFridayEnabled
                ? <div className={styles.details} dangerouslySetInnerHTML={{ __html: t('pricing.blackFriday.condition.description') }} />
                : null
              }
            </div>
          </div>
          {isBlackFridayEnabled ? <div className={classNames(styles.promo, {[styles['promo-ru']]: isRuLocale})}>
            <h2>{ t('pricing.blackFriday.title')}</h2>
            <p>{ t('pricing.blackFriday.description') }</p>
          </div> : null}
        </main>
        <Footer />
      </div>
    </Layout>
  )
};

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const language = getLanguage(params.lang);
  const prices = await loadInsalesProducts();

  return {
    props: {
      language,
      prices,
    },
  };
}

export default LangPricingPage;
