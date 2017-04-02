import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navlist from './Navlist';
import { browserHistory } from 'react-router'
export default class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({ open: false });
        this.closetab = this.closetab.bind(this);
    }
    componentWillReceiveProps(props) {
        this.setState({ open: props.open });
    }
    closetab = (r) => {
        this.props.changeDir(r);
    }
    render() {
        var itemlist = [];
        Navlist.map((obj, i) => {
            itemlist.push(<MenuItem style={{ fontFamily: '微軟正黑體' }} key={i} onClick={() => this.closetab(obj)}>{obj.name}</MenuItem>);
        });
        return (
            <MuiThemeProvider>
                <Drawer open={this.state.open} >
                    {itemlist}
                </Drawer>
            </MuiThemeProvider>
        );
    }
}