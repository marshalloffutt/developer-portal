import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import './Profile.scss';

class Profile extends React.Component {
  static propTypes = {
    gitHubProfile: PropTypes.string,
  }

  render() {
    const { gitHubProfile } = this.props;
    return (
      <div className="profile col">
        <Card>
        <CardImg top width="100%" src={gitHubProfile.avatar_url} alt="avatar" />
        <CardBody>
          <CardTitle>{gitHubProfile.login}</CardTitle>
          <CardSubtitle>{gitHubProfile.bio}</CardSubtitle>
          <a href={gitHubProfile.html_url} className="_blank">{gitHubProfile.html_url}</a>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default Profile;
