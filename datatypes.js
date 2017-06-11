/**
 * Created by karbunkul on 05.06.17.
 */

const request = require('request');

module.exports.vkUser = {
  type: 'vkUser',
  callback: (value) => {
    return new Promise((resolve, reject) => {
      request(`https://api.vk.com/method/users.get?user_ids=${value}`,
        (err, response, body) => {
          const user = JSON.parse(body);
          resolve(user.response[0]);
          reject(err);
        });
    });
  },
};
