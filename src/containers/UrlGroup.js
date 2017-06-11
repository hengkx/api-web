import { connect } from 'react-redux';
import { UrlGroup } from '../components/Project';
import { update, updateUrl } from '../redux/urlGroup';

const mapStateToProps = (state) => ({
  updateResult: state.urlGroup.updateResult,
  updateUrlResult: state.urlGroup.updateUrlResult,
  isfetching: state.urlGroup.isfetching,
});

export default connect(
  mapStateToProps,
  { update, updateUrl }
)(UrlGroup);
