var context, analyser, source, audio, oaudio, compressor, gain, timeouts, preloaders, nosleep, lastlink;
if (window.AudioContext || window.webkitAudioContext) {
  context = new (window.AudioContext || window.webkitAudioContext)();
  analyser = context.createAnalyser();
  compressor = context.createDynamicsCompressor();
  gain = context.createGain();
  compressor.threshold.value = -100;
  gain.gain.value = 0;
} else {
  document.getElementById('notSupported').setAttribute('style', 'display: block;');
}
audio = new Audio();
oaudio = new Audio();
nosleep = new NoSleep();
timeouts = {};
preloaders = [];

//noinspection JSUnusedGlobalSymbols
var vm = new Vue({
  el: 'body',

  data: {
    token: -2,
    stream: '',
    loading: true,
    incompatible: false,
    durationPercent: 0,
    bufferPercent: 0,
    backgroundColor: '#FFF',
    type: 'music',
    title: '',
    counter: 0,
    artist: 'Vybroo',
    location: '',
    image: '',
    message: '',
    displayMessage: false,
    mobileplay: false,
    muted: false,
    silenceCount: 0,
    dBChange: 0,
    skipOnSilence: false,
    debugMode: localStorage.debug,
    displayBrands: false,
    halt: false,
    brands: [],
    errorCount: 1,
    errorState: false,
    errorTo: 0,
    analytics: '',
    music_volume: 100,
    spots_volume: 100,
    silence_from: 0,
    silence_to: 0,
    liked: 0,
    lat: 0,
    lon: 0,
    oaudios: [],
    showOAudios: false,
    showOAudio: false,
    showSideMenu: false,
    lastHearbeat: 0,
    trackid: localStorage.trackid
  },

  created: function () {
    var incompatible = !context || window.navigator.userAgent.match(/Firefox/);
    var self = this;
    // Firefox doesn't support m4a because of licensing issues
    if (incompatible) return; // browser isn't supported
    source = context.createMediaElementSource(audio);
    source.connect(compressor);
    compressor.connect(gain);
    source.connect(context.destination);
    gain.connect(context.destination);
    if(window.location.hash == '' && localStorage.lastlink) {
      window.location.hash = localStorage.lastlink;
    }
    audio.addEventListener('ended', this.handleEnded);
    audio.addEventListener('error', this.handleAudioError);
    window.addEventListener('hashchange', this.loadClient);
    window.onbeforeunload = this.saveCurrentState;
    window.addEventListener('keyup', function (e) {
      if (e.keyCode != 27) {
        return;
      }
      self.showSideMenu = false;
    });
    this.loadClient();
    this.serviceLoop();
  },

  methods: {

    saveTrackID: function() {
      localStorage.trackid = this.trackid || '';
      document.querySelector('.trackid input').blur()
    },

    endOAudio: function () {
      this.showOAudio = false;
      oaudio.src = '';
      audio.play()
    },

    playOAudio: function (src) {
      var self = this;
      if (self.errorState) {
        return self.show_message('Se esta arreglando un error de reproducción, intentelo mas adelante');
      }
      self.showOAudios = false;
      self.showOAudio = true;
      oaudio.removeEventListener('ended', self.endOAudio);
      oaudio.addEventListener('ended', self.endOAudio);
      oaudio.src = '/a/spots/' + src;
      audio.pause();
      oaudio.play();
    },

    stopOAudio: function () {
      oaudio.removeEventListener('ended', self.endOAudio);
      this.endOAudio();
    },

    processLike: function (to, self) {
      if (self.title == 'Error de reproducción') return;
      var now = new Date();
      now = now.getFullYear() + '_' + now.getMonth() + '_' + now.getDate();
      var key = now + '_token_' + self.token + '_' + self.stream;
      localStorage[key] = to;
      var data = {
        title: self.title,
        artist: self.artist,
        type: self.type,
        location: self.location,
        stream: self.stream,
        token: self.token,
        lat: self.lat,
        lon: self.lon,
        time: audio.currentTime,
        liked: to
      };
      self.$http.post('/survey', data);
    },

    likecontent: function () {
      if (this.liked != 0) return;
      this.liked = 1;
      this.processLike(1, this);
      console.log('liked!');

    },

    dislikecontent: function () {
      if (this.liked != 0) return;
      this.liked = 2;
      this.processLike(2, this);
      console.log('disliked!');
    },

    show_message: function (message, permanent) {
      var self = this;
      this.log(message);
      self.message = message;
      self.displayMessage = true;
      clearTimeout(timeouts.alertTimeout);
      if (!permanent) {
        timeouts.alertTimeout = setTimeout(function () {
          self.displayMessage = false;
        }, 4000);
      }
    },

    silencePeriod: function () {
      var self = this;
      var date = new Date();
      var now = date.getHours() * 60 + date.getMinutes();
      if (self.silence_to < self.silence_from)
        return now <= self.silence_to || now >= self.silence_from;
      return now >= self.silence_from && now <= self.silence_to;
    },

    playNext: function () {
      var self = this;
      if (self.halt) return;
      self.errorState = false;
      self.token = parseInt(self.token) + 1;
      self.silenceCount = 0; // reset the silence count on a new audio
      clearTimeout(timeouts.retryNext);
      clearTimeout(timeouts.silencePeriod);
      // checks if it's inside a silence period
      if (self.silencePeriod()) { // If it's inside the range of a silence wait a minute
        self.log();
        self.title = 'Periodo de silencio';
        self.artist = 'Vybroo';
        return timeouts.silencePeriod = setTimeout(self.playNext, 60000);
      }
      this.log('Requesting [' + self.token + ']');
      this.$http.post('/api', {token: this.token, stream: this.stream, cid: this.trackid})
        .then(function (r) {
          if (r.data.code != 200) {
            self.handleError(r.data);
            clearTimeout(timeouts.retryNext);
            return timeouts.retryNext = setTimeout(self.playNext, 1000);
          }
          self.log(r);
          if (r.data.type == 'time') {
            r.data.file = self.timeAudio();
            r.data.title = "Hora";
          }
          self.type = r.data.type;
          self.title = r.data.title || '';
          self.artist = r.data.artist || 'Vybroo';
          self.token = r.data.token;

          var now = new Date();
          now = now.getFullYear() + '_' + now.getMonth() + '_' + now.getDate();
          var key = now + '_token_' + self.token + '_' + self.stream;
          self.liked = localStorage[key] ? localStorage[key] : 0;

          audio.volume = self.type == 'song' ? self.music_volume / 100 : self.spots_volume / 100;
          if (self.muted) audio.volume = 0;
          self.location = r.data.file.replace(/( )+.m4a$/i, '.m4a');
          audio.src = r.data.file.replace(/( )+.m4a$/i, '.m4a');
          audio.currentTime = self.savedState();
          audio.play();
        })
        .catch(function (e) {
          self.log(e);
          self.token = parseInt(self.token) - 1;
          self.show_message('Intentando conectarse al servidor...');
          clearTimeout(timeouts.retryNext);
          timeouts.retryNext = setTimeout(self.playNext, 2000);
        });
    },

    changeHash: function (to) {
      window.location.hash = to;
    },

    savedState: function () {
      if (!localStorage.audioState) return 0;
      var state = localStorage.audioState.split('|');
      if (state[0] == this.token && state[1] == this.stream) return parseInt(state[2]);
      return 0;
    },

    saveCurrentState: function () {
      if (!audio.paused) {
        localStorage.audioState = this.token + "|" + this.stream + "|" + audio.currentTime;
      }
    },

    handleEnded: function () {
      this.errorCount = 1;
      this.durationPercent = 0;
      this.playNext();
    },

    handleError: function (e) {
      this.log(e);
      this.show_message(e.message || "Ocurrio un error");
    },

    handleAudioError: function () {
      this.log('Audio playback error!');
      clearTimeout(timeouts.retryNext);
      this.title = 'Error de reproducción';
      this.artist = 'Reintentando en ' + this.errorCount + ' segundos';
      this.errorState = true;
      this.errorTo = (new Date()).valueOf() + this.errorCount * 1000;
      timeouts.retryNext = setTimeout(this.playNext, this.errorCount * 1000);
      this.errorCount = this.errorCount * 2 > 64 ? 64 : this.errorCount * 2;
    },

    heartbeatDue: function() {
      var now = (new Date()).valueOf();
      return now - this.lastHearbeat >= 600000;
    },

    serviceLoop: function () {
      var self = this;
      if (self.errorState) {
        var now = (new Date()).valueOf();
        self.durationPercent = 0;
        self.bufferPercent = ((vm.errorCount * 1000) - (vm.errorTo - now)) / (vm.errorCount * 10);
      } else {
        self.durationPercent = (audio.currentTime / audio.duration) * 100;
        if (audio.buffered.length) {
          var bufferIndex = audio.buffered.length - 1;
          self.bufferPercent = (audio.buffered.end(bufferIndex) / audio.duration) * 100;
        }
      }
      setTimeout(self.serviceLoop, 500); // Recursiveness!
    },

    cleanHash: function () {
      var rawHash = window.location.hash.match(/[a-z0-9]/gi);
      if (!rawHash) return "";
      return rawHash.join('');
    },

    displayClientsList: function (clients) {
      audio.pause();
      var self = this;
      self.loading = false;
      self.displayBrands = true;
      self.brands = clients;
    },

    convertToMinutes: function (time) {
      var split = time.split(':');
      return parseInt(split[0]) * 60 + parseInt(split[1]);
    },

    loadClient: function () {
      var self = this;
      self.loading = true;
      self.displayBrands = false;
      audio.pause();
      clearTimeout(timeouts.retryNext);
      clearTimeout(timeouts.silencePeriod);
      self.$http.post('/client', {id: self.cleanHash()})
        .then(function (r) {
          this.log(r);
          if (r.data.error) return self.handleError(r.data);
          if (r.data.clients)  return self.displayClientsList(r.data.clients);
          // adding the manifest for web apps
          var link = document.createElement('link');
          link.setAttribute('rel', 'manifest');
          link.setAttribute('href', '/' + this.cleanHash() + '/manifest.json');
          document.getElementsByTagName('head')[0].appendChild(link);
          document.querySelector('meta[name=theme-color]').content = "#" + r.data.color;
          try {
            localStorage.lastlink = window.location.hash.replace(/#/, '')
          } catch(e) {}
          self.backgroundColor = '#' + r.data.color;
          self.image = '/images/' + r.data.image;
          self.counter = r.data.counter || 0;
          self.stream = r.data.stream;
          self.oaudios = r.data.oaudios || [];
          self.token = -2;
          self.loading = false;
          self.silence_from = self.convertToMinutes(r.data.silence_from);
          self.silence_to = self.convertToMinutes(r.data.silence_to);

          var intros = [
            '75ceca320aa4357e195fea2b8e6126c2.m4a',
            'c2816ccf56916d578142275d1d0e8a47.m4a',
            'b835d3442c1e68d31a7ca67dad59a6f0.m4a'
          ];

          if(r.data.play_intro && !document.cookie.match(/intro_played/)) {
            var src = intros[Math.floor(Math.random() * 3)];
            window.audio.src = '/a/spots/' + src;
            window.audio.play();
            document.cookie = 'intro_played=true; max-age=' + (60 * 60 * 24);
          } else {
            self.playNext();
          }
          window.ga("create", "UA-77920400-1", "auto");
          window.ga("send", "pageview");
          if (r.data.analytics) {
            window.ga("create", r.data.analytics, "auto", {name: 'client'});
            window.ga("client.send", "pageview")
          }
          self.music_volume = r.data.music_volume > 0 && r.data.music_volume < 100 ? r.data.music_volume : 100;
          self.spots_volume = r.data.spots_volume > 0 && r.data.spots_volume < 100 ? r.data.spots_volume : 100;
          var pref = window.location.protocol + "//" + window.location.hostname + "/images/";
          var icons = document.querySelectorAll('[data-icon]');
          for (var i = 0; i < icons.length; i++) {
            icons[i].href = pref + r.data.mobileimage;
          }
          var mobile = /Android|iPhone|iPad|iPod|BlackBerry/i;
          if (mobile.test(navigator.userAgent)) self.mobileplay = true;
          document.title = r.data.name || 'Vybroo';
        }).catch(this.handleError);
    },

    forceplay: function () {
      audio.play();
      if(nosleep) {
        nosleep.enable();
      }
      this.mobileplay = false;
    },

    mute: function () {
      this.muted = !this.muted;
      var unmuted = this.type == 'song' ? this.music_volume / 100 : this.spots_volume / 100;
      audio.volume = this.muted ? 0 : unmuted;
    },

    reload: function() {
      window.location.reload();
    },

    isSilenced: function () {
      return false; // To be implemented, this method broke on chrome 52
      // this.dBChange = compressor.reduction.value.toString().substr(0, 5);
      // return compressor.reduction.value >= -50
    },

    timeAudio: function () {
      var current = new Date();
      current = (current.getHours() * 60 + current.getMinutes()) % 720;
      return '/a/music/Time/' + current + '.m4a';
    },

    log: function (data) {
      if (localStorage.debug) console.log(data);
    },

    showVybroo: function () {
      window.open('http://vybroo.com');
    }
  }

});