import { connect } from 'react-redux';
import Param from '../components/ParamPreview';
import { getList } from '../redux/param';

const mapStateToProps = (state) => ({
  getListResult: state.param.getListResult,
});

export default connect(
  mapStateToProps,
  { getList }
)(Param);
