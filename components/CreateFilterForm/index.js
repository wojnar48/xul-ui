import React, { Component } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import uniqid from 'uniqid';

import { Button } from '../Button';
import {
  ALL_FILTERS_QUERY,
  CREATE_FILTER_MUTATION,
} from '../../graphql';

import styles from './styles.css';


const makeTags = (filterTags, removeCallback) => {
  return filterTags.map(ftag => (
    <li key={ftag.id} className={styles.inputTerm}>
      <div className='tag is-warning is-marginless'>
        {ftag.text}
        <div
          className='delete is-small'
          onClick={() => removeCallback(ftag.id)}
        />
      </div>
    </li>
  ));
};


class CreateFilterForm extends Component {
  state = {
    name: '',
    term: '',
    resultFilter: 'NOFILTER',
    filterTags: [],
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAddTag = () => {
    // TODO(SW): Ensure that empty strings are not added.
    // Term to be added
    const newTerm = this.state.term;
  
    // Update the array of filter tags with the new tag
    const filterTags = [
      ...this.state.filterTags,
      { id: uniqid(), text: newTerm }
    ];

    this.setState({ filterTags, term: '' });
  };

  handleFilterTagRemove = (filterTermId) => {
    const { filterTags } = this.state;

    // Filter out the tag to be removed
    const updatedFilterTags = filterTags.filter(ftag => ftag.id !== filterTermId);
    this.setState({ filterTags: updatedFilterTags });
  };

  // This is a factory fn that wraps the createFilter mutation passed by
  // Apollo and returns a submit handler that will be invoked when the form
  // is submitted.
  createHandleSubmit = (createFilter) =>
    async (e) => {
      const { toggleModalState } = this.props;

      // TODO(SW): Confirm what happens if `createFilter` fails.
      // Prevent default and delegate submission to React
      e.preventDefault();
      // Invoke the closed over mutation
      NProgress.start();
      const res = await createFilter();
      // TODO(SW): Confirm if it is possible to manually add the added filter
      // to Apollo's cache using the update function.

      // Close the modal
      toggleModalState();
  };

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleAddTag();
    }
  };

  render() {
    const { name, filterTags, resultFilter, term } = this.state;
    const { toggleModalState } = this.props;
  
    // Generate filterTerms (array of strings) from filterTags (array of { id, text }).
    // We do this because GraphQL expects filterTerms to be an array of strings.
    // TODO(SW): Find a better way to do this.
    const tags = makeTags(filterTags, this.handleFilterTagRemove);
    const filterTerms = filterTags.map(ftag => ftag.text);

    return (
      // TODO(SW): See if using update instead of refetchQueries would be better
      // TODO(SW): Ask the user if results with no URLs should be added to the result set.
      <Mutation
        mutation={CREATE_FILTER_MUTATION}
        onCompleted={() => NProgress.done()}
        onError={() => NProgress.done()}
        refetchQueries={[{ query: ALL_FILTERS_QUERY }]}
        variables={{ name, filterTerms, resultFilter }}
      >
        {(createFilter, { loading, error }) => (
          // TODO(SW): Disable the form while loading=true to prevent double submit
          <form action='post' autoComplete='off'>
            <div className='columns is-multiline'>
              <div className='column is-full'>
                <div className='field'>
                  <label>Filter Name</label>
                  <div className='control'>
                    <input
                      className='input'
                      type='text'
                      name='name'
                      placeholder='Filter name'
                      onChange={this.handleInputChange}
                      onKeyDown={this.handleEnter}
                      value={name}
                      />
                  </div>
                </div>
              </div>

              <div className='column is-full'>
                <div className='field'>
                  <label>Results Filter</label>
                  <div className='control'>
                    <div className='select'>
                      <select name='resultFilter' onChange={this.handleInputChange}>
                        <option value='NOFILTER'>No filter</option>
                        <option value='HIPOINTS'>By max points</option>
                        <option value='HICOMMENTS'>By max comments</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className='column is-full'>
                <div className='field'>
                  <label>Filter Terms</label>
                  <div className='input'>
                    <ul className={styles.inputTerms}>{tags}</ul>
                    {/* // TODO(SW): Make the styling consistent on the innter input */}
                    <input
                      onChange={this.handleInputChange}
                      onKeyDown={this.handleEnter}
                      className={`input ${styles.inputInner}`}
                      name='term'
                      type='text'
                      placeholder='Add filter term'
                      value={term}
                    />
                  </div>
                </div>
              </div>
              <div className='column'>
                <Button
                  className='is-primary is-outlined is-pulled-left is-pulled-right'
                  isLoading={loading}
                  isDisabled={loading}
                  onClick={this.handleAddTag}
                >
                  <span className='icon'>
                    <i className='fas fa-plus'></i>
                  </span>
                  <span>Add Term</span>
                </Button>
              </div>
              <div className='column is-full modal-card-foot'>
                <Button
                  className='is-primary'
                  onClick={this.createHandleSubmit(createFilter)}
                >
                  Create Filter
                </Button>
                <Button
                  onClick={toggleModalState}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}

export default CreateFilterForm;
