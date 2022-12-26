import React from "react";
import {tags, tag, link} from './tags.module.scss'
import Link from "next/link";
import i18next from "i18next";
import classNames from "classnames";

const Tags = ({items: {data}, className }) => {
  const { language } = i18next;

  return data.length ? (
     <ul className={classNames(tags, className)}>
      { data.map( ({attributes : { title, slug }}) =>
        <li className={tag} key={title}>
          <Link href={`/${language}/blog/tags/${slug}/`}>
            <a className={link}>{title}</a>
          </Link>
        </li>
      )}
    </ul>
  ) : null;
}


export default Tags;
