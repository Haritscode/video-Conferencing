import React from 'react'
import styles from '@/styles/Loading.module.scss';
import { useLoading, Bars } from "@agney/react-loading";

export default function Loading() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" />,
      });
    return (
    <>
        <div className={styles.loading}>
            <section {...containerProps}>{indicatorEl}</section>
        </div>
    </>
  )
}
