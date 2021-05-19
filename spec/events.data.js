module.exports = {
  stayIsTrueAndScheduleHasDate: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":true,"schedule":"201-05-06"}',
  },

  stayIsTrueAndScheduleHasEmpty: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":true,"schedule":{}}',
  },

  stayIsTrueAndScheduleIsNull: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":true,"schedule":null}',
  },

  stayIsFalseAndScheduleHasDate: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":false,"schedule":"201-05-06"}',
  },

  stayIsFalseAndScheduleHasEmpty: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":false,"schedule":{}}',
  },

  stayIsFalseAndScheduleIsNull: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":false,"schedule":null}',
  },

  stayIsNullAndScheduleHasDate: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":null,"schedule":"201-05-06"}',
  },

  stayIsNullAndScheduleHasEmpty: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":null,"schedule":{}}',
  },

  stayIsNullAndScheduleIsNull: {
    pathParameters: {
      id: 1,
    },
    body: '{"is_stay":null,"schedule":null}',
  },
};
