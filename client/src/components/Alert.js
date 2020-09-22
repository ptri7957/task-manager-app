import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({alert}) => {
    return alert.length > 0 ? (
        alert.map((a) => <div key={a.id} className="danger">{a.msg}</div>)
    ):(
        <Fragment></Fragment>
    )
}

Alert.propTypes = {
    alert: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alert: state.alert
})

export default connect(mapStateToProps)(Alert)
