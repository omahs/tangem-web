import { useEffect, useState } from 'react';
import { TANGEM_PROMOCODES_API_URI } from '../config';

export const usePromocode = () => {
  const [promocode, setPromocode] = useState();
  const [discount, setDiscount] = useState();
  const [discountType, setDiscountType] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const conditions = localStorage.getItem('promocodeConditions');
    const code = searchParams.get('promocode');
    if (code) {
      fetch(`${TANGEM_PROMOCODES_API_URI}/${code}`)
        .then(res => res.json())
        .then(conditions => {
          if (conditions && Object.keys(conditions).length) {
            setPromocode(conditions.code);
            setDiscount(conditions.discount);
            setDiscountType(conditions.discountType);
            localStorage.setItem('promocodeConditions', JSON.stringify(conditions));
          }
        })
        .catch(err => {
          console.error(err);
          localStorage.setItem('promocodeConditions', null);
        });
    } else if (conditions) {
      try {
        const conditionsJson = JSON.parse(conditions);
        setPromocode(conditionsJson.code);
        setDiscount(conditionsJson.discount);
        setDiscountType(conditionsJson.discountType);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return { promocode, discount, discountType };
};
