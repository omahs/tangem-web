import * as styles from "./search.module.scss";
import i18next, {t} from "i18next";
import React, {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import {searchArticles} from "../../../lib/zendesk";

export const Search = ({ action, className, onSubmit = () => {}, query = '' }) => {
  const [ isFormActive, setIsFormActive ] = useState(false);
  const [ questions, setQuestions ] = useState([]);
  const [ searchText, setSearchText ] = useState(query);
  const search = useRef();
  const form = useRef();
  const { language } = i18next;
  let timerSearch;

  useEffect(() => {
    function hide() {
      setIsFormActive(false);
    }

    window.addEventListener('click', hide);
    return function remove() {
      window.removeEventListener('click', hide);
      setIsFormActive(false);
    }
  }, []);

  function handleOptionClick(e) {
    search.current.value = e.target.innerText;
    form.current.submit();
  }

  function handleReset(e) {
    e.preventDefault();
    setSearchText('');
    setQuestions([]);
    search.current.value = '';
    search.current.focus();
  }

  function handleFormClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onSearchChange(e) {
    setIsFormActive(true);
    const searchedValue = e.target.value;
    if (searchedValue?.length < 2) {
      return;
    }
    if (timerSearch) {
      clearTimeout(timerSearch);
    }
    timerSearch = setTimeout(() => setSearchText(searchedValue), 500);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const {signal} = abortController;

    async function getData() {
      if(!searchText || searchText < 2) {
        return function empty() {}
      }
      try {
        const result = await searchArticles(language, searchText, 5, {signal});
        setQuestions(result.map(({title}) => title));
      } catch (e) {
      }
    }

    getData();

    return () => {
      abortController.abort();
    };
  }, [setQuestions, searchText, language]);

  function handleSubmit(e) {
    setIsFormActive(false);
    onSubmit(e);
  }

  return (
    <form
      className={classNames(styles.search, className)}
      action={action}
      onClick={handleFormClick}
      onSubmit={handleSubmit}
      onFocus={()=>setIsFormActive(true)}
      ref={form}
    >
      <input
        ref={search}
        required
        minLength="1"
        maxLength="100"
        type="text"
        name="query"
        autoComplete="off"
        placeholder={t('sections.helpCenter.search')}
        defaultValue={query}
        onFocus={()=>setIsFormActive(true)}
        onChange={onSearchChange}
      />
      <button type="reset" className={styles.reset} onClick={handleReset} />
      { isFormActive && questions.length ?
        <ul className={styles.list}>
          {
            questions.map((question) => <li key={question} onClick={handleOptionClick}>{ question }</li>)
          }
        </ul>: null }
    </form>
  )
}
