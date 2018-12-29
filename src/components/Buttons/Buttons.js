import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';

class FilterButtons extends React.Component {
  static propTypes = {
    changeType: PropTypes.func,
  }

  showTutorialsEvent = e => this.props.changeType('tutorial');

  showBlogsEvent = e => this.props.changeType('blog');

  showPodcastsEvent = e => this.props.changeType('podcast');

  showDocsEvent = e => this.props.changeType('documentation');

  showAllEvent = e => this.props.changeType(null);

  render() {
    return (
      <ButtonGroup>
        <Button className="btn btn-primary" onClick={this.showAllEvent}>All</Button>
        <Button className="btn btn-primary" onClick={this.showTutorialsEvent}>Tutorials</Button>
        <Button className="btn btn-primary" onClick={this.showBlogsEvent}>Blogs</Button>
        <Button className="btn btn-primary" onClick={this.showPodcastsEvent}>Podcasts</Button>
        <Button className="btn btn-primary" onClick={this.showDocsEvent}>Docs</Button>
      </ButtonGroup>
    );
  }
}

export default FilterButtons;
