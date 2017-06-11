import { connect } from 'react-redux';
import { Detail } from '../components/Project';
import { getProjectById, projectUpdateEnv, projectAddEnv, projectDeleteEnv } from '../redux/project';

const mapStateToProps = (state) => ({
  getProjectByIdResult: state.project.getProjectByIdResult,
  projectUpdateEnvResult: state.project.projectUpdateEnvResult,
  projectAddEnvResult: state.project.projectAddEnvResult,
  projectDeleteEnvResult: state.project.projectDeleteEnvResult,
  isfetching: state.project.isfetching,
});

export default connect(
  mapStateToProps,
  { getProjectById, projectAddEnv, projectUpdateEnv, projectDeleteEnv }
)(Detail);
