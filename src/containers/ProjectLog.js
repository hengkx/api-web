import { connect } from 'react-redux';
import { Log } from '../components/Project';
import { add, getList, getLogList } from '../redux/project';

const mapStateToProps = (state) => ({
  addResult: state.project.addResult,
  getListResult: state.project.getListResult,
  getLogListResult: state.project.getLogListResult,
  project: state.project.getByIdResult ? state.project.getByIdResult.data : {},
});

export default connect(
  mapStateToProps,
  { add, getList, getLogList }
)(Log);
