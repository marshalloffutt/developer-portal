import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';

class FilterButtons extends React.Component {
  static propTypes = {
    filterAll: PropTypes.func,
    filterTutorials: PropTypes.func,
    filterBlogs: PropTypes.func,
    filterPodcasts: PropTypes.func,
    filterDocs: PropTypes.func,
  }

  showTutorials = (e) => {
    e.preventDefault();
    const { filterTutorials } = this.props;
    filterTutorials();
  }

  render() {
    return (
      <ButtonGroup>
        <Button className="btn btn-primary" onClick={this.showAll}>All</Button>
        <Button className="btn btn-primary" onClick={this.showTutorials}>Tutorials</Button>
        <Button className="btn btn-primary" onClick={this.showBlogs}>Blogs</Button>
        <Button className="btn btn-primary" onClick={this.showPodcasts}>Podcasts</Button>
        <Button className="btn btn-primary" onClick={this.showDocs}>Docs</Button>
      </ButtonGroup>
    );
  }
}

export default FilterButtons;
