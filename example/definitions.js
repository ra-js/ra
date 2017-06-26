/**
 * Created by karbunkul on 05.06.17.
 */

module.exports.raTest = {
  name: 'ra.test',
  args: {
    user: {
      dataType: 'vkUser',
      // defaultValue: 'durov',
    },
  },
  callback: (args) => {
    return Promise.resolve(args);
  },
};
