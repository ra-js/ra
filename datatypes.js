/**
 * Created by karbunkul on 05.06.17.
 */

const request = require('request');

module.exports.vkUser = {
  type: 'vkUser',
  callback: (value) => {

    // const user = new Promise((resolve, reject) => {
    //   request(`https://api.vk.com/method/users.get?user_ids=${value}`, (err, response, body)=>{
    //     resolve(body);
    //     reject(err);
    //   });
    // });

    return Promise.resolve(value).then((resolve) => {
      return Promise.resolve(resolve).then((res) => {
        return res;
      });
    });
  },
};


