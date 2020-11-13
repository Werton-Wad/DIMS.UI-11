const helperTaskPage = {
  detail: {
    title: function(taskName) {
      return `About task - ${taskName}`;
    },
  },
  edit: {
    title: function(taskName) {
      return `Task - ${taskName}`;
    },
  },
  create: {
    title: function() {
      return 'Create task';
    },
  },
};

export default helperTaskPage;
