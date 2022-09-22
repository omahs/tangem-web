import React from "react";
import {tags, tag, link} from './tags.module.scss'
import Link from "next/link";
import i18next from "i18next";

const Tags = ({items}) => {
  const { language } = i18next;

  return (
    <ul className={tags}>
      { items.data.map( ({attributes : { title, slug }}) =>
        <li className={tag} key={title}>
          <Link href={`/${language}/blog/tags/${slug}/`}>
            <a className={link}>{title}</a>
          </Link>
        </li>
      )}
    </ul>
  );
}


export default Tags;
