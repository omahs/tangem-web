import React, {useEffect, useState} from 'react'
import * as styles from './pricing.module.scss';

import {t} from "i18next";
import classNames from "classnames";
import Button from "../Button";

const ShopifyForm = ({ products, packs = [], title, description, children }) => {

	const [currentPack, setCurrentPack] = useState({});
	const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const [ first ] = packs
    setCurrentPack(first);
  }, [packs])

	const handleBuy = () => {
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

	return (
		<div className={styles.card}>
			<div className={styles.picture}>
				{ currentPack && currentPack.image }
			</div>
			<div className={classNames(styles.choice)}>
				<div>
					<div>
						<h3>{ title }</h3>
						<p>{ description }</p>
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
                        <span>{`$${ products[pack.id] ? products[pack.id].price : pack.defaultPrice }` }</span>
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
               `$${(quantity * (products[currentPack.id] ? products[currentPack.id].price : currentPack.defaultPrice)).toLocaleString('en-US', {currency: 'usd', minimumFractionDigits: 2})}`
              }</span>
            </div>
            <div>
              <Button onClick={handleBuy}>{t('buttons.buy-now')}</Button>
            </div>
          </div>
        }
			</div>
      { children }
		</div>
	)
}

export default ShopifyForm
