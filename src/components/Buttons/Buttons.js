import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class FilterButtons extends React.Component {
  render() {
    return (
      <ButtonGroup>
        <Button className="btn btn-primary" onClick={this.showAll}>All</Button>
        <Button className="btn btn-primary" onClick={this.showTutorials}>Tutorials</Button>
        <Button className="btn btn-primary" onClick={this.showBlogs}>Blogs</Button>
        <Button className="btn btn-primary" onClick={this.showPodcasts}>Podcasts</Button>
        <Button className="btn btn-primary" onClick={this.showDocs}>Documentation</Button>
      </ButtonGroup>
    );
  }
}

export default FilterButtons;
