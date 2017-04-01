import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Constants from './Constants';
import Style from './Style';
export default class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({ title: "Goofy bot" });
    }
    changeNavState = (e) => {
        this.props.layout.setState({ openNav: !this.props.layout.state.openNav });
    }
    componentWillReceiveProps(props){
        this.setState({title: props.title});
    }
    render() {
        return (
            <MuiThemeProvider>
                <AppBar
                    title={this.state.title}
                    iconElementLeft={
                        <IconButton
                            onClick={this.changeNavState.bind(this)}
                            iconStyle={Style.medium_icon}
                            style={Style.medium}>
                            <i className="material-icons" >menu</i>
                        </IconButton>
                    }
                /> 

            </MuiThemeProvider>
        );
    }
}