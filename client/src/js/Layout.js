import React from 'react';
import Header from './component/header/Header'
import Nav from './component/nav/Nav'
import { browserHistory } from 'react-router'
export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openNav: false }
    }
    changeDir = (p) => {
        this.setState({openNav: false, title: p.name});
        browserHistory.push(p.route);
    }
    render() {
        return (
            <div>
                <Header layout={this} title={this.state.title}/>
                <Nav open={this.state.openNav} changeDir={this.changeDir} />
                {this.props.children}
            </div>
        );
    }
}