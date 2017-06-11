export default {
  Project: '/api/project',
  ProjectOper: '/api/project/:id',
  ProjectUrl: '/api/project/:id/url',
  ProjectUrlGroup: '/api/project/:id/urlgroup',
  EnvOper: '/api/project/:projectId/env/:id?',
  CheckUsernameExist: '/api/user/username/check',
  SignIn: '/api/user/signin',
  SignUp: '/api/user/signup',
  SendEmailCode: '/api/email/signup',
  UrlGroup: '/api/urlgroup',
  UrlGroupOper: '/api/urlgroup/:id',
  EditUrl: '/api/urlgroup/:urlGroup/url/:id',
};
