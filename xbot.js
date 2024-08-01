const axios = require('axios');
const puppeteer2 = require('puppeteer-extra');
const puppeteer3 = require('puppeteer');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer2.use(StealthPlugin());
const { parse } = require('json2csv'); 
const fs = require('fs'); 

var USERNAMELIST = ['News1Lead']
var TOTALPAGES = 30;

const headers = {
  'accept': '*/*',
  'accept-language': 'es-ES,es;q=0.9',
  'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
  'content-type': 'application/json',
  'cookie': 'guest_id=v1%3A169958933556103101; kdt=PZ96YlgSsGFePdRIrq0ZIKlhuLWbWUKy6ZuEX4IB; auth_token=8b67c5bbeb93ddd8c8a03a3da268aa2d33162bbd; ct0=fbfc24a7d4e555317974a80973c6ffef535e5917c45312d31b6a5b9dc8a2b9293a767a17fd9fc69a6e84b122f8ed79c3753070d14c02cfb8d39cb7d23fa5d497344be5e8dffefcdd10ab74d102b328e7; twid=u%3D1536397811100667911; dnt=1; guest_id_marketing=v1%3A169958933556103101; guest_id_ads=v1%3A169958933556103101; _ga=GA1.2.249233131.1707347020; lang=en; _gid=GA1.2.89042474.1715442774; des_opt_in=Y; personalization_id="v1_VpcURetQ0C0TPrB25hKa0A=="',
  'referer': 'https://twitter.com/Digital_Diary1',
  'sec-ch-ua': '"Opera";v="109", "Not:A-Brand";v="8", "Chromium";v="123"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0',
  'x-client-transaction-id': 'nweWNzmdMg9s7cyj7vK2HaUE6mK5ZKgS8lYpJohhbZ2xYW/YSKxXLZ+51OWFJfh95U6ob54TY8G16MScGlCOBQceKgnKnA',
  'x-csrf-token': 'fbfc24a7d4e555317974a80973c6ffef535e5917c45312d31b6a5b9dc8a2b9293a767a17fd9fc69a6e84b122f8ed79c3753070d14c02cfb8d39cb7d23fa5d497344be5e8dffefcdd10ab74d102b328e7',
  'x-twitter-active-user': 'yes',
  'x-twitter-auth-type': 'OAuth2Session',
  'x-twitter-client-language': 'en'
};
var totalinfo_parsed = [];
async function getusernameid(USERNAME){

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://twitter.com/i/api/graphql/qW5u-DAuXpMEG0zA1F7UGQ/UserByScreenName?variables=%7B%22screen_name%22%3A%22${USERNAME}%22%2C%22withSafetyModeUserFields%22%3Atrue%7D&features=%7B%22hidden_profile_likes_enabled%22%3Atrue%2C%22hidden_profile_subscriptions_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22subscriptions_verification_info_is_identity_verified_enabled%22%3Atrue%2C%22subscriptions_verification_info_verified_since_enabled%22%3Atrue%2C%22highlights_tweets_tab_ui_enabled%22%3Atrue%2C%22responsive_web_twitter_article_notes_tab_enabled%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D&fieldToggles=%7B%22withAuxiliaryUserLabels%22%3Afalse%7D`,
  headers: { 
    'accept': '*/*', 
    'accept-language': 'es-ES,es;q=0.9', 
    'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA', 
    'content-type': 'application/json', 
    'cookie': 'guest_id=v1%3A169958933556103101; kdt=PZ96YlgSsGFePdRIrq0ZIKlhuLWbWUKy6ZuEX4IB; auth_token=8b67c5bbeb93ddd8c8a03a3da268aa2d33162bbd; ct0=fbfc24a7d4e555317974a80973c6ffef535e5917c45312d31b6a5b9dc8a2b9293a767a17fd9fc69a6e84b122f8ed79c3753070d14c02cfb8d39cb7d23fa5d497344be5e8dffefcdd10ab74d102b328e7; twid=u%3D1536397811100667911; dnt=1; guest_id_marketing=v1%3A169958933556103101; guest_id_ads=v1%3A169958933556103101; _ga=GA1.2.249233131.1707347020; lang=en; des_opt_in=Y; _gid=GA1.2.167415387.1715617925; personalization_id="v1_zf1+unZBplcTeegOq8OsMw=="', 
    'referer': 'https://twitter.com/Digital_Diary1', 
    'sec-ch-ua': '"Opera";v="109", "Not:A-Brand";v="8", "Chromium";v="123"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"Windows"', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-site': 'same-origin', 
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/109.0.0.0', 
    'x-client-transaction-id': 'pPylEQMuYhoiooeTQPyn89L5CAQJFO2qSGna624+rgIxiouXTNtlw3jTrSj7DcSKLy5VVqWvfsl5hrRMvySiFBJQXundpw', 
    'x-csrf-token': 'fbfc24a7d4e555317974a80973c6ffef535e5917c45312d31b6a5b9dc8a2b9293a767a17fd9fc69a6e84b122f8ed79c3753070d14c02cfb8d39cb7d23fa5d497344be5e8dffefcdd10ab74d102b328e7', 
    'x-twitter-active-user': 'yes', 
    'x-twitter-auth-type': 'OAuth2Session', 
    'x-twitter-client-language': 'en'
  }
};
var response = await axios.request(config)
var userid = response.data.data.user.result.rest_id
return userid
}
async function fetchData(USERID,cursor=false) {
  if(cursor!==false){
    var NEWCURSOR = `%7B%22userId%22%3A%22${USERID}%22%2C%22count%22%3A40%2C%22cursor%22%3A%22${cursor}%22%2C%22includePromotedContent%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D`
    var url = `https://twitter.com/i/api/graphql/9zyyd1hebl7oNWIPdA8HRw/UserTweets?variables=${NEWCURSOR}&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_media_interstitial_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D`
  }else{
    var url = `https://twitter.com/i/api/graphql/9zyyd1hebl7oNWIPdA8HRw/UserTweets?variables=%7B%22userId%22%3A%22${USERID}%22%2C%22count%22%3A200%2C%22includePromotedContent%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_media_interstitial_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D`;
  }
  try {
    const response = await axios.get(url, { headers });
    const TIMELINES = response.data.data.user.result.timeline_v2.timeline.instructions;
     
     
    let CURSOR;
    const TODOS = [];
    //console.log(response.data)
    TIMELINES.forEach(ele => {
      if (ele.type === 'TimelineAddEntries') {
         
        ele.entries.forEach(entry => {
          try {
            let TWEET_INFO;
            if (entry.content.itemContent.tweet_results) {
              TWEET_INFO = entry.content.itemContent.tweet_results.result.note_tweet.note_tweet_results.result;
            } else if (entry.entryId.startsWith('tweet-')) {
              TWEET_INFO = entry.content.itemContent.tweet_results.result.legacy;
            }

            const FULLSTEXT = TWEET_INFO.text;
            const URLSX = TWEET_INFO.entity_set.urls || TWEET_INFO.entities.urls;
            const TAGGED_USERS = TWEET_INFO.entity_set.user_mentions || TWEET_INFO.entities.user_mentions;

            const PARSSEDINFOO = {
              tagged: TAGGED_USERS ? TAGGED_USERS.map(x => `${x.screen_name}|${x.id_str}`) : [],
              urls: URLSX ? URLSX.map(x => x.expanded_url) : [],
              text: FULLSTEXT
            };

            //console.log('V1');
            //console.log(PARSSEDINFOO);
            TODOS.push(PARSSEDINFOO);
          } catch (error) {
             
          }

          if(entry.entryId.startsWith("cursor-bottom")){
            CURSOR = entry.content.value;
          }

        });
      }else if(ele.type === 'TimelinePinEntry'){
        var TWEET_INFO = ele.entry.content.itemContent.tweet_results.result.note_tweet.note_tweet_results.result
        console.log('PINNED TEXT')
         
        const FULLSTEXT = TWEET_INFO.text;
        const URLSX = TWEET_INFO.entity_set.urls 
        const TAGGED_USERS = TWEET_INFO.entity_set.user_mentions 
        const PARSSEDINFOO = {
          tagged: TAGGED_USERS ? TAGGED_USERS.map(x => `${x.screen_name}|${x.id_str}`) : [],
          urls: URLSX ? URLSX.map(x => x.expanded_url) : [],
          text: FULLSTEXT
        }; 
        TODOS.push(PARSSEDINFOO); 
      }
    });
    return [TODOS,CURSOR];
  } catch (error) {
    console.error('Error:', error);
  }
}
function writeToCSV(data, filePath) {
  // Encabezados para el archivo CSV
  const fields = ['Website', 'Twitter Links', 'Telegram Links', 'Discord Links', 'LinkedIn Links', 'Facebook Links', 'Instagram Links', 'Emails'];

  try {
      // Convertir datos a formato CSV
      const csvData = data.map(item => ({
          Website: item.website,
          'Twitter Links': item.links.twitter ? item.links.twitter.join(', ') : null,
          'Telegram Links': item.links.telegram ? item.links.telegram.join(', ') : null,
          'Discord Links': item.links.discord ? item.links.discord.join(', ') : null,
          'LinkedIn Links': item.links.linkedin ? item.links.linkedin.join(', ') : null,
          'Facebook Links': item.links.facebook ? item.links.facebook.join(', ') : null,
          'Instagram Links': item.links.instagram ? item.links.instagram.join(', ') : null,
          Emails: item.emails ? item.emails.join(', ') : null
      }));

      const csv = parse(csvData, { fields });

      // Escribir datos en el archivo
      fs.writeFileSync(filePath, csv);

      console.log('CSV file created successfully!');
  } catch (err) {
      console.error('Error writing to CSV:', err);
  }
}
async function parsedata(total, page) {
  for (let i = 0; i < total.length; i++) {
    for (let X = 0; X < total[i]['urls'].length; X++) {
      try {
        await page.goto(total[i]['urls'][X], { timeout: 6000000 });
        const html = await page.content();

        // Use regular expressions to find emails in the HTML content
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emails = html.match(emailRegex);
        var infox = {};

        const twitterRegex = /https:\/\/twitter\.com\/\w+/g;
        const telegramRegex = /https:\/\/t\.me\/\w+/g;
        const discordRegex = /https:\/\/discord\.gg\/[\w-]+/g;
        const linkedinRegex = /https:\/\/www\.linkedin\.com\/company\/\w+/g;
        const facebookRegex = /https:\/\/www\.facebook\.com\/\w+/g;
        const instagramRegex = /https:\/\/www\.instagram\.com\/\w+/g;

        const twitterLinks = html.match(twitterRegex);
        const telegramLinks = html.match(telegramRegex);
        const discordLinks = html.match(discordRegex);
        const linkedinLinks = html.match(linkedinRegex);
        const facebookLinks = html.match(facebookRegex);
        const instagramLinks = html.match(instagramRegex);

        infox['links'] = {
          'twitter': twitterLinks,
          'telegram': telegramLinks,
          'discord': discordLinks,
          'linkedin': linkedinLinks,
          'facebook': facebookLinks,
          'instagram': instagramLinks
        };
        infox['emails'] = emails;
        infox['website'] = total[i]['urls'][X];
        totalinfo_parsed.push(infox);
      } catch (error) {
        console.error(`Error navigating to ${total[i]['urls'][X]}:`, error.message);
        continue;
      }
    }
  }
}

(async () => {
  const browser = await puppeteer2.launch({ headless: false, args: [], slowMo: 20 });
  const page = await browser.newPage();

  for (let i = 0; i < USERNAMELIST.length; i++) {
    var USERID = await getusernameid(USERNAMELIST[i]);

    console.log(`USERNAME: ${USERNAMELIST[i]} => ${USERID}`);
    var cursor = null;

    for (let i = 1; i < TOTALPAGES + 1; i++) {
      console.log('GETTING TWEET PAGE: ', i.toString());
      if (cursor === null) {
        var total = await fetchData(USERID);
        cursor = total[1];
        await parsedata(total[0], page);
      } else {
        var pagestwo = await fetchData(USERID, cursor);
        cursor = pagestwo[1];
        await parsedata(pagestwo[0], page);
      }
    }
    console.log(totalinfo_parsed);
    writeToCSV(totalinfo_parsed, USERNAMELIST[i] + 'scrapped_info.csv');
  }

  await browser.close();
})();