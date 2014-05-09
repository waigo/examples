"use strict";


exports.index = function*(next) {
  yield* this.render('index', {
    text: 'Hello world!'
  });
};
