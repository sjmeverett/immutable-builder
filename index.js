
var _ = require('lodash');

module.exports = {
  new: function (merge) {
    if (!merge) {
      return _.cloneDeep(this);

    } else if (_.isFunction(merge)) {
      var _this = this.new();
      merge.call(_this, _this);
      return _this;

    } else {
      var properties = {};

      _.forIn(merge, function _loop(value, key) {
        if (key[0] === '_') {
          properties[key.substring(1)] = function (value) {
            if (arguments.length) {
              var m = {};
              m[key] = value;
              return this.new(m);

            } else {
              return this[key];
            }
          };
        }
      });

      return _.mergeWith({}, properties, this, merge, function (objValue, srcValue) {
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      });
    }
  },

  equals: function (other) {
    return _.isEqual(this, other);
  }
};
