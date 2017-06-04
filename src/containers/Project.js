import { connect } from 'react-redux';
import Project from '../components/Project';
import { getAllProject, addProject } from '../redux/project';

const mapStateToProps = (state) => ({
  addProjectResult: state.project.addProjectResult,
  getAllProjectResult: state.project.getAllProjectResult,
  isfetching: state.project.isfetching,
});

export default connect(
  mapStateToProps,
  { getAllProject, addProject }
)(Project);
