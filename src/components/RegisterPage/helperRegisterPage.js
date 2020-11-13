const helperRegisterPage = {
  detail: {
    title: function(member) {
      return `${member} profile`;
    },
  },
  edit: {
    title: function(member) {
      return `Edit ${member} profile`;
    },
  },
  create: {
    title: function() {
      return 'Register member';
    },
  },
};
export default helperRegisterPage;
