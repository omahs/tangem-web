import React from "react";
import * as styles from './pricing.module.scss';

const Features = ({items}) => {
	return (
		<div className={styles.props}>
			{items && items.map(({id, icon, text}) => (
				<div key={id} className={styles.prop}>
					{icon}
					<p>{text}</p>
				</div>
			))}
		</div>
	)
}
export default Features;
