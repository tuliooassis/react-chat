import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Badge } from '@material-ui/core'
import { occupantsNumber } from '../infra/ejabberd-client/muc-client'

export const RoomCounter = ({ name }) => {
  const [counter, setCounter] = useState(0)
  const shortName = name.split('@')[0]

  const get = async () => {
    const counterResponse = await occupantsNumber({ name: shortName })
    const occupants = counterResponse.occupants

    setCounter(occupants)
  }

  useEffect(() => {
    get()
  })

  return <Badge badgeContent={counter} color="primary" />
}

RoomCounter.propTypes = {
  name: PropTypes.string.isRequired
}
