import React from 'react';
import JSEncrypt from 'jsencrypt';

class Regist extends React.Component {

  componentDidMount() {
    const encrypt = new JSEncrypt.JSEncrypt();

    // encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDwM2xWXTxblmLsUtr8Hg+pPsadbEDH2XPbXaMCGzSGtZNwg2wOMqC0c7hvFs71CEpiKp8rwX3+c/UbdX0q8bXmoaPIvOb2FZCuD9iLGjieXW/9MdKBtAIclwqIeedSgCN18e7J204asNBVc5vsuv5C/ckf6cQJv7apMIjggdXMCwIDAQAB');
    encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDwM2xWXTxblmLsUtr8Hg+pPsad
bEDH2XPbXaMCGzSGtZNwg2wOMqC0c7hvFs71CEpiKp8rwX3+c/UbdX0q8bXmoaPI
vOb2FZCuD9iLGjieXW/9MdKBtAIclwqIeedSgCN18e7J204asNBVc5vsuv5C/ckf
6cQJv7apMIjggdXMCwIDAQAB
-----END PUBLIC KEY-----`);
    const password = encrypt.encrypt('asd23@@^132456[]";');
    this.props.regist({
      username: 'hengkx',
      password,
      email: '519872449@qq.com'
    });
    console.log(password);
  }


  render() {
    return (
      <div>
        a
      </div>
    );
  }
}

export default Regist;
