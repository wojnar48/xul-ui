import React, { Component } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import uniqid from 'uniqid';

import AddFilterTerm from './AddFilterTerm';
import { Button } from '../Button';
import {
  ALL_FILTERS_QUERY,
  CREATE_FILTER_MUTATION,
} from '../../graphql';


class CreateFilterForm extends Component {
  state = {
    name: '',
    filterTags: [],
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFilterTagAdd = (filterTerm) => {
    // Update the array of filter tags with the new tag
    const filterTags = [
      ...this.state.filterTags,
      { id: uniqid(), text: filterTerm }
    ];

    this.setState({ filterTags });
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
      // TODO(SW): Confirm what happens if `createFilter` fails.
      // Prevent default and delegate submission to React
      e.preventDefault();
      // Invoke the closed over mutation
      NProgress.start();
      const res = await createFilter();
      // TODO(SW): Confirm if it is possible to manually add the added filter
      // to Apollo's cache using the update function.

      // Route the user to the dashboard view
      Router.push({ pathname: '/dashboard' });
  };

  render() {
    const { name, filterTags } = this.state;
    // Generate filterTerms (array of strings) from filterTags (array of { id, text }).
    // We do this because GraphQL expects filterTerms to be an array of strings.
    const filterTerms = filterTags.map(ftag => ftag.text);

    return (
      // TODO(SW): See if using update instead of refetchQueries would be better
      <Mutation
        mutation={CREATE_FILTER_MUTATION}
        onCompleted={() => NProgress.done()}
        onError={() => NProgress.done()}
        refetchQueries={[{ query: ALL_FILTERS_QUERY }]}
        variables={{ name, filterTerms }}
      >
        {(createFilter, { loading, error }) => (
          // TODO(SW): Disable the form while loading=true to prevent double submit
          <section className="section has-background-white-ter" style={{ height: '100vh' }}>
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="box">
                    <form action='post'>
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

                        <AddFilterTerm
                          filterTags={filterTags}
                          loading={loading}
                          removeTag={this.handleFilterTagRemove}
                          addTag={this.handleFilterTagAdd}
                        />

                        <div className="field is-grouped">
                          <div className="control">
                            <Button
                              className='is-primary'
                              isDisabled={loading}
                              isLoading={loading}
                              onClick={this.createHandleSubmit(createFilter)}
                            >
                              Submit
                            </Button>
                          </div>
                          <div className="control">
                            <Button
                              isLoading={loading}
                              isDisabled={loading}
                            >
                              <Link href='/dashboard'>
                                <a className='has-text-black'>Cancel</a>
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Mutation>
    );
  }
}

export default CreateFilterForm;
