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
    profile: PropTypes.object,
  }

  render() {
    const { profile } = this.props;
    console.log(profile);
    return (
      <div className="profile col">
        <Card>
        <CardImg top width="100%" className="pic" src={profile.avatar_url} alt="avatar" />
        <CardBody>
          <CardTitle>{profile.login}</CardTitle>
          <CardSubtitle>{profile.bio}</CardSubtitle>
          <a href={profile.html_url} className="_blank">{profile.html_url}</a>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default Profile;
