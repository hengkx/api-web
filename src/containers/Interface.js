import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Interface from '../components/Interface';
import { add, getList } from '../redux/interface';
import { addGroup } from '../redux/project';

const mapStateToProps = (state) => ({
  addResult: state.project.addResult,
  getListResult: state.interfaces.getListResult,
  addGroupResult: state.project.addGroupResult,
  groups: state.project.getGroupResult ? state.project.getGroupResult.data : [],
  user: state.account.getInfoResult.data,
  project: state.project.getByIdResult ? state.project.getByIdResult.data : {},
});

export default withRouter(connect(
  mapStateToProps,
  { add, getList, addGroup }
)(Interface));
