import React from 'react'
import * as styles from './feature.module.scss';
import i18next, {t} from "i18next";
import Button from "../../Common/Button";
import useModal from "../../../hooks/useModal";
import Modal from "../Modal";
import Search from "../Search";
import Link from "next/link";

const SectionFeature = () => {
  const {language} = i18next;
	const { isShowing: isSearchShowing, toggle: toggleSearch } = useModal('search');

  return (
    <section className='max-w-[1680px] m-auto'>
      <div
        className='flex flex-col md:flex-row lg:items-center lg:mt-[100px]'
      >
        {/* Left Side */}
        <div className='order-last md:order-first md:w-5/12 mt-[37px] lg:w-1/2 lg:mt-0 xl:w-[47%]'>
          <picture>
            <source
              srcSet='/img/feature/feature-card-3x.png'
              media='(min-width: 1536px)'
            />
            <source
              srcSet='/img/feature/feature-card-2x.png'
              media='(min-width: 768px)'
            />
	          <source
		          srcSet='/img/feature/feature-card-1x.avif'
		          media='(min-width: 300px)'
		          type="image/avif"
	          />
	          <source
		          srcSet='/img/feature/feature-card-1x.webp'
		          media='(min-width: 300px)'
		          type="image/webp"
	          />
            <source
              srcSet='/img/feature/feature-card-1x.png'
              media='(min-width: 300px)'
            />
            <img
              loading='lazy'
              decoding='async'
              alt='Tangem card image'
              src='/img/feature/feature-card-2x.png'
              className='w-full'
              height={735}
              width={799}
            />
          </picture>
        </div>
        {/* Right Side */}
        <div className={`container mx-auto mt-[6.25rem]
          md:w-1/2 md:mt-[50px] lg:w-[40%] lg:mt-0 xl:w-[44%] xl:max-w-[583px] xl:ml-[8%] xl:px-0 ${styles.title}`}
        >
          <h2>{ t('sections.backup.title')}</h2>
          <p>{ t('sections.backup.description') }</p>
          <Link
            href={{
              pathname: '/[lang]/pricing/',
              query: { lang: language },
            }}
          >
            <a className={styles.link}>{ t('buttons.buy-now') }</a>
          </Link>
        </div>
      </div>
      <div
        className={styles.currencies}
      >

        {/* Left Side */}
        <div className={styles.title}>
          <h2>{t('sections.currencies.title')}</h2>
          <p>{ t('sections.currencies.description') }</p>
	        <Button onClick={toggleSearch} appearance='secondary'>
		        { t('buttons.assets') }
	        </Button>
        </div>

        {/* Right Side */}
        <div className='md:w-1/2 lg:w-3/5 xl:w-[55%] overflow-hidden flex justify-center md:block'>
	        <picture className='w-full ml-0 3xl:ml-0 min-w-[575px] max-w-[906px]'>
		        <source media='(min-width: 768px)' srcSet="/img/feature/group@1x.avif 1x, /img/feature/group@2x.avif 2x" type="image/avif" />
		        <source media='(min-width: 768px)' srcSet="/img/feature/group@1x.png 1x, /img/feature/group@2x.png 2x" type="image/png" />
		        <source srcSet="/img/feature/group-mobile@1x.avif 1x, /img/feature/group-mobile@2x.avif 2x" type="image/avif" />
		        <img
			        height={762}
			        width={1026}
			        loading='lazy'
			        decoding='async'
			        alt='Tangem card image'
			        src='/img/feature/group-mobile@1x.png'
			        srcSet="/img/feature/group-mobile@1x.png"
			        className='w-full ml-0 3xl:ml-0 min-w-[575px] max-w-[906px]'
		        />
	        </picture>
        </div>
      </div>
	    <Modal
		    isShowing={isSearchShowing}
		    hide={toggleSearch}
	    >
		    <Search hide={toggleSearch}	anchor="search" />
	    </Modal>
    </section>
  )
}

export default SectionFeature
