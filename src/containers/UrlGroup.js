import { connect } from 'react-redux';
import { UrlGroup } from '../components/Project';
import { update, updateUrl, add, del, getListByProjectId } from '../redux/urlGroup';
import { getProjectUrl } from '../redux/project';
import { getList as getEnvs } from '../redux/env';

const mapStateToProps = (state) => ({
  updateResult: state.urlGroup.updateResult,
  updateUrlResult: state.urlGroup.updateUrlResult,
  getProjectUrlResult: state.project.getProjectUrlResult,
  addResult: state.urlGroup.addResult,
  delResult: state.urlGroup.delResult,
  getEnvsResult: state.env.getListResult,
  getListByProjectIdResult: state.urlGroup.getListByProjectIdResult,
  isfetching: state.urlGroup.isfetching,
});

export default connect(
  mapStateToProps,
  { update, updateUrl, getProjectUrl, add, del, getListByProjectId, getEnvs }
)(UrlGroup);
