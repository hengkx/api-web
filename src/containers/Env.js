import { connect } from 'react-redux';
import { Env } from '../components/Project';
import { getList, add, update, del } from '../redux/env';

const mapStateToProps = (state) => ({
  getListResult: state.env.getListResult,
  addResult: state.env.addResult,
  updateResult: state.env.updateResult,
  delResult: state.env.delResult,
  isfetching: state.env.isfetching,
});

export default connect(
  mapStateToProps,
  { getList, add, update, del }
)(Env);
