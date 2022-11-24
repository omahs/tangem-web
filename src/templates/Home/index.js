import Layout from "../../components/Common/Layout";
import {t} from "i18next";
import Header from "../../components/Common/HeaderNew";
import SectionFeature from "../../components/Home/SectionFeature";
import SectionWebCompatible from "../../components/Home/SectionCompatible";
import SectionSecure from "../../components/Home/SectionSecure";
import SectionFaq from "../../components/Home/SectionFaq";
import SectionCommunity from "../../components/Home/SectionCommunity";
import Footer from "../../components/Common/Footer";
import React from "react";
import * as styles from './home.module.scss';
import SectionHeroBlackFriday from "../../components/Home/SectionHeroBlackFriday";


export const LangHomeTemplate = () => {
  return (
    <Layout title={t('title')} description={t('description')} themeColor='#000000'>
      <Header className={styles.header} />
      <main>
        <SectionHeroBlackFriday/>
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
