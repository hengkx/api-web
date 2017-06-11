import { connect } from 'react-redux';
import { Detail } from '../components/Project';
import { getProjectById, projectUpdateEnv, projectAddEnv } from '../redux/project';

const mapStateToProps = (state) => ({
  getProjectByIdResult: state.project.getProjectByIdResult,
  projectUpdateEnvResult: state.project.projectUpdateEnvResult,
  projectAddEnvResult: state.project.projectAddEnvResult,
  isfetching: state.project.isfetching,
});

export default connect(
  mapStateToProps,
  { getProjectById, projectAddEnv, projectUpdateEnv }
)(Detail);
