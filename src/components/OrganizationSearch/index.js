import React from 'react';
import Button from '../Button';
import Input from '../Input';

class OrganizationSearch extends React.Component {
  onSubmit = event => {
    event.preventDefault();
    this.props.onOrganizationSearch(event.target.organizationName.value);
  };

  render() {
    const { organizationName } = this.props;

    return (
      <div className="Navigation-search">
        <form onSubmit={this.onSubmit}>
          <Input
            color={'white'}
            type="text"
            id="organizationName"
            defaultValue={organizationName}
          />{' '}
          <Button color={'white'} type="submit">
            Search
          </Button>
        </form>
      </div>
    );
  }
}

export default OrganizationSearch;
