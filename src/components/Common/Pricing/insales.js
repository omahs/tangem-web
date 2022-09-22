import React, {useEffect, useState} from 'react'
import * as styles from './pricing.module.scss';
import i18next, {t} from "i18next";
import {
  TANGEM_RESELLERS_API_URI
} from "../../../config";
import classNames from "classnames";
import Button from "../Button";

const InSales = ({children, packs, prices}) => {
	const {language} = i18next;
  const [currentPack, setCurrentPack] = useState({});
  const [quantity, setQuantity] = useState(1);

	const [isLoading, setLoading] = useState(false);
	const [list, setList] = useState([]);

	useEffect(() => {
		async function getData() {
			setLoading(true);

   	try {
				const response = await fetch(`${TANGEM_RESELLERS_API_URI}?defaultCode=${language}`);
				const data = await response.json()
				setList(data.resellers);
			} finally {
				setLoading(false);
			}
		}

		getData();
	}, []);

  useEffect(() => {
    const [ first ] = packs
    setCurrentPack(first);
  }, [packs]);

	function handleClick(name) {
		if (ga !== undefined) {
			ga('send', 'event', 'button', 'click', name);
		}
	}

  function handleBuy() {

  }

  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        { currentPack && currentPack.image }
      </div>
      <div className={classNames(styles.choice)}>
        <div>
          <div>
            <h3>{ t('pricing.buy.title')}</h3>
            <p>{ t('pricing.buy.description')}</p>
          </div>
          { packs && packs.length > 1 ?
            <form className={styles.form} >
              <span >{t('pricing.choice')}</span>
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
                      <div className={styles['radio-title']}>
                        <h4>{ pack.title }</h4>
                        <span>{`${( 1 * prices[pack.id].price).toLocaleString(prices.locale, {currency: prices.currency, style: 'currency',  minimumFractionDigits: prices.fractionDigits}) }` }</span>
                      </div>
                      <p className={styles['radio-description']}>{ pack.description }</p>
                    </label>
                  </React.Fragment>
                ))}
              </fieldset>
            </form> : null
          }
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
        </div>
        { currentPack && currentPack.id &&
          <div className={styles.total} >
            <div>
              <span className={styles.label}>{t('pricing.total')}</span>
              <span className={styles.value}>{
                `${(quantity * ( prices[currentPack.id].price)).toLocaleString(prices.locale, {currency: prices.currency, style: 'currency',  minimumFractionDigits: prices.fractionDigits})}`
              }</span>
            </div>
            <div>
              <Button onClick={handleBuy}>{t('buttons.buy-now')}</Button>
            </div>
          </div>
        }
        <span className={styles.stories}>{t('pricing.stores')}</span>
        <div className={styles.scroll}>
          <ul className={styles.list}>
            { list.map((item) => (
              <li key={item.id}>
                <img
                  loading='lazy'
                  decoding='async'
                  alt={item.name}
                  src={`/img/resellers/${item.id}@1x.png`}
                  srcSet={`/img/resellers/${item.id}@2x.png 2x`}
                />
                <a target='_blank' href={item[currentPack]} onClick={() => handleClick(item.name)} rel="noreferrer">{t('buttons.buy')}</a>
              </li>
            ))
            }
          </ul>
        </div>
      </div>
      { children }
    </div>
	)
}

export default InSales;
