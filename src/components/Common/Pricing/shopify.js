import React, {useEffect, useState} from 'react'
import ShopifyForm from "./shopify-form";
import {SHOPIFY_DOMAIN, SHOPIFY_API_KEY} from "../../../config";
import Script from "next/script";

const Shopify = ({packs, title, description, children}) => {

	const [loaded, setLoaded] = useState(false);

	const [products, setProducts] = useState({});

	useEffect(()=> {
		if (typeof window !== 'undefined' && typeof ShopifyBuy !== 'undefined') {
			setLoaded(true);
		}
	},[]);

	useEffect(() => {
    if (!loaded) {
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

    if (packs) {
      for (const {productId} of packs) {
        init(productId).then((product) => {
          setProducts((v) => ({[productId]: product.selectedVariant, ...v}))
        });
      }
    }

	},[loaded, packs]);

	return (
		<>
			<Script
				id="buy-button"
				src="https://sdks.shopifycdn.com/buy-button/1.0.0/buybutton.js"
				strategy="lazyOnload"
				onLoad={() => setLoaded(true)}
			/>
			<ShopifyForm packs={packs} products={products} title={title} description={description}>
        {children}
      </ShopifyForm>
			{
				packs && packs.map(({productId}) =>
					<div key={productId} id={`buy-now-${productId}`} style={{display: 'none'}} />
				)
			}
		</>
	)
}

export default Shopify
