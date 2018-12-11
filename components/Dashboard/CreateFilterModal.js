import React, { Component } from 'react';
import cnames from 'classnames';

import CreateFilterForm from '../CreateFilterForm';
import { Button } from '../Button';

class CreateFilterModal extends Component {
  state = {
    isOpen: false,
  };

  toggleModalState = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;

    if (!isOpen) {
      return (
        <Button
          className='is-primary'
          onClick={this.toggleModalState}
        >
          Add filter
        </Button>
      );
    }

    return (
      <div className={cnames('modal', { 'is-active': isOpen })}>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Create Filter</p>
            <button
              className='delete'
              aria-label='close'
              onClick={this.toggleModalState}
            >
            </button>
          </header>
          <section className='modal-card-body'>
            <CreateFilterForm toggleModalState={this.toggleModalState} />
          </section>
        </div>
      </div>
    );
  }
}

export default CreateFilterModal;
