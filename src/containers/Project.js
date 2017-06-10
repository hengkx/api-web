import { connect } from 'react-redux';
import Project from '../components/Project';
import { getAllProject, addProject, delProject } from '../redux/project';

const mapStateToProps = (state) => ({
  addProjectResult: state.project.addProjectResult,
  getAllProjectResult: state.project.getAllProjectResult,
  delProjectResult: state.project.delProjectResult,
  isfetching: state.project.isfetching,
});

export default connect(
  mapStateToProps,
  { getAllProject, addProject, delProject }
)(Project);
