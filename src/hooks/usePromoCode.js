import { useEffect, useState } from 'react';
import { TANGEM_PROMOCODES_API_URI } from '../config';

export const usePromoCode = () => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState();
  const [discountType, setDiscountType] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const conditions = localStorage.getItem('promo-code-conditions');
    const code = searchParams.get('promocode');
    if (code) {
      setPromoCode(code);
      fetch(`${TANGEM_PROMOCODES_API_URI}/${code}`)
        .then(res => res.json())
        .then(conditions => {
          if (conditions && Object.keys(conditions).length) {
            setDiscount(conditions.discount);
            setDiscountType(conditions.discountType);
            localStorage.setItem('promo-code-conditions', JSON.stringify(conditions));
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error(err);
          localStorage.setItem('promocodeConditions', null);
        });
    } else if (conditions) {
      try {
        const conditionsJson = JSON.parse(conditions);
        setPromoCode(conditionsJson.code);
        setDiscount(conditionsJson.discount);
        setDiscountType(conditionsJson.discountType);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  }, []);

  return { promoCode, discount, discountType };
};
