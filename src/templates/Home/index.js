import Layout from "../../components/Common/Layout";
import {t} from "i18next";
import Header from "../../components/Common/Header";
import SectionFeature from "../../components/Home/SectionFeature";
import SectionWebCompatible from "../../components/Home/SectionCompatible";
import SectionSecure from "../../components/Home/SectionSecure";
import SectionFaq from "../../components/Home/SectionFaq";
import SectionCommunity from "../../components/Home/SectionCommunity";
import Footer from "../../components/Common/Footer";
import React from "react";
import * as styles from './home.module.scss';
import SectionHero from "../../components/Home/SectionHero";
import classNames from "classnames";


export const LangHomeTemplate = () => {
  const promoStyles = [];

  return (
    <Layout title={t('title')} description={t('description')}>
      <Header className={ classNames(styles.header, ...promoStyles)} />
      <main>
        <SectionHero/>
        <SectionFeature/>
        <SectionWebCompatible />
        <SectionSecure />
        <SectionFaq />
        <SectionCommunity />
      </main>
      <Footer />
    </Layout>
  )
}
