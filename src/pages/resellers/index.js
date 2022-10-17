import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const LangResellerPage = dynamic(() => import("../[lang]/resellers"), { suspense: true });

export default function ResellerPage() {
	return <Suspense>
		<LangResellerPage language='ru' />
	</Suspense>;
}
