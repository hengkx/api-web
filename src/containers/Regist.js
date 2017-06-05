import { connect } from 'react-redux';
import { Regist } from '../components/Account';
import { regist } from '../redux/account';

const mapStateToProps = (state) => ({
  registResult: state.account.registResult,
  isfetching: state.account.isfetching,
});

export default connect(
  mapStateToProps,
  { regist }
)(Regist);
