
var _ = require('lodash');

module.exports = {
  new: function (merge) {
    if (!merge) {
      return _.cloneDeep(this);

    } else if (_.isFunction(merge)) {
      var _this = this.new();
      merge(_this);
      return _this;

    } else {
      var properties = {};

      for (var k in merge) {
        if (k[0] === '_') {
          properties[k.substring(1)] = function (value) {
            if (arguments.length) {
              return this.new((x) => x[k] = value);

            } else {
              return this[k];
            }
          };
        }
      }

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
