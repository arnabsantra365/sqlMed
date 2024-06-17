import PropTypes from 'prop-types';

const Button = ({ data }) => {
  return (
    <button   className={`text-xl bg-cyan-500 p-1 rounded-lg`} >
      {`Form ${data}`}
    </button>
  );
};

Button.propTypes = {
  data: PropTypes.string.isRequired,
  color : PropTypes.string
};

export default Button;
