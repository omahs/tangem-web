import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LangPartnership = dynamic(() => import("../[lang]/partnership"), { suspense: true });

export default function Partnership() {
	return <Suspense><LangPartnership language='en' /></Suspense>
}
