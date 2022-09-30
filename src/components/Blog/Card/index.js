import * as styles from "./card.module.scss";
import Link from "next/link";
import Tags from "../Tags";
import {getSrcSet} from "../../../lib/cms";
import {getFormatDate} from "../../../lib/util";
import i18next from "i18next";
import classNames from "classnames";

const Card = ({ attributes, isBig = false }) => {
  const imageSize = isBig ? { height: 300, width: 598 } : { height: 220, width: 384 } ;
  const { language } = i18next;
  const { slug, tags, image, title, author, date } = attributes;
  const authorImage = author && author.data.attributes.image.data ? author.data.attributes.image.data.attributes : null;
  const localDate = getFormatDate(date);

  return (
      <article className={classNames(styles.article, {[styles.big]: isBig})}>
        <div role="group" className={styles.info}>
          <h2>
            <Link href={`/${language}/blog/post/${slug}/`}>
              <a className={styles.title}>{title}</a>
            </Link>
          </h2>
          { tags ? <Tags items={tags} /> : null }
          { author ?
            <div className={styles.author} role="group">
              {authorImage ?
                <img
                  height={40}
                  width={40}
                  loading='lazy'
                  decoding='async'
                  alt={authorImage.alternativeText}
                  src={authorImage.url}
                  srcSet={getSrcSet(authorImage.formats)}
                  className={styles.avatar}
                /> : null
              }
              <span className={styles.name}>{author.data.attributes.title}</span>
              <time dateTime={localDate} className={styles.date}>{localDate}</time>
            </div> : null
          }
        </div>
        <div className={styles.cover}>
          {image && image.data ?
            <img
              height={imageSize.height}
              width={imageSize.width}
              loading='lazy'
              decoding='async'
              alt={image.data.attributes.alternativeText}
              src={image.data.attributes.url}
              srcSet={getSrcSet(image.data.attributes.formats)}
            />
            : null
          }
        </div>
      </article>
  )
}

export default Card;
