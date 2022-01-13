import React from 'react'
import { Badge, NumericBadge } from '../src'
import mdx from './badge.mdx'
import './badge-stories.css'

export default {
  title: 'my-react-ui-lib/Components/Badge',
  id: 'my-react-ui-lib/Badge',
  component: Badge,
  parameters: {
    tags: ['badge', 'oph-ui', 'react'],
    docs: {
      page: mdx,
    },
  },
}

export const Badges = () => {
  return (
    <div className="badges-container">
      <Badge type="info">Info</Badge>
      <Badge type="success">Success</Badge>
      <Badge type="warning">Warning</Badge>
      <Badge type="error">Error</Badge>
      <Badge type="neutral">Neutral</Badge>
      <NumericBadge label="NumericBadge 2">2</NumericBadge>
    </div>
  )
}
