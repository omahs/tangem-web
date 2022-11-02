import {t} from "i18next";
import {convertNodeToElement} from "react-html-parser";

export function getFormatDate(date) {
  return (new Date(date))
    .toLocaleString( t('locale'), { year: 'numeric', month: 'short', day: 'numeric' })
    .replace(' г.', '');
}
