import { connect } from 'react-redux';
import { Detail } from '../components/Project';
import { getProjectById, projectUpdateEnv } from '../redux/project';

const mapStateToProps = (state) => ({
  getProjectByIdResult: state.project.getProjectByIdResult,
  projectUpdateEnvResult: state.project.projectUpdateEnvResult,
  isfetching: state.project.isfetching,
});

export default connect(
  mapStateToProps,
  { getProjectById, projectUpdateEnv }
)(Detail);
