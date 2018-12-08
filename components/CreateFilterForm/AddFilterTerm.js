import React, { Component } from 'react';
import PropTypes from 'prop-types';


const makeTags = (filterTags, clickCallback) => {
  return filterTags.map(ftag => (
    <span key={ftag.id} className='tag is-warning is-small'>
      {ftag.text}
      <div
        onClick={() => clickCallback(ftag.id)}
        className='delete is-small'
      />
    </span>
  ));
};

class AddFilter extends Component {
  static propTypes = {
    addTag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired,
    filterTags: PropTypes.array.isRequired,
  };

  state = {
    filter: '',
  };

  handleAddTag = () => {
    this.props.addTag(this.state.filter);
    this.setState({ filter: '' });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleAddTag();
    }
  };

  render() {
    const { filter } = this.state;
    const { filterTags, removeTag } = this.props;

    const tags = makeTags(filterTags, removeTag);

    return (
      <div className="field">
        <label className="label">Filter Terms</label>
        {
          filterTags.length > 0 && (
            <div className='box'>
              <div className='tags'>{tags}</div>
            </div>
          )
        }
        <div className='columns'>
          <div className='column'>
            <div className='field'>
              <input
                onChange={this.handleInputChange}
                onKeyDown={this.handleEnter}
                className='input'
                name='filter'
                type='text'
                placeholder='Enter text to filter by...'
                value={filter}
              /> 
            </div>
          </div>
          <div className='column'>
            <div
              className='button is-primary'
              onClick={this.handleAddTag}
            >
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
              <span>Add Filter</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddFilter;
