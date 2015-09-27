
require('dotenv').load();

var FirebaseClient = require('firebase');
var Firebase = new FirebaseClient(process.env.firebase_url).child("tweets");


var tweet = { created_at: 'Sat Sep 26 19:04:56 +0000 2015',
  id: 647849352225030100,
  id_str: '647849352225030145',
  text: "#grapevine-syria This is a test!",
  source: '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
  truncated: false,
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user:
   { id: 35559818,
     id_str: '35559818',
     name: 'Ptolemy',
     screen_name: 'guacamolay',
     location: 'London',
     url: 'http://detachedhead.wordpress.com',
     description: 'Coder; Coachineer at @makersacademy. For the spirit over the letter.',
     protected: false,
     verified: false,
     followers_count: 83,
     friends_count: 164,
     listed_count: 5,
     favourites_count: 2,
     statuses_count: 56,
     created_at: 'Sun Apr 26 20:44:40 +0000 2009',
     utc_offset: 32400,
     time_zone: 'Seoul',
     geo_enabled: false,
     lang: 'en',
     contributors_enabled: false,
     is_translator: false,
     profile_background_color: 'C0DEED',
     profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
     profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
     profile_background_tile: false,
     profile_link_color: '0084B4',
     profile_sidebar_border_color: 'C0DEED',
     profile_sidebar_fill_color: 'DDEEF6',
     profile_text_color: '333333',
     profile_use_background_image: true,
     profile_image_url: 'http://pbs.twimg.com/profile_images/569516987642953728/O8SYOaSj_normal.jpeg',
     profile_image_url_https: 'https://pbs.twimg.com/profile_images/569516987642953728/O8SYOaSj_normal.jpeg',
     profile_banner_url: 'https://pbs.twimg.com/profile_banners/35559818/1427972050',
     default_profile: true,
     default_profile_image: false,
     following: null,
     follow_request_sent: null,
     notifications: null },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  retweet_count: 0,
  favorite_count: 0,
  entities:
   { hashtags: [ [Object] ],
     trends: [],
     urls: [],
     user_mentions: [],
     symbols: [] },
  favorited: false,
  retweeted: false,
  possibly_sensitive: false,
  filter_level: 'low',
  lang: 'en',
  timestamp_ms: '1443294296686' }

var TweetHandler = require("./tweetHandler.js"); 
TweetHandler.build(tweet, function(tweetData) {
  console.log(tweetData);
  TweetHandler.toFirebase(Firebase, tweetData)
});


