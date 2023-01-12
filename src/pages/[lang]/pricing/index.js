import { getAllLanguageSlugs, getLanguage } from '../../../lib/lang';
import { loadInsalesProducts } from '../../../lib/insales';
import i18next, { t } from 'i18next';
import Layout from '../../../components/Common/Layout';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../../components/Common/Header';
import Footer from '../../../components/Common/Footer';
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
import { usePromocode } from '../../../hooks/usePromocode';

const LangPricingPage = ({prices}) => {

  const packs = [
    {
      id: 'pack3',
      productId: '6864268689474',
      title: t('pricing.pack3.title'),
      description: t('pricing.pack3.description'),
      defaultPrice: '69.90',
    },
    {
      id: 'pack2',
      productId: '6864269213762',
      title: t('pricing.pack2.title'),
      description: t('pricing.pack2.description'),
      defaultPrice: '54.90',
    }
  ];

  const {language} = i18next;
  const useShopify = !['ru', 'by'].includes(language);
  const isSoldOut = ['ru', 'by'].includes(language);

  const { isChristmasEnabled } = useContext(PromoContext);

  const [currentPack, setCurrentPack] = useState(packs[0]);
  const [quantity, setQuantity] = useState(1);
  const [shopifyLoaded, setShopifyLoaded] = useState(false);
  const [products, setProducts] = useState({});
  const [resellersList, setResellersList] = useState([]);
  const [resellersOpen, setResellersOpen] = useState(false);
  const promoStyles = [];
  const refResellers = useRef();
  const { promocode, discount, discountType } = usePromocode();

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
        return;
      }
      const cardId = `buy-now-${currentPack.productId}`;

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
        for (let i = elem.value; i < quantity; i--) {
          decrement.click();
        }
      }

      if (elem.value < quantity) {
        const increment = document
          .getElementById(cardId)
          .querySelector('iframe')
          .contentDocument
          .querySelector('.shopify-buy__quantity-increment');

        for (let i = elem.value; i < quantity; i++) {
          increment.click();
        }
      }

      document
        .getElementById(cardId)
        .querySelector('iframe')
        .contentDocument
        .querySelector('.shopify-buy__btn')
        .click();
    } else {
      const searchParams = new URLSearchParams();
      searchParams.set('variant_id', prices[currentPack.id].id);
      searchParams.set('qty', quantity);
      if (promocode) {
        searchParams.set('promocode', promocode);
      }
      window.location.href = `https://sales.tangem.com/?${searchParams.toString()}`;
    }
  }

  useEffect(() => {
    if (typeof ShopifyBuy === 'undefined' && !shopifyLoaded) {
      return function empty() {
        //
      };
    }

    const shopifyClient = ShopifyBuy.buildClient({
      domain: SHOPIFY_DOMAIN,
      storefrontAccessToken: SHOPIFY_API_KEY,
    });

    const ui = ShopifyBuy.UI.init(shopifyClient);

    async function init(id) {
      const code = promocode;
      return await ui.createComponent('product', {
        id,
        options: {
          product: {
            // how-to apply discount code https://github.com/Shopify/buy-button-js/issues/487#issuecomment-763132108
            // source code of buttonDestination: 'checkout' is taken
            // from https://github.com/Shopify/buy-button-js/blob/master/src/components/product.js#L665-L687
            buttonDestination: function (btnProps) {
              btnProps._userEvent('openCheckout');
              btnProps.props.tracker.track('Direct Checkout', {});
              let checkoutWindow;

              if (btnProps.config.cart.popup && browserFeatures.windowOpen()) {
                const params = (new Checkout(btnProps.config)).params;
                checkoutWindow = window.open('', 'checkout', params);
              } else {
                checkoutWindow = window;
              }
              const input = {
                lineItems: [
                  {
                    variantId: btnProps.selectedVariant.id,
                    quantity: btnProps.selectedQuantity,
                  },
                ],
              };

              btnProps.props.client.checkout.create(input).then((checkout) => {
                const discount = !!code ? `&discount=${code}` : '';
                checkoutWindow.location = `${checkout.webUrl}${discount}`;
              });
            },
            contents: {
              quantity: true, // determines whether to show any quantity inputs at all
              quantityIncrement: true, // button to increase quantity
              quantityDecrement: true, // button to decrease quantity
              quantityInput: true, // input field to directly set quantity
              button: true,
              img: false,
              title: false,
            },
          },
          cart: {
            startOpen: false,
            popup: false,
          },
        },
        node: document && document.getElementById(`buy-now-${id}`),
      });
    }

    for (const { productId, id } of packs) {
      init(productId).then((product) => {
        setProducts((v) => ({ [id]: product.selectedVariant, ...v }));
      });
    }

  },[shopifyLoaded, promocode]);

  useEffect(() => {
    if (!refResellers.current) {
      return function empty() {
        //
      };
    }
    refResellers.current.style.maxHeight = resellersOpen ? refResellers.current.scrollHeight + 'px' : null;
  }, [resellersOpen]);

  function getFormatPrice(value, useDiscount = false) {
    let parsedValue = Number.parseFloat(value);
    if (Number.isNaN(parsedValue)) {
      return value;
    }
    if (useDiscount && promocode && discount) {
      parsedValue = discountType === 'percentage' ? parsedValue * (100 - discount) / 100 : parsedValue - discount;
      parsedValue = useShopify ? Math.round((parsedValue + Number.EPSILON) * 100) / 100 : Math.round(parsedValue);
    }

    const options = {
      style: 'currency',
      minimumFractionDigits: (useShopify ? 2 : prices.fractionDigits),
      currency: getPriceCurrency()
    }

    return parsedValue.toLocaleString(getPriceLocale(), options);
  }

  function getPriceLocale() {
    return useShopify ? 'en-US' : prices.locale;
  }

  function getPriceCurrency() {
    return (useShopify ? 'usd' : prices.currency)
  }

  function getPriceCurrencySymbol() {
    return (0).toLocaleString(getPriceLocale(), {
      style: 'currency', currency: getPriceCurrency(), minimumFractionDigits: 0, maximumFractionDigits: 0
    }).replace(/\d/g, '').trim();
  }

  function getPrice({ id, defaultPrice }) {
    if (isSoldOut) {
      return '';
    }
    if (useShopify) {
      return products[id] ? products[id].price : defaultPrice;
    }
    return prices[id].price;
  }

  function getOldPrice({id}) {
    if (isSoldOut) {
      return '';
    }
    if (useShopify) {
      return products[id] ? products[id].compareAtPrice : ''
    }
    return prices[id].old_price;
  }

  const currentPrice = useMemo(() => {
    if (useShopify) {
      return products[currentPack.id] ? products[currentPack.id].price : currentPack.defaultPrice;
    }
    return prices[currentPack.id].price;

  }, [prices, products, useShopify, currentPack.id, currentPack.defaultPrice]);

  const Features = () => {
    const features = [
      {
        id: 'delivery',
        text: t('pricing.features.delivery'),
        icon: <DeliveryIcon/>,
      },
      {
        id: 'return',
        text: t('pricing.features.return'),
        icon: <ReturnIcon/>,
      },
      {
        id: 'support',
        text: t('pricing.features.support'),
        icon: <SupportIcon/>,
      },
    ];

    return (
      <div className={styles.props}>
        {features && features.map(({ id, icon, text }) => (
          <div key={id} className={styles.prop}>
            {icon}
            <p>{text}</p>
          </div>
        ))}
      </div>
    );
  };


  return (
    <Layout title={t('pages.pricing.title')} description={t('pages.pricing.description')} themeColor='#000000'>
      { useShopify &&
        <>
          <Script
            id="buy-button"
            src="https://sdks.shopifycdn.com/buy-button/2.2.1/buybutton.min.js"
            strategy="afterInteractive"
            onLoad={() => setShopifyLoaded(true)}
          />
          {
            packs.map(({ productId }) => <div key={productId} id={`buy-now-${productId}`} style={{ display: 'none' }}/>)
          }
        </>
      }
      <Header className={classNames(...promoStyles)} hideBuyButton={true} />
      <div className={classNames(styles.page, ...promoStyles )}>
        <main className={styles.main}>
          <div className={styles.card} itemScope itemType="https://schema.org/ProductGroup">
            <meta itemProp="productGroupID" content={t('pricing.buy.title')}/>
            <div className={styles.picture}>
              <picture className={classNames(styles.img, {[styles['visually-hidden']]: currentPack && currentPack.id !== 'pack3'})}>
                <source srcSet="/img/pricing/pack3.avif 1x, /img/pricing/pack3@2x.avif 2x" type="image/avif" />
                <source srcSet="/img/pricing/pack3.webp 1x, /img/pricing/pack3@2x.webp 2x" type="image/webp" />
                <img
                  alt={t('pricing.pack3.title')}
                  src='/img/pricing/pack3.png'
                  srcSet="/img/pricing/pack3@2x.png 2x"
                  width={650}
                  height={474}
                />
              </picture>
              <picture className={classNames(styles.img, {[styles['visually-hidden']]: !currentPack || currentPack.id !== 'pack2'})}>
                <source srcSet="/img/pricing/pack2.avif 1x, /img/pricing/pack2@2x.avif 2x" type="image/avif" />
                <source srcSet="/img/pricing/pack2.webp 1x, /img/pricing/pack2@2x.webp 2x" type="image/webp" />
                <img
                  alt={t('pricing.pack2.title')}
                  src='/img/pricing/pack2.png'
                  srcSet="/img/pricing/pack2@2x.png 2x"
                  width={650}
                  height={474}
                />
              </picture>
            </div>
            <div className={styles.choice}>
              <div>
                <h1 itemProp="name" className={styles.title}>{ t('pricing.buy.title')}</h1>
                <p itemProp="description">{ t('pricing.buy.description')}</p>
              </div>
              { isChristmasEnabled ?
                <div className={styles.gift}>
                  <h2>{ t('pricing.gift.title')}</h2>
                  <p>{ t('pricing.gift.description')}</p>
                </div> : null
              }
              <form className={styles.form}>
                <span>{ t('pricing.choice') }</span>
                <fieldset className={styles['check-shopify']}>
                  {packs.map((pack) => (
                    <React.Fragment key={pack.id}>
                      <input
                        type="radio"
                        name="pack"
                        value={pack.id}
                        id={pack.id}
                        checked={pack.id === currentPack.id}
                        onChange={() => setCurrentPack(pack)}
                        className={styles.radio}
                      />
                      <label htmlFor={pack.id} itemScope itemType="https://schema.org/Product">
                        <meta itemProp="inProductGroupWithID" content={t('pricing.buy.title')} />
                        <div className={styles.info}>
                          <h4 itemProp="name">{ pack.title }</h4>
                          <span className={styles.price} itemProp="offers" itemScope itemType="https://schema.org/Offer">
                            { getFormatPrice(getPrice(pack), true) }
                            <meta itemProp="price" content={ getPrice(pack) } />
                            <meta itemProp="priceCurrency" content={ getPriceCurrencySymbol() } />
                          </span>
                          <span itemProp="description">{ pack.description }</span>
                          <span>
                            { promocode ? getFormatPrice(getPrice(pack)) : getFormatPrice(getOldPrice(pack)) }
                          </span>
                        </div>
                      </label>
                    </React.Fragment>
                  ))}
                </fieldset>
              </form>
              { isSoldOut ?
                <div className={styles.soldout}>
                  <h3>{t('pricing.soldOut.title')}</h3>
                  <span>{t('pricing.soldOut.description')}</span>
                </div> : <>
                <span className={styles['quantity-label']}>{t('pricing.quantity')}</span>
                <div className={styles['counter-block']}>
                  <div className={styles.counter}>
                    <button
                      className={classNames(styles.decrement, { [styles.disabled]: quantity < 2 })}
                      onClick={() => setQuantity(v => Math.max(v - 1, 1))}
                    ></button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button
                      className={styles.increment}
                      onClick={() => setQuantity(v => v + 1)}
                    ></button>
                  </div>
                </div>
                {currentPack.id &&
                  <div className={styles.total}>
                    <div>
                      <span className={styles.label}>{t('pricing.total')}</span>
                      <span className={styles.value}>{getFormatPrice(quantity * currentPrice, true)}</span>
                    </div>
                    <div>
                      <Button className={styles.buy} onClick={handleBuy}>{t('buttons.buy-now')}</Button>
                    </div>
                  </div>
                }
                </>
              }
              { !!resellersList.length &&
                <>
                  {isSoldOut ? <div
                    className={classNames(styles.stories, styles.open)}
                  >
                    <span>{t('pricing.stores')}</span>
                  </div> : <div
                    className={classNames(styles.stories, resellersOpen && styles.open)}
                    onClick={() => setResellersOpen((v) => !v)}
                  >
                    <span>{t('pricing.stores')}</span>
                    <button type="button">
                      <ArrowIcon/>
                    </button>
                  </div> }
                  <ul className={classNames(styles.list, isSoldOut && styles['list-open'])} ref={refResellers} >
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
            </div>
          </div>
          {isChristmasEnabled ? <div className={styles.promo}>
            <h2>{ t('pricing.christmas.title')}</h2>
            <p>{ t('pricing.christmas.description') }</p>
          </div> : null}
        </main>
        <Footer/>
      </div>
    </Layout>
  );
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
