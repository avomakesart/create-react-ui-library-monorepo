import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import cls from 'classnames'
import styles from './badge.module.css'
import { ErrorIcon } from './assets/icons'

const Badge = ({
  type,
  className,
  rounded,
  leftIcon,
  leftIconLabel,
  children,
  ...rest
}) => {
  const badgeClasses = cls(
    styles.mru_badge,
    {
      [styles[`mru_badge--type_${type}`]]: type,
      [styles[`mru_badge--icon-left`]]: leftIcon,
      [styles['mru_badge--rounded']]: rounded,
    },
    className,
  )

  //Badge with icon
  const LeftIcon = leftIcon
  const ariaProps = {
    'aria-hidden': true,
  }
  const Icon = () => {
    /* istanbul ignore next */
    if (type === 'error') {
      return <ErrorIcon {...ariaProps} />
    }
    return <LeftIcon size="xs" {...ariaProps} />
  }

  const badgeIcon = (leftIcon || leftIconLabel) && (
    <span className={styles.mru_badge__icon}>
      <Icon />
      <span className={styles['mru_badge__icon-label']}>{leftIconLabel}</span>
    </span>
  )

  return (
    <span className={badgeClasses} {...rest}>
      {badgeIcon}
      {children}
    </span>
  )
}

export { Badge }

//Numeric Badge
export const NumericBadge = (
  props
) => {
  return (
    <BadgeComponent
      {...props}
      className={styles[`mru_badge--numeric`]}
      label=""
    />
  )
}


const BadgeComponent = ({
  className,
  children,
  label,
  icon,
  rounded,
  ...rest
}) => {
  const v2BadgeClasses = cls(
    styles.mru_badge,
    { [styles['mru_badge--rounded']]: rounded },
    className,
  )
  return (
    <span className={v2BadgeClasses} {...rest}>
      {icon}
      <span className={styles[`mru_badge__icon-label`]}>{label}</span>
      {/*  To display Numeric badge  */}
      {!icon && children}
    </span>
  )
}
