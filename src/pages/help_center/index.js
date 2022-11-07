import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LangHelpCenter = dynamic(() => import("../[lang]/help_center"), { suspense: true });

export default function HelpCenter() {
	return <Suspense><LangHelpCenter language='en' /></Suspense>
}
