import { connect } from 'react-redux';
import { Detail } from '../components/Interface';
import { getById } from '../redux/interface';

const mapStateToProps = (state) => ({
  getByIdResult: state.interfaces.getByIdResult,
  getParamListResult: state.param.getListResult,
  project: state.project.getByIdResult ? state.project.getByIdResult.data : {},
  user: state.account.getInfoResult.data,
  groups: state.project.getGroupResult ? state.project.getGroupResult.data : [],
});

export default connect(
  mapStateToProps,
  { getById }
)(Detail);
