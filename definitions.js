/**
 * Created by karbunkul on 05.06.17.
 */


module.exports.raTest = {
  name: 'ra.test',
  args: {
    user: {
      dataType: 'vkUser',
    },
    arg: {
      dataType: 'number',
    },
  },
  callback: (args) => {
    return args;
  },
};
