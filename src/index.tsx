import React, { HTMLAttributes } from "react";
import styles from "./activity-indicator.module.css";

export interface ActivityIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Spinner'ın boyutu
   */
  size?: "small" | "medium" | "large";
  /**
   * Spinner'ın rengi (CSS değişkeni olarak)
   */
  color?: string;
}

export const ActivityIndicator = ({ 
  className, 
  size = "medium", 
  color,
  style,
  ...props 
}: ActivityIndicatorProps) => {
  const sizeClass = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large
  }[size];

  const customStyle = {
    ...style,
    ...(color && { "--spinner-color": color } as React.CSSProperties)
  };

  return (
    <div 
      className={`${styles.container} ${sizeClass} ${className || ""}`}
      style={customStyle}
      {...props}
    >
      <div className={styles.spinner}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
    </div>
  );
};

ActivityIndicator.configuration = {
  numberOfBlades: 8
};

Object.assign(
  ActivityIndicator.configuration, {
  iterate: Array.from({ length: ActivityIndicator.configuration.numberOfBlades })
});

const _SpinnerBlade = () => <div className={styles["ispinner-blade"]} />;