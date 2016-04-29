
var _ = require('lodash');
var expect = require('chai').expect;
var Immutable = require('../index');


describe('Immutable', function () {
  describe('new', function () {
    it('performs a deep copy', function () {
      var i = Immutable.new();
      i.foo = {a: {b: 1}};
      var j = i.new();
      expect(i.foo.a).to.not.equal(j.foo.a);
    });

    it('does a merge if given an object', function () {
      var i = Immutable.new({foo: 1});
      expect(i.foo).to.equal(1);
      expect(Immutable.foo).to.not.exist;
    });

    it('accepts a mutator function', function () {
      var i = Immutable.new((x) => x.foo = 5);
      expect(i.foo).to.equal(5);
      expect(Immutable.foo).to.not.exist;
    });

    it('adds getter/setter method for properties starting with _', function () {
      var i = Immutable.new({
        _foo: 1
      });

      expect(i.foo).to.exist;
      expect(i.foo).to.be.a('function');
      expect(i.foo()).to.equal(1);
      var j = i.foo(5);
      expect(i.foo()).to.equal(1);
      expect(j.foo()).to.equal(5);
      expect(j._foo).to.equal(5);
    });

    it('doesn\'t have the var bug', function () {
      var i = Immutable.new({
        _foo: 1,
        _bar: 2
      }).foo(3);

      expect(i._foo).to.equal(3);
    });

    it('allows getter/setter to be overridden', function () {
      var i = Immutable
        .new({
          foo() { return 'foo'; }
        })
        .new({
          _foo: 5
        });

      expect(i.foo()).to.equal('foo');
    });
  });

  describe('equals', function () {
    it('should deeply compare', function () {
      expect(Immutable.new({a: {b: 2}}).equals(Immutable.new((x) => x.a = {b: 2}))).to.be.true;
      expect(Immutable.equals(Immutable)).to.be.true;
      expect(Immutable.equals(Immutable.new())).to.be.true;
      expect(Immutable.equals(Immutable.new({a: 1}))).to.be.false;
    });
  });
});
