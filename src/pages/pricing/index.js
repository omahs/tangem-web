import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LangPricingPage = dynamic(() => import('../[lang]/pricing'), { suspense: true });

export default function PricingPage() {
  return <Suspense>
    <LangPricingPage language="en"/>
  </Suspense>;
}
