import { parseString } from 'xml2js';
import { createAllBlogsEntry, newBlogEntry, getBlogByCompanyName, newBlogPostEntry, createBlogPostEntry } from '../db/query';

// <outline type="rss" text="8th Light" title="8th Light" xmlUrl="https://8thlight.com/blog/feed/atom.xml" htmlUrl="https://8thlight.com/blog/"/>
//       <outline type="rss" text="Airbnb" title="Airbnb" xmlUrl="https://medium.com/feed/airbnb-engineering" htmlUrl="https://medium.com/airbnb-engineering"/>
//       <outline type="rss" text="Algolia" title="Algolia" xmlUrl="https://blog.algolia.com/feed/" htmlUrl="https://blog.algolia.com/"/>
//       <outline type="rss" text="Atlassian" title="Atlassian" xmlUrl="https://developer.atlassian.com/blog/feed.xml" htmlUrl="https://developer.atlassian.com/blog/"/>
//       <outline type="rss" text="Auth0" title="Auth0" xmlUrl="https://auth0.com/blog/rss.xml" htmlUrl="https://auth0.com/blog/"/>
//       <outline type="rss" text="AWS" title="AWS" xmlUrl="https://aws.amazon.com/blogs/aws/feed/" htmlUrl="https://aws.amazon.com/blogs/aws/"/>
//       <outline type="rss" text="BBC" title="BBC" xmlUrl="https://medium.com/feed/bbc-design-engineering" htmlUrl="https://medium.com/bbc-design-engineering/"/>
//       <outline type="rss" text="BitTorrent" title="BitTorrent" xmlUrl="https://engineering.bittorrent.com/feed/" htmlUrl="http://engineering.bittorrent.com/"/>
//       <outline type="rss" text="BlackRock" title="BlackRock" xmlUrl="http://rockthecode.io/feed/" htmlUrl="http://rockthecode.io/"/>
//       <outline type="rss" text="Blender" title="Blender" xmlUrl="https://code.blender.org/rss" htmlUrl="https://code.blender.org/"/>
//       <outline type="rss" text="Capgemini" title="Capgemini" xmlUrl="https://capgemini.github.io/feed.xml" htmlUrl="https://capgemini.github.io/"/>
//       <outline type="rss" text="Chef" title="Chef" xmlUrl="https://blog.chef.io/rss" htmlUrl="https://blog.chef.io"/>
//       <outline type="rss" text="Cloudflare" title="Cloudflare" xmlUrl="https://blog.cloudflare.com/rss/" htmlUrl="https://blog.cloudflare.com/"/>
//       <outline type="rss" text="CockroachDB" title="CockroachDB" xmlUrl="https://www.cockroachlabs.com/blog/index.xml" htmlUrl="https://www.cockroachlabs.com/blog/"/>
//       <outline type="rss" text="Coinbase" title="Coinbase" xmlUrl="https://engineering.coinbase.com/feed" htmlUrl="https://engineering.coinbase.com/"/>
//       <outline type="rss" text="Confluent" title="Confluent" xmlUrl="https://www.confluent.io/feed/" htmlUrl="https://www.confluent.io/blog"/>
//       <outline type="rss" text="Databricks" title="Databricks" xmlUrl="https://databricks.com/feed" htmlUrl="https://databricks.com/blog"/>
//       <outline type="rss" text="Deezer" title="Deezer" xmlUrl="https://deezer.io/feed" htmlUrl="https://deezer.io/"/>
//       <outline type="rss" text="Deliveroo" title="Deliveroo" xmlUrl="http://deliveroo.engineering/feed.xml" htmlUrl="https://deliveroo.engineering/"/>
//       <outline type="rss" text="DigitalOcean" title="DigitalOcean" xmlUrl="https://blog.digitalocean.com/rss/" htmlUrl="https://blog.digitalocean.com/tag/engineering/"/>
//       <outline type="rss" text="Discord" title="Discord" xmlUrl="https://blog.discordapp.com/feed" htmlUrl="https://blog.discordapp.com/"/>
//       <outline type="rss" text="Docker" title="Docker" xmlUrl="https://blog.docker.com/feed/" htmlUrl="https://blog.docker.com/"/>
//       <outline type="rss" text="DoorDash" title="DoorDash" xmlUrl="https://medium.com/feed/doordash-blog/tagged/engineering" htmlUrl="https://blog.doordash.com/tagged/engineering"/>
//       <outline type="rss" text="Dropbox" title="Dropbox" xmlUrl="https://blogs.dropbox.com/tech/feed/" htmlUrl="https://blogs.dropbox.com/tech/"/>
//       <outline type="rss" text="Ebay" title="Ebay" xmlUrl="https://www.ebayinc.com/stories/blogs/tech/rss/ " htmlUrl="https://www.ebayinc.com/stories/blogs/tech/"/>
//       <outline type="rss" text="Elastic" title="Elastic" xmlUrl="https://www.elastic.co/blog/feed" htmlUrl="https://www.elastic.co/blog/category/engineering"/>
//       <outline type="rss" text="Erlang Solutions" title="Erlang Solutions" xmlUrl="https://www.erlang-solutions.com/news.rss" htmlUrl="https://www.erlang-solutions.com/blog.html"/>
//       <outline type="rss" text="Etsy" title="Etsy" xmlUrl="https://codeascraft.com/feed/" htmlUrl="https://codeascraft.com/"/>
//       <outline type="rss" text="Evernote" title="Evernote" xmlUrl="https://evernote.com/blog/feed/" htmlUrl="https://evernote.com/blog/"/>
//       <outline type="rss" text="Expedia" title="Expedia" xmlUrl="https://medium.com/feed/expedia-group-tech" htmlUrl="https://medium.com/expedia-group-tech"/>
//       <outline type="rss" text="Facebook" title="Facebook" xmlUrl="https://code.fb.com/feed/" htmlUrl="https://code.facebook.com/posts/"/>
//       <outline type="rss" text="Facebook AI Research" title="Facebook AI Research" xmlUrl="https://engineering.fb.com/feed/" htmlUrl="https://engineering.fb.com/category/ai-research/"/>
//       <outline type="rss" text="GIPHY" title="GIPHY" xmlUrl="https://engineering.giphy.com/rss" htmlUrl="https://engineering.giphy.com/"/>
//       <outline type="rss" text="GitHub" title="GitHub" xmlUrl="https://githubengineerin  g.com/atom.xml" htmlUrl="https://githubengineering.com/"/>
//       <outline type="rss" text="GitHub Old" title="GitHub Old" xmlUrl="https://blog.github.com/feed.xml" htmlUrl="https://github.com/blog/category/engineering"/>
//       <outline type="rss" text="GoDaddy" title="GoDaddy" xmlUrl="https://godaddy.com/engineering/feed.xml" htmlUrl="https://godaddy.github.io/engineering/"/>
//       <outline type="rss" text="Google Research" title="Google Research" xmlUrl="http://ai.googleblog.com/feeds/posts/default" htmlUrl="https://research.googleblog.com/"/>
//       <outline type="rss" text="Grafana" title="Grafana" xmlUrl="https://grafana.com/blog/blog/index.xml" htmlUrl="https://grafana.com/blog/"/>
//       <outline type="rss" text="Grammarly" title="Grammarly" xmlUrl="https://tech.grammarly.com/feed.xml" htmlUrl="https://tech.grammarly.com/blog/index.html"/>
//       <outline type="rss" text="Groupon" title="Groupon" xmlUrl="https://engineering.groupon.com/feed/" htmlUrl="https://engineering.groupon.com/"/>
//       <outline type="rss" text="Guardian" title="Guardian" xmlUrl="https://www.theguardian.com/info/series/digital-blog/rss" htmlUrl="https://www.theguardian.com/info/developer-blog"/>
//       <outline type="rss" text="Gusto" title="Gusto" xmlUrl="https://engineering.gusto.com/rss/" htmlUrl="http://engineering.gusto.com/"/>
//       <outline type="rss" text="HashiCorp" title="HashiCorp" xmlUrl="https://www.hashicorp.com/blog/feed.xml" htmlUrl="https://www.hashicorp.com/blog/"/>
//       <outline type="rss" text="Hashnode" title="Hashnode" xmlUrl="https://engineering.hashnode.com/rss.xml" htmlUrl="https://engineering.hashnode.com/"/>
//       <outline type="rss" text="Hasura" title="Hasura" xmlUrl="https://blog.hasura.io/feed" htmlUrl="https://blog.hasura.io/"/>
//       <outline type="rss" text="Heroku" title="Heroku" xmlUrl="https://blog.heroku.com/engineering/feed" htmlUrl="https://blog.heroku.com/engineering"/>
//       <outline type="rss" text="Hostinger" title="Hostinger" xmlUrl="https://www.hostinger.com/blog/feed/" htmlUrl="https://www.hostinger.com/blog/engineering/"/>
//       <outline type="rss" text="HubSpot" title="HubSpot" xmlUrl="https://product.hubspot.com/blog/rss.xml" htmlUrl="http://product.hubspot.com/blog/topic/engineering"/>
//       <outline type="rss" text="IBM developerWorks" title="IBM developerWorks" xmlUrl="https://developer.ibm.com/dwblog/feed/" htmlUrl="https://developer.ibm.com/dwblog/"/>
//       <outline type="rss" text="Imgur" title="Imgur" xmlUrl="https://blog.imgur.com/feed/" htmlUrl="https://blog.imgur.com/category/eng/"/>
//       <outline type="rss" text="Instacart" title="Instacart" xmlUrl="https://tech.instacart.com/feed" htmlUrl="https://tech.instacart.com/"/>
//       <outline type="rss" text="Instagram" title="Instagram" xmlUrl="https://instagram-engineering.com/feed" htmlUrl="https://engineering.instagram.com/"/>
//       <outline type="rss" text="Intel" title="Intel" xmlUrl="https://software.intel.com/en-us/blogs/feed" htmlUrl="https://software.intel.com/en-us/blogs/"/>
//       <outline type="rss" text="Jane Street" title="Jane Street" xmlUrl="https://blogs.janestreet.com/feed.xml" htmlUrl="https://blogs.janestreet.com/category/ocaml/"/>
//       <outline type="rss" text="Just Eat" title="Just Eat" xmlUrl="https://tech.just-eat.com/feed/" htmlUrl="https://tech.just-eat.com/"/>
//       <outline type="rss" text="Khan Academy" title="Khan Academy" xmlUrl="http://engineering.khanacademy.org/rss.xml" htmlUrl="http://engineering.khanacademy.org"/>
//       <outline type="rss" text="Lyft" title="Lyft" xmlUrl="https://eng.lyft.com/feed" htmlUrl="https://eng.lyft.com/"/>
//       <outline type="rss" text="Medium" title="Medium" xmlUrl="https://medium.engineering/feed" htmlUrl="https://medium.com/medium-eng"/>
//       <outline type="rss" text="Mozilla Hacks" title="Mozilla Hacks" xmlUrl="https://hacks.mozilla.org/feed/" htmlUrl="https://hacks.mozilla.org/"/>
//       <outline type="rss" text="Netflix" title="Netflix" xmlUrl="https://medium.com/feed/netflix-techblog" htmlUrl="https://medium.com/netflix-techblog"/>
//       <outline type="rss" text="New York Times" title="New York Times" xmlUrl="https://open.nytimes.com/feed" htmlUrl="https://open.blogs.nytimes.com"/>
//       <outline type="rss" text="Nvidia" title="Nvidia" xmlUrl="https://blogs.nvidia.com/feed/" htmlUrl="https://blogs.nvidia.com/"/>
//       <outline type="rss" text="Okta" title="Okta" xmlUrl="https://developer.okta.com/feed.xml" htmlUrl="https://developer.okta.com/blog/"/>
//       <outline type="rss" text="Paypal" title="Paypal" xmlUrl="https://www.paypal-engineering.com/feed/" htmlUrl="https://www.paypal-engineering.com/"/>
//       <outline type="rss" text="Pinterest" title="Pinterest" xmlUrl="https://medium.com/feed/@Pinterest_Engineering" htmlUrl="https://medium.com/@Pinterest_Engineering"/>
//       <outline type="rss" text="Postman" title="Postman" xmlUrl="https://medium.com/feed/better-practices" htmlUrl="https://medium.com/better-practices"/>
//       <outline type="rss" text="Reddit" title="Reddit" xmlUrl="https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2Fr%2FRedditEng.atom" htmlUrl="https://www.reddit.com/r/RedditEng/"/>
//       <outline type="rss" text="Red Hat" title="Red Hat" xmlUrl="https://developers.redhat.com/blog/feed/atom/" htmlUrl="https://developers.redhat.com/blog/"/>
//       <outline type="rss" text="Riot Games" title="Riot Games" xmlUrl="https://engineering.riotgames.com/rss.xml" htmlUrl="https://engineering.riotgames.com/"/>
//       <outline type="rss" text="Salesforce" title="Salesforce" xmlUrl="https://developer.salesforce.com/blogs/feed" htmlUrl="https://developer.salesforce.com/blogs/engineering/"/>
//       <outline type="rss" text="Serverless" title="Serverless" xmlUrl="https://serverless.com/blog/feed.xml" htmlUrl="https://serverless.com/blog/"/>
//       <outline type="rss" text="Shopify" title="Shopify" xmlUrl="https://shopify.engineering/blog.atom" htmlUrl="https://shopify.engineering/"/>
//       <outline type="rss" text="Slack" title="Slack" xmlUrl="https://slack.engineering/feed" htmlUrl="https://slack.engineering/"/>
//       <outline type="rss" text="Snyk" title="Snyk" xmlUrl="https://snyk.io/blog/feed.xml" htmlUrl="https://snyk.io/blog"/>
//       <outline type="rss" text="Soundcloud" title="Soundcloud" xmlUrl="https://developers.soundcloud.com/blog.rss" htmlUrl="https://developers.soundcloud.com/blog/"/>
//       <outline type="rss" text="Spotify" title="Spotify" xmlUrl="https://labs.spotify.com/feed/" htmlUrl="https://labs.spotify.com/"/>
//       <outline type="rss" text="Square" title="Square" xmlUrl="https://medium.com/feed/square-corner-blog" htmlUrl="https://corner.squareup.com/"/>
//       <outline type="rss" text="Squarespace" title="Squarespace" xmlUrl="https://engineering.squarespace.com/blog?format=RSS" htmlUrl="https://engineering.squarespace.com/"/>
//       <outline type="rss" text="Stack Overflow" title="Stack Overflow" xmlUrl="https://stackoverflow.blog/engineering/feed/" htmlUrl="https://stackoverflow.blog/engineering/"/>
//       <outline type="rss" text="Strava" title="Strava" xmlUrl="https://medium.com/feed/strava-engineering" htmlUrl="https://medium.com/strava-engineering/"/>
//       <outline type="rss" text="Stripe" title="Stripe" xmlUrl="https://stripe.com/blog/feed.rss" htmlUrl="https://stripe.com/blog"/>
//       <outline type="rss" text="Tinder" title="Tinder" xmlUrl="https://tech.gotinder.com/rss/" htmlUrl="https://tech.gotinder.com/"/>
//       <outline type="rss" text="Transferwise" title="Transferwise" xmlUrl="https://tech.transferwise.com/rss/" htmlUrl="http://tech.transferwise.com/"/>
//       <outline type="rss" text="TripAdvisor" title="TripAdvisor" xmlUrl="http://engineering.tripadvisor.com/rss" htmlUrl="http://engineering.tripadvisor.com/"/>
//       <outline type="rss" text="Trivago" title="Trivago" xmlUrl="https://tech.trivago.com/index.xml" htmlUrl="http://tech.trivago.com/"/>
//       <outline type="rss" text="Tumblr" title="Tumblr" xmlUrl="https://engineering.tumblr.com/rss" htmlUrl="https://engineering.tumblr.com/"/>
//       <outline type="rss" text="Twilio" title="Twilio" xmlUrl="https://www.twilio.com/blog/feed" htmlUrl="https://www.twilio.com/blog/"/>
//       <outline type="rss" text="Twitter" title="Twitter" xmlUrl="https://blog.twitter.com/engineering/feed" htmlUrl="https://blog.twitter.com/engineering"/>
//       <outline type="rss" text="Twitch" title="Twitch" xmlUrl="https://medium.com/feed/twitch-news/tagged/engineering" htmlUrl="https://blog.twitch.tv/tagged/engineering"/>
//       <outline type="rss" text="Uber" title="Uber" xmlUrl="https://eng.uber.com/feed/" htmlUrl="http://eng.uber.com/"/>
//       <outline type="rss" text="Venmo" title="Venmo" xmlUrl="http://blog.venmo.com/hf2t3h4x98p5e13z82pl8j66ngcmry?format=RSS" htmlUrl="http://blog.venmo.com/?category=Engineering"/>
//       <outline type="rss" text="Vevo" title="Vevo" xmlUrl="https://medium.com/feed/vevo-engineering" htmlUrl="http://blog.vevo.com/"/>
//       <outline type="rss" text="WalmartLabs" title="WalmartLabs" xmlUrl="https://medium.com/feed/walmartlabs" htmlUrl="https://medium.com/walmartlabs/"/>
//       <outline type="rss" text="Wayfair" title="Wayfair" xmlUrl="https://tech.wayfair.com/feed/" htmlUrl="http://engineering.wayfair.com/"/>
//       <outline type="rss" text="Yelp" title="Yelp" xmlUrl="https://engineeringblog.yelp.com/feed.xml" htmlUrl="https://engineeringblog.yelp.com/"/>
//       <outline type="rss" text="Zendesk" title="Zendesk" xmlUrl="https://medium.com/feed/zendesk-engineering" htmlUrl="https://medium.com/zendesk-engineering"/>
//       <outline type="rss" text="Android" title="Android" xmlUrl="https://android-developers.googleblog.com/feeds/posts/default" htmlUrl="https://android-developers.blogspot.com/"/>
//       <outline type="rss" text="Go" title="Go" xmlUrl="https://blog.golang.org/feed.atom" htmlUrl="https://blog.golang.org/"/>
//       <outline type="rss" text="Kotlin" title="Kotlin" xmlUrl="https://blog.jetbrains.com/kotlin/feed/" htmlUrl="https://blog.jetbrains.com/kotlin/"/>
//       <outline type="rss" text="Laravel" title="Laravel" xmlUrl="https://feed.laravel-news.com/" htmlUrl="https://laravel-news.com/blog/"/>
//       <outline type="rss" text="Microsoft Edge" title="Microsoft Edge" xmlUrl="https://blogs.windows.com/msedgedev/rss" htmlUrl="https://blogs.windows.com/msedgedev/"/>
//       <outline type="rss" text=".NET" title=".NET" xmlUrl="https://blogs.msdn.microsoft.com/dotnet/feed/" htmlUrl="https://blogs.msdn.microsoft.com/dotnet/"/>
//       <outline type="rss" text="React" title="React" xmlUrl="https://reactjs.org/feed.xml" htmlUrl="https://reactjs.org/blog/"/>
//       <outline type="rss" text="React Native" title="React Native" xmlUrl="https://facebook.github.io/react-native/blog/atom.xml" htmlUrl="http://facebook.github.io/react-native/blog/"/>
//       <outline type="rss" text="RocksDB" title="RocksDB" xmlUrl="http://rocksdb.org/feed.xml" htmlUrl="http://rocksdb.org/blog"/>
//       <outline type="rss" text="Rust" title="Rust" xmlUrl="https://blog.rust-lang.org/feed.xml" htmlUrl="https://blog.rust-lang.org/"/>
//       <outline type="rss" text="Sketch" title="Sketch" xmlUrl="https://blog.sketchapp.com/feed" htmlUrl="https://blog.sketchapp.com/"/>
//       <outline type="rss" text="Swift" title="Swift" xmlUrl="https://developer.apple.com/swift/blog/news.rss" htmlUrl="https://developer.apple.com/swift/blog/"/>

