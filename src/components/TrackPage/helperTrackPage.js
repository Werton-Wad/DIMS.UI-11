const helperTrackPage = {
  detail: {
    title: function(taskName) {
      return `About task track - ${taskName}`;
    },
  },
  edit: {
    title: function(taskName) {
      return `Task track - ${taskName}`;
    },
  },
  create: {
    title: function() {
      return 'Create track';
    },
  },
};

export default helperTrackPage;
