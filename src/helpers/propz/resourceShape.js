import PropTypes from 'prop-types';

const resourceShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
});

export default resourceShape;
