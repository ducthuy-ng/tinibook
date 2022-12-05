import React from 'react';
import styles from './BookCard.module.css';
import Image from 'next/image';

function bookCardImageLoader(props: { src: string }) {
  return props.src;
}

function BookCard(props: {
  id?: string;
  name?: string;
  coverUrl?: string;
  amount?: number;
  onClick?: React.MouseEventHandler<HTMLImageElement> | undefined;
}) {
  return (
    <div id={props.id} className={styles.book_card} onClick={props.onClick}>
      <div className={styles.book_card_img_wrapper}>
        {props.coverUrl ? (
          <Image
            alt={'cover_img'}
            src={props.coverUrl}
            fill={true}
            loader={bookCardImageLoader}
            className={styles.book_card_img}
            unoptimized
          />
        ) : null}
      </div>
      <p className={styles.book_card_name}>{props.name}</p>
      {props.amount ? <p className={styles.book_card_amount}>Số lượng: {props.amount}</p> : null}
    </div>
  );
}

export default BookCard;
