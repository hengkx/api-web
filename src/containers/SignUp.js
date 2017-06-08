import { connect } from 'react-redux';
import { SignUp } from '../components/Account';
import { signUp, checkUsernameExist } from '../redux/account';
import { sendEmailCode } from '../redux/email';

const mapStateToProps = (state) => ({
  signUpResult: state.account.signUpResult,
  checkUsernameExistResult: state.account.checkUsernameExistResult,
  sendEmailCodeResult: state.email.sendEmailCodeResult,
  isfetching: state.account.isfetching,
});

export default connect(
  mapStateToProps,
  { signUp, checkUsernameExist, sendEmailCode }
)(SignUp);
