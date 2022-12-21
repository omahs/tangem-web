import * as styles from './breadcrumbs.module.scss';
import Link from "next/link";
import classnames from "classnames";

/**
 *
 * @param {classNames: string} classNames
 * @param {Array.<{name: string, [href]: string}>} items Array of Breadcrumbs
 * @returns {JSX.Element}
 */
const Breadcrumbs = ({classNames, items = []}) => {
	const [last, ...all] = [...items].reverse();
	return items.length && (
      <ul
        className={classnames(styles.breadcrumbs, classNames)}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
      { all.reverse().map(({ name, href}, index) => (
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" key={href}>
          <Link  href={href}>
            <a itemProp="item">
              <span>{ name }</span>
              <meta itemProp="position" content={String(index)} />
            </a>
          </Link>
        </li>
      )) }
      <li key={last.href}>
        <a>{last.name}</a>
      </li>
    </ul>
  );
}

export default Breadcrumbs;
