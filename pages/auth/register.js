import React from 'react'
import {connect} from 'react-redux'
import Register from './../../components/auth/Register'
import initialize from './../../utils/initialize';
import { withRouter } from 'next/router'
import { reqRegisterAuth } from './../../modules/auth/actions'
import { alertsSelector } from './../../modules/alert/selectors';
import { authSelector } from './../../modules/auth/selectors';

class RegisterPage extends React.Component {

    static getInitialProps ({ctx}) {
        initialize(ctx);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.router.push('/');
        }
    }

    render () {
        return (
            <Register 
                auth={this.props.auth}
                alert={this.props.alert}
                registerAuth={this.props.registerAuth}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth : authSelector(state),
        alert: alertsSelector(state)
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        registerAuth: (data, router) => {
            dispatch(reqRegisterAuth(data, router));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));
