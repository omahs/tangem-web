import React from "react";
import {tags, tag} from './tags.module.scss'

const Tags = ({items}) =>
  <ul className={tags}>
    { items.data.map( ({attributes : { name }}) =>
      <li className={tag} key={name}>{name}</li>
    )}
  </ul>

export default Tags;
