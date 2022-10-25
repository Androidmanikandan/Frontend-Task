import React, { Component } from 'react';
import Toast from 'react-bootstrap/Toast';


export class Toster extends Component {
    render() {
        return (
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body>{this.props.msg}</Toast.Body>
            </Toast>
        )
    }
}

export default Toster
