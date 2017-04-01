import React from 'react';
import Topbar from './Topbar'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({ title: "Goofy bot" });
    }
    componentWillReceiveProps(props) {
        this.setState({ title: props.title });
    }
    render() {
        return (
            <div>
                <Topbar layout={this.props.layout} title={this.state.title} />
            </div>
        );
    }
}