interface BlogPostEntry {
    title: string;
    link: string;
    publishedDate: string;
    author?: string;
}

const companyBlogLinkMap = new Map<string, string>();

// companyBlogLinkMap.set('Uber', 'https://eng.uber.com/feed/'); // FIXME: Not working


// companyBlogLinkMap.set('Google', 'https://developers.googleblog.com/feeds/posts/default'); // TODO: atom fmt
// companyBlogLinkMap.set('Google', 'https://developers.googleblog.com/feeds/posts/default'); # atom fmt

// companyBlogLinkMap.set('Coinbase', 'https://engineering.coinbase.com/feed'); # TODO: Find rss feed

companyBlogLinkMap.set('Heroku', 'https://blog.heroku.com/engineering/feed');
companyBlogLinkMap.set('Cloudflare', 'https://blog.cloudflare.com/rss/');
companyBlogLinkMap.set('Twitch', 'https://medium.com/feed/twitch-news/tagged/engineering');
companyBlogLinkMap.set('Netflix', 'https://medium.com/feed/netflix-techblog');
companyBlogLinkMap.set('Airbnb', 'https://medium.com/feed/airbnb-engineering');
companyBlogLinkMap.set('Dropbox', 'https://blogs.dropbox.com/tech/feed/');
companyBlogLinkMap.set('Pinterest', 'https://medium.com/feed/@Pinterest_Engineering');
companyBlogLinkMap.set('Facebook', 'https://engineering.fb.com/feed/');
companyBlogLinkMap.set('Twitter', 'https://blog.twitter.com/engineering/feed');
companyBlogLinkMap.set('Instagram', 'https://instagram-engineering.com/feed');
companyBlogLinkMap.set('Spotify', 'https://labs.spotify.com/feed/');
companyBlogLinkMap.set('Slack', 'https://slack.engineering/feed');
companyBlogLinkMap.set('Etsy', 'https://codeascraft.com/feed/');


