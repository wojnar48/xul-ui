import React, { Component } from 'react';

import CreateFilterForm from '../CreateFilterForm';
import { Button } from '../Button';

class CreateFilterModal extends Component {
  render() {
    return (
      <div className='modal is-active'>
        <div className='modal-background'></div>
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>Create Filter</p>
            <button className='delete' aria-label='close'></button>
          </header>
          <section className='modal-card-body'>
            <CreateFilterForm />
          </section>
          <footer className='modal-card-foot'>
            <Button className='is-primary'>Create Filter</Button>
            <Button>Cancel</Button>
          </footer>
        </div>
      </div>
    );
  }
}

export default CreateFilterModal;
