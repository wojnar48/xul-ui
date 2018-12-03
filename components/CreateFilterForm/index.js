import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

export const CREATE_FILTER_MUTATION = gql`
  mutation CREATE_FILTER_MUTATION(
    $name: String!
    $filterTerms: [String!]!
  ) {
    createFilter(
      name: $name
      filterTerms: $filterTerms
    ) {
      id
      name
      filterTerms
      createdAt
    }
  }
`;

class CreateFilterForm extends Component {
  state = {
    name: '',
    filterTerms: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  // This is a factory fn that wraps the createFilter mutation passed by
  // Apollo and returns a submit handler that will be invoked when the form
  // is submitted.
  createHandleSubmit = (createFilter) =>
    async (e) => {
      // TODO(SW): Confirm what happens if `createFilter` fails.

      // Prevent default and delegate submission to React
      e.preventDefault();
      // Invoke the closed over mutation
      const res = await createFilter();
      // Route the user from whence they came
      Router.push({
        pathname: '/dashboard',
      });
  };

  render() {
    const { name, filterTerms } = this.state;
    // TODO(SW): Fix this hack and store filterTerms in the proper format
    const variables = { name, filterTerms: filterTerms.split(',') };

    return (
      <Mutation mutation={CREATE_FILTER_MUTATION} variables={variables}>
        {(createFilter, { loading, error }) => (
          // TODO(SW): Disable the form while loading=true to prevent double submit
          <form onSubmit={this.createHandleSubmit(createFilter)}>
            <div className='box'>
              <div className="field">
                <label className="label">Filter Name</label>
                <div className="control">
                  <input
                    className="input"
                    name='name'
                    type="text"
                    placeholder="Filter Name..."
                    value={name}
                    onChange={this.handleInputChange}
                   />
                </div>
              </div>

              <div className="field">
                <label className="label">Filter Terms</label>
                <div className="control">
                  <input
                    className="input"
                    name='filterTerms'
                    type="text"
                    placeholder="Enter list of strings"
                    value={filterTerms}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-primary"
                    type='submit'
                  >
                    Submit
                  </button>
                </div>
                <div className="control">
                  <button className="button is-text">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}

export default CreateFilterForm;
