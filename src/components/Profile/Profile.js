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
        <CardImg top width="100%" className="pic" src="https://avatars2.githubusercontent.com/u/40044635?s=460&v=4" alt="avatar" />
        <CardBody>
          <CardTitle>marshalloffutt</CardTitle>
          <CardSubtitle>Hello!</CardSubtitle>
          <a href="https://github.com/marshalloffutt" className="_blank">https://github.com/marshalloffutt</a>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default Profile;
