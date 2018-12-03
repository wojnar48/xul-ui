import React from 'react';
import PropTypes from 'prop-types';

const CreateFilterModal = ({ modalIsOpen, toggleModalState }) => {
  return(
    <div className={modalIsOpen ? 'modal is-active': 'modal' }>
      <div className="modal-background"></div>
      <div className="modal-content">Hi in modal!</div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={toggleModalState}
      ></button>
    </div>
  );
};

CreateFilterModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  toggleModalState: PropTypes.func.isRequired,
};

export default CreateFilterModal;
