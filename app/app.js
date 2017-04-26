angular.module('searchMusicApp', [])
    .controller('MainCtrl', ['$http', function ($http) {
        var vm = this;

        vm.searchText = "Search for artist or album title";
        vm.cache = {};

        vm.search = function (searchText) {
            $http.get('https://api.spotify.com/v1/search?type=album,artist&q=' + encodeURIComponent(searchText))
                .then(function (res) {
                    var albums, artists = [];
                    if (res.data) {
                        if (res.data.albums && Array.isArray(res.data.albums.items)) {
                            albums = res.data.albums.items;
                        }
                        if (res.data.artists && Array.isArray(res.data.artists.items)) {
                            artists = res.data.artists.items;
                        }
                    }

                    vm.results = albums.concat(artists);
                    console.log('get results', vm.results);
                }).catch(function (err) {
                    console.log('errors! ', err);
                });
        };

        vm.getList = function (result) {
            console.log('result', result);
            if (vm.cache[result.id]) {
                console.log('get from cache!', vm.cache[result.id]);

                vm.items = vm.cache[result.id];
                return;
            }

            if (result.type === 'album') {
                // get album
                $http.get('https://api.spotify.com/v1/albums/' + result.id)
                    .then(function (res) {
                        console.log('getting album!', res);
                        var tracks = [];
                        if (res.data) {
                            if (res.data.tracks && Array.isArray(res.data.tracks.items)) {
                                tracks = res.data.tracks.items;
                            }
                        }
                        vm.items = vm.cache[result.id] = tracks;
                        console.log('get items', vm.items);
                    }).catch(function (err) {
                        console.log('errors! ', err);
                    });
            }
            if (result.type === 'artist') {
                // get artist
                $http.get('https://api.spotify.com/v1/artists/' + result.id + '/albums')
                    .then(function (res) {
                        console.log('getting artists albums!', res);
                        var albums = [];
                        if (res.data) {
                            if (res.data && Array.isArray(res.data.items)) {
                                albums = res.data.items;
                            }
                        }
                        vm.items = vm.cache[result.id] = albums;
                        console.log('get items', vm.items);
                    }).catch(function (err) {
                        console.log('errors! ', err);
                    });
            }
        };

    }]);
