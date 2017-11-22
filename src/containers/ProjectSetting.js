import { connect } from 'react-redux';
import { Setting } from '../components/Project';
import { add, addMember, removeMember, getById } from '../redux/project';

const mapStateToProps = (state) => ({
  addResult: state.project.addResult,
  addMemberResult: state.project.addMemberResult,
  removeMemberResult: state.project.removeMemberResult,
  project: state.project.getByIdResult ? state.project.getByIdResult.data : {},
});

export default connect(
  mapStateToProps,
  { add, addMember, removeMember, getById }
)(Setting);
