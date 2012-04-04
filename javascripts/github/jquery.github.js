// 2012-04-04 added filter()
// ref: http://aboutcode.net/2010/11/11/list-github-projects-using-javascript.html

/**
 * Load a list of projects from Github
 *
 * @param String user The Github user who's projects you want to load.
 * @param Map options key/value pairs of optional settings for the list display.
 * @param Map tOptions key/value pairs of optional settings for the list itself.
 * @option Array includes Only include projects who names are declared here.
 */
jQuery.fn.loadRepositories = function(username, options, tOptions) {
  this.html("<span>Querying GitHub for repositories...</span>");

  function githubUser(username, callback) {
    jQuery.getJSON("http://github.com/api/v1/json/" + username + "?callback=?", callback);
  };

  var target = this;
  githubUser(username, function(data) {
    var repos = data.user.repositories;
    repos = filter(repos);
    sortByNumberOfWatchers(repos);

    var list = $('<dl/>');
    target.empty().append(list);
    $(repos).each(function() {
      list.append('<dt><a href="'+ this.url +'">' + this.name + '</a></dt>');
      list.append('<dd>' + this.description + '</dd>');
    });
  });

  function sortByNumberOfWatchers(repos) {
    repos.sort(function(a,b) {
      return b.watchers - a.watchers;
    });
  }

  function filter(repos) {
    if (tOptions && tOptions.includes){
      var repos = jQuery.grep(repos, function(item, i) {
        var result = jQuery.inArray(item.name, tOptions.includes);
        return (result >= 0 ? true : false);
      });
      return repos;
    }
  }
};