const fetchAndInsertBlogPosts = async (limit: number) => {
    const parsedItems = new Map<string, BlogPostEntry>();

    for (const companyName of companyBlogLinkMap.keys()) {
      const url = companyBlogLinkMap.get(companyName);

      const blogEntryRecord = await getBlogByCompanyName(companyName);

      try {
        const response = await fetch(url!);

        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }

        const xmlData = await response.text();

        const parsePromise = new Promise<Map<string, BlogPostEntry>>((resolve, reject) => {
          parseString(xmlData, async (err, result) => {
            if (err) {
              console.error('Failed to parse XML data:', err);
              reject(err);
            } else {
              const rssVersion = result.rss.$.version;
              const allItems = result.rss.channel[0];

              const totalPosts = allItems.item.length;

              for (let i = 0; i < totalPosts; i++) {
                const item = allItems.item[i];

                const title = item.title[0];
                const link = item.link[0];
                const publishedDate = item.pubDate[0];

                const author = item['dc:creator']?.[0] || item.author?.[0];

                const timestamp = new Date(publishedDate);

                await createBlogPostEntry({
                    title,
                    link,
                    publishedDate: timestamp,
                    author,
                    blog_id: blogEntryRecord[0].id
                })

                const parsedObject = {
                  title,
                  link,
                  publishedDate,
                  author
                } as BlogPostEntry;

                parsedItems.set(`${companyName}-${i}`, parsedObject);
              }

              resolve(parsedItems);
            }
          });
        });

        await parsePromise;
      } catch (error) {
        console.error('Error:', error);
      }
    }

    return parsedItems;
  };


const populateBlogEntries = async () => {
    for (const companyName of companyBlogLinkMap.keys()) {
        const url = companyBlogLinkMap.get(companyName);
        fetch(url!)
            .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error(`Failed to fetch data from ${url}`);
            }
            })
            .then((xmlData) => {
            // Parse XML data
            parseString(xmlData, async (err, result) => {
                if (err) {
                console.error('Failed to parse XML data:', err);
                } else {
                const rssVersion = result.rss.$.version;

                try {
                    createAllBlogsEntry({ link: url, companyName, rssVersion })
                } catch (e) {
                    console.error(e);
                }
            }
        });
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }
}

// populateBlogEntries();
const run = async () => {
    const data = await fetchAndInsertBlogPosts(5);
    console.log(data);
}

run();