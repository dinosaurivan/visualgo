import React, { FC } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

import styles from "./main.module.css";

interface MainPageProps {
  extraClass?: string;
}

const MainPage: FC<MainPageProps> = ({ extraClass = "" }) => (
  <main className={`${styles.content} ${extraClass}`} data-testid="main-page">
    <div className={styles.title_box}>
      <h1 className={`text text_type_h1 text_color_h1 ${styles.title}`}>
        МБОУ АЛГОСОШ
      </h1>
      <p
        className={`text text_type_fibonacci text_color_secondary ${styles.fibonacci_title}`}
      >
        им. Фибоначчи
      </p>
    </div>
    <div className={styles.cards_box}>
      <Link className={styles.link} to="/string" data-testid="string-page-link">
        <div className={`${styles.card} ${styles.string}`} />
      </Link>
      <Link className={styles.link} to="/fibonacci" data-testid="fibonacci-page-link">
        <div className={`${styles.card} ${styles.fibonacci}`} />
      </Link>
      <Link className={styles.link} to="/sorting" data-testid="sorting-page-link">
        <div className={`${styles.card} ${styles.arr}`} />
      </Link>
      <Link className={styles.link} to="/stack" data-testid="stack-page-link">
        <div className={`${styles.card} ${styles.stack}`} />
      </Link>
      <Link className={styles.link} to="/queue" data-testid="queue-page-link">
        <div className={`${styles.card} ${styles.queue}`} />
      </Link>
      <Link className={styles.link} to="/linked-list" data-testid="linked-list-page-link">
        <div className={`${styles.card} ${styles.list}`} />
      </Link>
    </div>
    <Marquee className={styles.ticker} gradient={false} speed={200}>
      <p
        className={`text text_type_ticker text_color_secondary ${styles.ticker_text}`}
      >
        Вдохновлено школами, в которых не учили алгоритмам
      </p>
      <div className={styles.dot_box}>
        <p className={styles.dot} />
      </div>
    </Marquee>
    <p
      className={`text text_type_column text_color_input mt-14 ${styles.copyright}`}
    >
      © Сделано в Практикуме.
    </p>
  </main>
);

export default MainPage;
