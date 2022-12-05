import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LangCompany = dynamic(() => import("../[lang]/company"), { suspense: true });

export default function Company() {
	return <Suspense><LangCompany language='en' /></Suspense>
}
