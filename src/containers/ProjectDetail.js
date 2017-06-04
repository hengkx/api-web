import { connect } from 'react-redux';
import { Detail } from '../components/Project';
import { getProjectById, addProject } from '../redux/project';

const mapStateToProps = (state) => ({
  addProjectResult: state.project.addProjectResult,
  getProjectByIdResult: state.project.getProjectByIdResult,
  isfetching: state.project.isfetching,
});

export default connect(
  mapStateToProps,
  { getProjectById, addProject }
)(Detail);
