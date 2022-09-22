import * as styles from "./pagination.module.scss";
import {t} from "i18next";
import Link from "next/link";

const Pagination = ({pageCount, page, path }) => {
  return pageCount > 1 ?
    <div className={styles.pagination}>
      { page === pageCount ? <a className={styles.disabled}>{t('pagination.next')}</a> :
        <Link href={`${path}page/${page + 1}/`}>
          <a>{t('pagination.next')}</a>
        </Link>
      }
      <span>{t('pagination.state', {page, pageCount})}</span>
      { page === 1 ? <a className={styles.disabled}>{t('pagination.prev')}</a> :
        <Link href={ page === 2 ? path : `${path}page/${page - 1}/`}>
          <a>{t('pagination.prev')}</a>
        </Link>
      }
    </div> : null;
}

export default Pagination;
