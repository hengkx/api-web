import { connect } from 'react-redux';
import { UrlGroup } from '../components/Project';
import { update, updateUrl, add, deleteUrlGroup, getUrlGroupByProject } from '../redux/urlGroup';
import { getProjectUrl } from '../redux/project';

const mapStateToProps = (state) => ({
  updateResult: state.urlGroup.updateResult,
  updateUrlResult: state.urlGroup.updateUrlResult,
  getProjectUrlResult: state.project.getProjectUrlResult,
  addResult: state.urlGroup.addResult,
  deleteUrlGroupResult: state.urlGroup.deleteUrlGroupResult,
  getUrlGroupByProjectResult: state.urlGroup.getUrlGroupByProjectResult,
  isfetching: state.urlGroup.isfetching,
});

export default connect(
  mapStateToProps,
  { update, updateUrl, getProjectUrl, add, deleteUrlGroup, getUrlGroupByProject }
)(UrlGroup);
