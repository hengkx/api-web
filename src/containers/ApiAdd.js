import { connect } from 'react-redux';
import { Add } from '../components/Api';
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
)(Add);
