import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import Constants from './Constants';
import Style from './Style';
import { connect } from 'react-redux'

import * as account from '../../actions/account';
@connect((store) => {
    return {
        displayName: store.account.displayName
    };
})

export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({ title: "Goofy bot", displayName: "Checking" });
    }
    componentWillMount() {
        this.props.dispatch(account.checkLogin());
    }

    changeNavState = (e) => {
        this.props.layout.setState({ openNav: !this.props.layout.state.openNav });
    }
    componentWillReceiveProps(props) {
        this.setState({ title: props.title, displayName: props.displayName });
    }
    render() {

        return (
            <MuiThemeProvider>
                <AppBar
                    style={{ fontFamily: '微軟正黑體' }}
                    title={this.state.title}
                    iconElementLeft={
                        <IconButton
                            onClick={this.changeNavState.bind(this)}
                            iconStyle={Style.medium_icon}
                            style={Style.medium}>
                            <i className="material-icons" >menu</i>
                        </IconButton>
                    }
                    iconElementRight={
                        <FlatButton label={this.state.displayName} />
                    }
                />

            </MuiThemeProvider>
        );
    }
}