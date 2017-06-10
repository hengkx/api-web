import { connect } from 'react-redux';
import { Detail } from '../components/Project';
import { getProjectById, addProject, projectUpdateEnv } from '../redux/project';
import { update, updateUrl } from '../redux/urlGroup';

const mapStateToProps = (state) => ({
  addProjectResult: state.project.addProjectResult,
  getProjectByIdResult: state.project.getProjectByIdResult,
  projectUpdateEnvResult: state.project.projectUpdateEnvResult,
  updateResult: state.urlGroup.updateResult,
  isfetching: state.project.isfetching,
});

export default connect(
  mapStateToProps,
  { getProjectById, addProject, projectUpdateEnv, update, updateUrl }
)(Detail);
