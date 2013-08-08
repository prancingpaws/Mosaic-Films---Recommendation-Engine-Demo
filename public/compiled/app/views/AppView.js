// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      _ref = AppView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppView.prototype.loginTemplate = '<div class="loginpage">\
    </div>';

    AppView.prototype.recommendationTemplate = '<div class="container-fluid">\
      <div class="row">\
        <div id="sidebar" class="col-6 col-lg-4">\
          sidebar\
          testing\
        </div>\
        <div id="main" class="col-6 col-lg-8">\
        body\
        testing\
        </div>\
      </div>\
      <div class="rlink" id="powered"><a href="https://github.com/guymorita/recommendationRaccoon" target="_blank">Powered by recommendationRaccoon (Node.js Module)</a></div>\
    </div>';

    AppView.prototype.initialize = function() {
      var _this = this;
      this.render();
      return this.loginView.on('userInfoReceived', function(userObject) {
        var index, movie, movieHash, user, userHash, _ref1, _ref2;
        _this.$el.html('');
        movieHash = {};
        _ref1 = userObject.allMovies;
        for (index in _ref1) {
          movie = _ref1[index];
          movieHash[movie._id] = movie.name;
        }
        userHash = {};
        _ref2 = userObject.allUsers;
        for (index in _ref2) {
          user = _ref2[index];
          userHash[user._id] = user.name;
        }
        userObject['movieLookup'] = movieHash;
        userObject['userLookup'] = userHash;
        _(_this.model.get('movieList')).extend({
          userObj: userObject
        });
        _(_this.model.get('recommendationList')).extend({
          userObj: userObject
        });
        _this.$el.append(_this.recommendationTemplate);
        _this.movieView = new MovieListView({
          model: _this.model.get('movieList')
        });
        _this.$('#sidebar').html(_this.movieView.el);
        _this.recommendationView = new RecommendationView({
          model: _this.model.get('recommendationList')
        });
        _this.$('#main').html(_this.recommendationView.el);
        return _this.movieView.on('newRating', function(ratingObject) {
          return _this.recommendationView.handleRating(ratingObject);
        });
      });
    };

    AppView.prototype.render = function() {
      this.$el.append(this.loginTemplate);
      this.loginView = new LoginView({
        model: this.model.get('loginInfo')
      });
      return this.$('.loginpage').html(this.loginView.el);
    };

    return AppView;

  })(Backbone.View);

}).call(this);

/*
//@ sourceMappingURL=AppView.map
*/
