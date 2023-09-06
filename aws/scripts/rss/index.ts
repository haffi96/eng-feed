import { parseString } from 'xml2js';
import { createAllBlogsEntry, newBlogEntry } from '../db/query';

// <outline type="rss" text="8th Light" title="8th Light" xmlUrl="https://8thlight.com/blog/feed/atom.xml" htmlUrl="https://8thlight.com/blog/"/>
//       <outline type="rss" text="99designs" title="99designs" xmlUrl="https://99designs.com/tech-blog/feed.xml" htmlUrl="https://99designs.com/tech-blog/"/>
//       <outline type="rss" text="AdRoll" title="AdRoll" xmlUrl="http://tech.adroll.com/feed.xml" htmlUrl="http://tech.adroll.com/blog/"/>
//       <outline type="rss" text="Advanced Web Machinery" title="Advanced Web Machinery" xmlUrl="https://advancedweb.hu/atom.xml" htmlUrl="https://advancedweb.hu/"/>
//       <outline type="rss" text="Airbnb" title="Airbnb" xmlUrl="https://medium.com/feed/airbnb-engineering" htmlUrl="https://medium.com/airbnb-engineering"/>
//       <outline type="rss" text="Algolia" title="Algolia" xmlUrl="https://blog.algolia.com/feed/" htmlUrl="https://blog.algolia.com/"/>
//       <outline type="rss" text="Allegro.tech" title="Allegro.tech" xmlUrl="https://allegro.tech/feed.xml" htmlUrl="https://allegro.tech"/>
//       <outline type="rss" text="Appnexus" title="Appnexus" xmlUrl="https://techblog.appnexus.com/feed" htmlUrl="https://techblog.appnexus.com/"/>
//       <outline type="rss" text="Arkency" title="Arkency" xmlUrl="http://blog.arkency.com/atom.xml" htmlUrl="http://blog.arkency.com/"/>
//       <outline type="rss" text="Artsy" title="Artsy" xmlUrl="http://artsy.github.io/feed" htmlUrl="http://artsy.github.io/"/>
//       <outline type="rss" text="Asana" title="Asana" xmlUrl="https://blog.asana.com/feed/" htmlUrl="https://blog.asana.com/category/eng/"/>
//       <outline type="rss" text="Atlassian" title="Atlassian" xmlUrl="https://developer.atlassian.com/blog/feed.xml" htmlUrl="https://developer.atlassian.com/blog/"/>
//       <outline type="rss" text="Atomic Object" title="Atomic Object" xmlUrl="https://spin.atomicobject.com/feed/" htmlUrl="https://spin.atomicobject.com/"/>
//       <outline type="rss" text="Auth0" title="Auth0" xmlUrl="https://auth0.com/blog/rss.xml" htmlUrl="https://auth0.com/blog/"/>
//       <outline type="rss" text="Avenue Code" title="Avenue Code" xmlUrl="http://blog.avenuecode.com/rss.xml" htmlUrl="http://blog.avenuecode.com/"/>
//       <outline type="rss" text="AWS" title="AWS" xmlUrl="https://aws.amazon.com/blogs/aws/feed/" htmlUrl="https://aws.amazon.com/blogs/aws/"/>
//       <outline type="rss" text="Azavea" title="Azavea" xmlUrl="https://www.azavea.com/blog/category/software-development/rss" htmlUrl="https://www.azavea.com/blog/category/software-development/"/>
//       <outline type="rss" text="Babbel" title="Babbel" xmlUrl="https://blog.babbel.com/en/feed/" htmlUrl="https://bytes.babbel.com/en/"/>
//       <outline type="rss" text="Backtrace" title="Backtrace" xmlUrl="https://backtrace.io/feed/" htmlUrl="https://backtrace.io/blog/"/>
//       <outline type="rss" text="Badoo" title="Badoo" xmlUrl="https://techblog.badoo.com/feed.xml" htmlUrl="https://techblog.badoo.com/"/>
//       <outline type="rss" text="Bandcamp" title="Bandcamp" xmlUrl="https://bandcamptech.wordpress.com/feed/" htmlUrl="https://bandcamptech.wordpress.com/"/>
//       <outline type="rss" text="Base Lab" title="Base Lab" xmlUrl="https://lab.getbase.com/feed/" htmlUrl="https://lab.getbase.com/category/engineering/"/>
//       <outline type="rss" text="Bazaarvoice" title="Bazaarvoice" xmlUrl="https://blog.developer.bazaarvoice.com/feed/" htmlUrl="https://blog.developer.bazaarvoice.com/"/>
//       <outline type="rss" text="BBC" title="BBC" xmlUrl="https://medium.com/feed/bbc-design-engineering" htmlUrl="https://medium.com/bbc-design-engineering/"/>
//       <outline type="rss" text="Benchling" title="Benchling" xmlUrl="https://benchling.engineering/feed" htmlUrl="https://benchling.engineering/"/>
//       <outline type="rss" text="BenefitFocus" title="BenefitFocus" xmlUrl="https://www.benefitfocus.com/rss.xml" htmlUrl="https://www.benefitfocus.com/blogs/design-engineering"/>
//       <outline type="rss" text="Bigcommerce" title="Bigcommerce" xmlUrl="https://www.bigeng.io/rss/" htmlUrl="http://www.bigeng.io/"/>
//       <outline type="rss" text="Binary Studio" title="Binary Studio" xmlUrl="https://binary-studio.com/blog/rss" htmlUrl="https://binary-studio.com/blog/"/>
//       <outline type="rss" text="BitTorrent" title="BitTorrent" xmlUrl="https://engineering.bittorrent.com/feed/" htmlUrl="http://engineering.bittorrent.com/"/>
//       <outline type="rss" text="BlaBlaCar" title="BlaBlaCar" xmlUrl="https://medium.com/feed/blablacar-tech" htmlUrl="http://blablatech.com/blog/"/>
//       <outline type="rss" text="BlackRock" title="BlackRock" xmlUrl="http://rockthecode.io/feed/" htmlUrl="http://rockthecode.io/"/>
//       <outline type="rss" text="Blender" title="Blender" xmlUrl="https://code.blender.org/rss" htmlUrl="https://code.blender.org/"/>
//       <outline type="rss" text="Blogfoster" title="Blogfoster" xmlUrl="http://engineering.blogfoster.com/rss/" htmlUrl="http://engineering.blogfoster.com/"/>
//       <outline type="rss" text="Boxever" title="Boxever" xmlUrl="https://www.boxever.com/feed/" htmlUrl="http://www.boxever.com/blog/"/>
//       <outline type="rss" text="Brandwatch" title="Brandwatch" xmlUrl="https://engineering.brandwatch.com/rss/" htmlUrl="http://engineering.brandwatch.com/"/>
//       <outline type="rss" text="Canva" title="Canva" xmlUrl="https://product.canva.com/feed.xml" htmlUrl="https://engineering.canva.com"/>
//       <outline type="rss" text="Capgemini" title="Capgemini" xmlUrl="https://capgemini.github.io/feed.xml" htmlUrl="https://capgemini.github.io/"/>
//       <outline type="rss" text="CenturyLink" title="CenturyLink" xmlUrl="https://www.ctl.io/developers/blog/rss" htmlUrl="https://www.ctl.io/developers/blog"/>
//       <outline type="rss" text="Cerner" title="Cerner" xmlUrl="http://engineering.cerner.com/atom.xml" htmlUrl="http://engineering.cerner.com/"/>
//       <outline type="rss" text="Chaps" title="Chaps" xmlUrl="https://blog.chaps.io/feed.xml" htmlUrl="https://blog.chaps.io/"/>
//       <outline type="rss" text="Chartbeat" title="Chartbeat" xmlUrl="http://engineering.chartbeat.com/feed/" htmlUrl="http://engineering.chartbeat.com/"/>
//       <outline type="rss" text="Chef" title="Chef" xmlUrl="https://blog.chef.io/rss" htmlUrl="https://blog.chef.io"/>
//       <outline type="rss" text="Clever" title="Clever" xmlUrl="https://engineering.clever.com/rss" htmlUrl="https://engineering.clever.com/"/>
//       <outline type="rss" text="CloudBees" title="CloudBees" xmlUrl="https://www.previous.cloudbees.com/blog.xml" htmlUrl="https://www.previous.cloudbees.com/blog"/>
//       <outline type="rss" text="Cloudera" title="Cloudera" xmlUrl="https://blog.cloudera.com/feed/" htmlUrl="https://blog.cloudera.com/"/>
//       <outline type="rss" text="Cloudflare" title="Cloudflare" xmlUrl="https://blog.cloudflare.com/rss/" htmlUrl="https://blog.cloudflare.com/"/>
//       <outline type="rss" text="CockroachDB" title="CockroachDB" xmlUrl="https://www.cockroachlabs.com/blog/index.xml" htmlUrl="https://www.cockroachlabs.com/blog/"/>
//       <outline type="rss" text="Codelitt" title="Codelitt" xmlUrl="https://www.codelitt.com/blog/rss" htmlUrl="https://www.codelitt.com/blog/"/>
//       <outline type="rss" text="Codemancers" title="Codemancers" xmlUrl="https://crypt.codemancers.com/index.xml" htmlUrl="https://crypt.codemancers.com/"/>
//       <outline type="rss" text="Codementor" title="Codementor" xmlUrl="https://www.codementor.io/tutorial/feed" htmlUrl="https://www.codementor.io/tutorial"/>
//       <outline type="rss" text="CodeName One" title="CodeName One" xmlUrl="http://www.codenameone.com/feed.xml" htmlUrl="http://www.codenameone.com/blog.html"/>
//       <outline type="rss" text="Codeship" title="Codeship" xmlUrl="http://blog.codeship.com/feed/" htmlUrl="https://blog.codeship.com/"/>
//       <outline type="rss" text="Coinbase" title="Coinbase" xmlUrl="https://engineering.coinbase.com/feed" htmlUrl="https://engineering.coinbase.com/"/>
//       <outline type="rss" text="Commercetools" title="Commercetools" xmlUrl="https://techblog.commercetools.com/feed" htmlUrl="https://techblog.commercetools.com/"/>
//       <outline type="rss" text="Condé Nast" title="Condé Nast" xmlUrl="https://technology.condenast.com/feed/rss" htmlUrl="https://technology.condenast.com/"/>
//       <outline type="rss" text="Confluent" title="Confluent" xmlUrl="https://www.confluent.io/feed/" htmlUrl="https://www.confluent.io/blog"/>
//       <outline type="rss" text="Convox" title="Convox" xmlUrl="https://convox.com/blog/rss.xml" htmlUrl="https://convox.com/blog"/>
//       <outline type="rss" text="Coolblue" title="Coolblue" xmlUrl="https://devblog.coolblue.nl/feed/" htmlUrl="http://devblog.coolblue.nl/"/>
//       <outline type="rss" text="Credit Karma" title="Credit Karma" xmlUrl="https://engineering.creditkarma.com/feed" htmlUrl="https://engineering.creditkarma.com/"/>
//       <outline type="rss" text="Criteo" title="Criteo" xmlUrl="https://medium.com/feed/criteo-labs" htmlUrl="https://medium.com/criteo-labs"/>
//       <outline type="rss" text="Crowdfire" title="Crowdfire" xmlUrl="https://crowdfire.engineering/feed" htmlUrl="https://crowdfire.engineering/"/>
//       <outline type="rss" text="CSC - IT Center For Science - Cloud Team" title="CSC - IT Center For Science - Cloud Team" xmlUrl="https://cloud.blog.csc.fi/feeds/posts/default" htmlUrl="https://cloud.blog.csc.fi/"/>
//       <outline type="rss" text="Curalate" title="Curalate" xmlUrl="http://engineering.curalate.com/feed.xml" htmlUrl="http://engineering.curalate.com/"/>
//       <outline type="rss" text="Data Artisans" title="Data Artisans" xmlUrl="https://data-artisans.com/feed" htmlUrl="https://data-artisans.com/blog/"/>
//       <outline type="rss" text="Databricks" title="Databricks" xmlUrl="https://databricks.com/feed" htmlUrl="https://databricks.com/blog"/>
//       <outline type="rss" text="DataFox" title="DataFox" xmlUrl="https://eng.datafox.com/feed.xml" htmlUrl="http://eng.datafox.co/"/>
//       <outline type="rss" text="Deezer" title="Deezer" xmlUrl="https://deezer.io/feed" htmlUrl="https://deezer.io/"/>
//       <outline type="rss" text="Deliveroo" title="Deliveroo" xmlUrl="http://deliveroo.engineering/feed.xml" htmlUrl="https://deliveroo.engineering/"/>
//       <outline type="rss" text="DigitalOcean" title="DigitalOcean" xmlUrl="https://blog.digitalocean.com/rss/" htmlUrl="https://blog.digitalocean.com/tag/engineering/"/>
//       <outline type="rss" text="Discord" title="Discord" xmlUrl="https://blog.discordapp.com/feed" htmlUrl="https://blog.discordapp.com/"/>
//       <outline type="rss" text="Docker" title="Docker" xmlUrl="https://blog.docker.com/feed/" htmlUrl="https://blog.docker.com/"/>
//       <outline type="rss" text="DoorDash" title="DoorDash" xmlUrl="https://medium.com/feed/doordash-blog/tagged/engineering" htmlUrl="https://blog.doordash.com/tagged/engineering"/>
//       <outline type="rss" text="Doximity" title="Doximity" xmlUrl="https://engineering.doximity.com/feed" htmlUrl="https://engineering.doximity.com"/>
//       <outline type="rss" text="Drivy" title="Drivy" xmlUrl="https://drivy.engineering/feed.xml" htmlUrl="https://drivy.engineering/"/>
//       <outline type="rss" text="Dropbox" title="Dropbox" xmlUrl="https://blogs.dropbox.com/tech/feed/" htmlUrl="https://blogs.dropbox.com/tech/"/>
//       <outline type="rss" text="Ebay" title="Ebay" xmlUrl="https://www.ebayinc.com/stories/blogs/tech/rss/ " htmlUrl="https://www.ebayinc.com/stories/blogs/tech/"/>
//       <outline type="rss" text="eFounders" title="eFounders" xmlUrl="https://medium.com/feed/unexpected-token" htmlUrl="https://medium.com/unexpected-token"/>
//       <outline type="rss" text="Eharmony" title="Eharmony" xmlUrl="https://www.eharmony.com/engineering/feed/" htmlUrl="http://www.eharmony.com/engineering/"/>
//       <outline type="rss" text="Elastic" title="Elastic" xmlUrl="https://www.elastic.co/blog/feed" htmlUrl="https://www.elastic.co/blog/category/engineering"/>
//       <outline type="rss" text="Engine Yard" title="Engine Yard" xmlUrl="https://blog.engineyard.com/feed.xml" htmlUrl="https://blog.engineyard.com/"/>
//       <outline type="rss" text="Entelo" title="Entelo" xmlUrl="https://sourcecode.entelo.com/feed.xml" htmlUrl="https://sourcecode.entelo.com/"/>
//       <outline type="rss" text="Envato" title="Envato" xmlUrl="https://webuild.envato.com/atom.xml" htmlUrl="https://webuild.envato.com/"/>
//       <outline type="rss" text="Envoy" title="Envoy" xmlUrl="https://envoy.engineering/feed" htmlUrl="https://envoy.engineering/"/>
//       <outline type="rss" text="Erlang Solutions" title="Erlang Solutions" xmlUrl="https://www.erlang-solutions.com/news.rss" htmlUrl="https://www.erlang-solutions.com/blog.html"/>
//       <outline type="rss" text="Etsy" title="Etsy" xmlUrl="https://codeascraft.com/feed/" htmlUrl="https://codeascraft.com/"/>
//       <outline type="rss" text="Eventbrite" title="Eventbrite" xmlUrl="https://www.eventbrite.com/engineering/feed/" htmlUrl="https://www.eventbrite.com/engineering/"/>
//       <outline type="rss" text="Evernote" title="Evernote" xmlUrl="https://evernote.com/blog/feed/" htmlUrl="https://evernote.com/blog/"/>
//       <outline type="rss" text="Evil Martians" title="Evil Martians" xmlUrl="https://evilmartians.com/chronicles.atom" htmlUrl="https://evilmartians.com/chronicles/"/>
//       <outline type="rss" text="Expedia" title="Expedia" xmlUrl="https://medium.com/feed/expedia-group-tech" htmlUrl="https://medium.com/expedia-group-tech"/>
//       <outline type="rss" text="Facebook" title="Facebook" xmlUrl="https://code.fb.com/feed/" htmlUrl="https://code.facebook.com/posts/"/>
//       <outline type="rss" text="Facebook AI Research" title="Facebook AI Research" xmlUrl="https://engineering.fb.com/feed/" htmlUrl="https://engineering.fb.com/category/ai-research/"/>
//       <outline type="rss" text="Faraday" title="Faraday" xmlUrl="https://blog.faraday.io/rss/" htmlUrl="http://blog.faraday.io/"/>
//       <outline type="rss" text="Feedzai" title="Feedzai" xmlUrl="https://medium.com/feed/feedzaitech" htmlUrl="https://medium.com/feedzaitech"/>
//       <outline type="rss" text="Fiftythree" title="Fiftythree" xmlUrl="http://making.fiftythree.com/feed.xml" htmlUrl="http://making.fiftythree.com/"/>
//       <outline type="rss" text="Findmypast" title="Findmypast" xmlUrl="https://tech.findmypast.com/feed.xml" htmlUrl="http://tech.findmypast.com/"/>
//       <outline type="rss" text="Finn.no" title="Finn.no" xmlUrl="http://tech.finn.no/atom.xml" htmlUrl="http://tech.finn.no/"/>
//       <outline type="rss" text="Firmafon" title="Firmafon" xmlUrl="https://dev.firmafon.dk/blog/feed.xml" htmlUrl="https://dev.firmafon.dk/blog/"/>
//       <outline type="rss" text="Flickr" title="Flickr" xmlUrl="http://code.flickr.net/feed/" htmlUrl="http://code.flickr.net/"/>
//       <outline type="rss" text="Foursquare" title="Foursquare" xmlUrl="https://engineering.foursquare.com/feed" htmlUrl="https://engineering.foursquare.com/"/>
//       <outline type="rss" text="Freeletics" title="Freeletics" xmlUrl="https://freeletics.engineering/feed.xml" htmlUrl="https://freeletics.engineering/"/>
//       <outline type="rss" text="Future Processing" title="Future Processing" xmlUrl="https://www.future-processing.pl/technical-blog/rss" htmlUrl="https://www.future-processing.pl/technical-blog/"/>
//       <outline type="rss" text="Galois" title="Galois" xmlUrl="https://galois.com/feed/" htmlUrl="https://galois.com/blog/"/>
//       <outline type="rss" text="GameChanger" title="GameChanger" xmlUrl="http://tech.gc.com/atom.xml" htmlUrl="http://tech.gc.com/"/>
//       <outline type="rss" text="Geoblink" title="Geoblink" xmlUrl="https://tech.geoblink.com/feed/" htmlUrl="https://tech.geoblink.com"/>
//       <outline type="rss" text="Gilt" title="Gilt" xmlUrl="http://tech.gilt.com/rss" htmlUrl="http://tech.gilt.com"/>
//       <outline type="rss" text="GIPHY" title="GIPHY" xmlUrl="https://engineering.giphy.com/rss" htmlUrl="https://engineering.giphy.com/"/>
//       <outline type="rss" text="GitHub" title="GitHub" xmlUrl="https://githubengineering.com/atom.xml" htmlUrl="https://githubengineering.com/"/>
//       <outline type="rss" text="GitHub Old" title="GitHub Old" xmlUrl="https://blog.github.com/feed.xml" htmlUrl="https://github.com/blog/category/engineering"/>
//       <outline type="rss" text="GoCardless" title="GoCardless" xmlUrl="https://gocardless.com/blog/atom.xml" htmlUrl="https://gocardless.com/blog/tagged/engineering/"/>
//       <outline type="rss" text="GoDaddy" title="GoDaddy" xmlUrl="https://godaddy.com/engineering/feed.xml" htmlUrl="https://godaddy.github.io/engineering/"/>
//       <outline type="rss" text="Google Online Security" title="Google Online Security" xmlUrl="https://security.googleblog.com/feeds/posts/default" htmlUrl="https://security.googleblog.com/"/>
//       <outline type="rss" text="Google Research" title="Google Research" xmlUrl="http://ai.googleblog.com/feeds/posts/default" htmlUrl="https://research.googleblog.com/"/>
//       <outline type="rss" text="GoSquared" title="GoSquared" xmlUrl="https://engineering.gosquared.com/feed" htmlUrl="https://engineering.gosquared.com/"/>
//       <outline type="rss" text="GO-JEK" title="GO-JEK" xmlUrl="https://blog.gojekengineering.com/feed" htmlUrl="https://blog.gojekengineering.com/"/>
//       <outline type="rss" text="Grab" title="Grab" xmlUrl="http://engineering.grab.com/feed.xml" htmlUrl="http://engineering.grab.com/"/>
//       <outline type="rss" text="Grafana" title="Grafana" xmlUrl="https://grafana.com/blog/blog/index.xml" htmlUrl="https://grafana.com/blog/"/>
//       <outline type="rss" text="Grammarly" title="Grammarly" xmlUrl="https://tech.grammarly.com/feed.xml" htmlUrl="https://tech.grammarly.com/blog/index.html"/>
//       <outline type="rss" text="Grofers" title="Grofers" xmlUrl="https://lambda.grofers.com/feed" htmlUrl="https://lambda.grofers.com/"/>
//       <outline type="rss" text="Grouper" title="Grouper" xmlUrl="http://blog.joingrouper.com/rss" htmlUrl="http://blog.joingrouper.com/"/>
//       <outline type="rss" text="Groupon" title="Groupon" xmlUrl="https://engineering.groupon.com/feed/" htmlUrl="https://engineering.groupon.com/"/>
//       <outline type="rss" text="Guardian" title="Guardian" xmlUrl="https://www.theguardian.com/info/series/digital-blog/rss" htmlUrl="https://www.theguardian.com/info/developer-blog"/>
//       <outline type="rss" text="Gusto" title="Gusto" xmlUrl="https://engineering.gusto.com/rss/" htmlUrl="http://engineering.gusto.com/"/>
//       <outline type="rss" text="HackerEarth" title="HackerEarth" xmlUrl="http://engineering.hackerearth.com/rss" htmlUrl="http://engineering.hackerearth.com/"/>
//       <outline type="rss" text="Haptik" title="Haptik" xmlUrl="https://haptik.ai/tech/feed/" htmlUrl="https://haptik.ai/tech/"/>
//       <outline type="rss" text="Harry's" title="Harry's" xmlUrl="http://engineering.harrys.com/feed.xml" htmlUrl="http://engineering.harrys.com/"/>
//       <outline type="rss" text="HashiCorp" title="HashiCorp" xmlUrl="https://www.hashicorp.com/blog/feed.xml" htmlUrl="https://www.hashicorp.com/blog/"/>
//       <outline type="rss" text="Hashnode" title="Hashnode" xmlUrl="https://engineering.hashnode.com/rss.xml" htmlUrl="https://engineering.hashnode.com/"/>
//       <outline type="rss" text="Hashrocket" title="Hashrocket" xmlUrl="https://hashrocket.com/blog.rss" htmlUrl="https://hashrocket.com/blog"/>
//       <outline type="rss" text="Hasura" title="Hasura" xmlUrl="https://blog.hasura.io/feed" htmlUrl="https://blog.hasura.io/"/>
//       <outline type="rss" text="Haus" title="Haus" xmlUrl="https://engineering.haus.com/feed" htmlUrl="https://engineering.haus.com"/>
//       <outline type="rss" text="Heap" title="Heap" xmlUrl="https://heapanalytics.com/blog/category/engineering/feed" htmlUrl="https://heap.engineering/"/>
//       <outline type="rss" text="Helpshift" title="Helpshift" xmlUrl="https://medium.com/feed/helpshift-engineering" htmlUrl="https://medium.com/helpshift-engineering/"/>
//       <outline type="rss" text="HERE" title="HERE" xmlUrl="https://developer.here.com/blog/feed" htmlUrl="https://developer.here.com/blog"/>
//       <outline type="rss" text="Heroku" title="Heroku" xmlUrl="https://blog.heroku.com/engineering/feed" htmlUrl="https://blog.heroku.com/engineering"/>
//       <outline type="rss" text="HireArt" title="HireArt" xmlUrl="http://code.hireart.com/feed.xml" htmlUrl="http://code.hireart.com/"/>
//       <outline type="rss" text="HomeAway" title="HomeAway" xmlUrl="https://medium.com/feed/homeaway-tech-blog" htmlUrl="https://tech.homeaway.com/"/>
//       <outline type="rss" text="Honeybadger" title="Honeybadger" xmlUrl="http://blog.honeybadger.io/feed.xml" htmlUrl="http://blog.honeybadger.io/"/>
//       <outline type="rss" text="Hootsuite" title="Hootsuite" xmlUrl="http://code.hootsuite.com/rss" htmlUrl="http://code.hootsuite.com/"/>
//       <outline type="rss" text="Hostinger" title="Hostinger" xmlUrl="https://www.hostinger.com/blog/feed/" htmlUrl="https://www.hostinger.com/blog/engineering/"/>
//       <outline type="rss" text="Housing.com" title="Housing.com" xmlUrl="https://medium.com/feed/engineering-housing" htmlUrl="https://medium.com/engineering-housing"/>
//       <outline type="rss" text="HubSpot" title="HubSpot" xmlUrl="https://product.hubspot.com/blog/rss.xml" htmlUrl="http://product.hubspot.com/blog/topic/engineering"/>
//       <outline type="rss" text="IBM developerWorks" title="IBM developerWorks" xmlUrl="https://developer.ibm.com/dwblog/feed/" htmlUrl="https://developer.ibm.com/dwblog/"/>
//       <outline type="rss" text="IFTTT" title="IFTTT" xmlUrl="http://engineering.ifttt.com/feed.xml" htmlUrl="http://engineering.ifttt.com/"/>
//       <outline type="rss" text="IMVU" title="IMVU" xmlUrl="https://engineering.imvu.com/feed/" htmlUrl="https://engineering.imvu.com/"/>
//       <outline type="rss" text="Imaginea" title="Imaginea" xmlUrl="https://blog.imaginea.com/feed/" htmlUrl="https://blog.imaginea.com/"/>
//       <outline type="rss" text="Imgur" title="Imgur" xmlUrl="https://blog.imgur.com/feed/" htmlUrl="https://blog.imgur.com/category/eng/"/>
//       <outline type="rss" text="Indeed" title="Indeed" xmlUrl="http://engineering.indeedblog.com/feed/" htmlUrl="http://engineering.indeedblog.com/blog/"/>
//       <outline type="rss" text="Instacart" title="Instacart" xmlUrl="https://tech.instacart.com/feed" htmlUrl="https://tech.instacart.com/"/>
//       <outline type="rss" text="Instagram" title="Instagram" xmlUrl="https://instagram-engineering.com/feed" htmlUrl="https://engineering.instagram.com/"/>
//       <outline type="rss" text="Intel" title="Intel" xmlUrl="https://software.intel.com/en-us/blogs/feed" htmlUrl="https://software.intel.com/en-us/blogs/"/>
//       <outline type="rss" text="Intent Media" title="Intent Media" xmlUrl="http://intentmedia.com/feed/" htmlUrl="http://intentmedia.com/blog/"/>
//       <outline type="rss" text="Intercom" title="Intercom" xmlUrl="https://engineering.intercom.io/feed.xml" htmlUrl="https://engineering.intercom.io/"/>
//       <outline type="rss" text="Jane Street" title="Jane Street" xmlUrl="https://blogs.janestreet.com/feed.xml" htmlUrl="https://blogs.janestreet.com/category/ocaml/"/>
//       <outline type="rss" text="Jet Technology" title="Jet Technology" xmlUrl="https://medium.com/feed/jettech" htmlUrl="https://tech.jet.com/"/>
//       <outline type="rss" text="Jobandtalent" title="Jobandtalent" xmlUrl="https://jobandtalent.engineering/feed" htmlUrl="https://jobandtalent.engineering/"/>
//       <outline type="rss" text="JobTeaser" title="JobTeaser" xmlUrl="https://medium.com/feed/jobteaser-dev-team" htmlUrl="https://medium.com/jobteaser-dev-team/"/>
//       <outline type="rss" text="Jolly Good Code" title="Jolly Good Code" xmlUrl="https://jollygoodcode.github.io/atom.xml" htmlUrl="https://jollygoodcode.github.io/"/>
//       <outline type="rss" text="Just Eat" title="Just Eat" xmlUrl="https://tech.just-eat.com/feed/" htmlUrl="https://tech.just-eat.com/"/>
//       <outline type="rss" text="Khan Academy" title="Khan Academy" xmlUrl="http://engineering.khanacademy.org/rss.xml" htmlUrl="http://engineering.khanacademy.org"/>
//       <outline type="rss" text="Kickstarter" title="Kickstarter" xmlUrl="https://kickstarter.engineering/feed" htmlUrl="https://www.kickstarter.com/backing-and-hacking"/>
//       <outline type="rss" text="King" title="King" xmlUrl="https://techblog.king.com/feed/" htmlUrl="https://techblog.king.com/"/>
//       <outline type="rss" text="Kinvolk" title="Kinvolk" xmlUrl="https://kinvolk.io/blog/index.xml" htmlUrl="https://kinvolk.io/blog/"/>
//       <outline type="rss" text="Kogan.com" title="Kogan.com" xmlUrl="https://devblog.kogan.com/blog?format=RSS" htmlUrl="https://devblog.kogan.com/"/>
//       <outline type="rss" text="Kolosek" title="Kolosek" xmlUrl="https://kolosek.com/rss/" htmlUrl="https://kolosek.com/blog/"/>
//       <outline type="rss" text="Latacora" title="Latacora" xmlUrl="https://latacora.micro.blog/feed.xml" htmlUrl="https://latacora.singles/"/>
//       <outline type="rss" text="Laterooms" title="Laterooms" xmlUrl="http://engineering.laterooms.com/rss/" htmlUrl="http://engineering.laterooms.com/"/>
//       <outline type="rss" text="LendingHome" title="LendingHome" xmlUrl="https://tech.lendinghome.com/feed" htmlUrl="https://tech.lendinghome.com/"/>
//       <outline type="rss" text="LINE" title="LINE" xmlUrl="https://engineering.linecorp.com/en/blog/rss2" htmlUrl="https://engineering.linecorp.com/en/blog"/>
//       <outline type="rss" text="LiveChat" title="LiveChat" xmlUrl="https://developers.livechatinc.com/blog/rss" htmlUrl="https://developers.livechatinc.com/blog/"/>
//       <outline type="rss" text="LiveRamp" title="LiveRamp" xmlUrl="https://liveramp.com/engineering/feed/" htmlUrl="https://liveramp.com/engineering/"/>
//       <outline type="rss" text="Localytics" title="Localytics" xmlUrl="https://eng.localytics.com/rss/" htmlUrl="http://eng.localytics.com/"/>
//       <outline type="rss" text="Lyft" title="Lyft" xmlUrl="https://eng.lyft.com/feed" htmlUrl="https://eng.lyft.com/"/>
//       <outline type="rss" text="Made Tech" title="Made Tech" xmlUrl="http://www.madetech.com/feed" htmlUrl="https://www.madetech.com/blog"/>
//       <outline type="rss" text="Mallow Tech" title="Mallow Tech" xmlUrl="http://blog.mallow-tech.com/feed/" htmlUrl="http://blog.mallow-tech.com/"/>
//       <outline type="rss" text="Mandrill" title="Mandrill" xmlUrl="http://blog.mandrill.com/feeds/all.atom.xml" htmlUrl="http://blog.mandrill.com/"/>
//       <outline type="rss" text="MapTiler" title="MapTiler" xmlUrl="https://www.maptiler.com/blog/feed/posts.xml" htmlUrl="https://www.maptiler.com/blog/"/>
//       <outline type="rss" text="Medium" title="Medium" xmlUrl="https://medium.engineering/feed" htmlUrl="https://medium.com/medium-eng"/>
//       <outline type="rss" text="MemSQL" title="MemSQL" xmlUrl="http://blog.memsql.com/feed/" htmlUrl="http://blog.memsql.com/content/engineering/"/>
//       <outline type="rss" text="Mesosphere" title="Mesosphere" xmlUrl="https://mesosphere.com/feed/" htmlUrl="https://mesosphere.com/blog/"/>
//       <outline type="rss" text="Microsoft Python Engineering" title="Microsoft Python Engineering" xmlUrl="http://blogs.msdn.microsoft.com/pythonengineering/feed/" htmlUrl="https://blogs.msdn.microsoft.com/pythonengineering/"/>
//       <outline type="rss" text="Mixmax" title="Mixmax" xmlUrl="https://engineering.mixmax.com/rss/" htmlUrl="https://engineering.mixmax.com/"/>
//       <outline type="rss" text="Mixpanel" title="Mixpanel" xmlUrl="https://engineering.mixpanel.com/feed/" htmlUrl="https://code.mixpanel.com/"/>
//       <outline type="rss" text="Moove-it" title="Moove-it" xmlUrl="https://blog.moove-it.com/rss" htmlUrl="https://blog.moove-it.com/"/>
//       <outline type="rss" text="Mozilla Automation Team" title="Mozilla Automation Team" xmlUrl="http://planet.mozilla.org/ateam/atom.xml" htmlUrl="https://planet.mozilla.org/ateam/"/>
//       <outline type="rss" text="Mozilla Hacks" title="Mozilla Hacks" xmlUrl="https://hacks.mozilla.org/feed/" htmlUrl="https://hacks.mozilla.org/"/>
//       <outline type="rss" text="Mozilla Release Engineering" title="Mozilla Release Engineering" xmlUrl="http://planet.mozilla.org/releng/atom.xml" htmlUrl="https://planet.mozilla.org/releng/"/>
//       <outline type="rss" text="Netflix" title="Netflix" xmlUrl="https://medium.com/feed/netflix-techblog" htmlUrl="https://medium.com/netflix-techblog"/>
//       <outline type="rss" text="New York Times" title="New York Times" xmlUrl="https://open.nytimes.com/feed" htmlUrl="https://open.blogs.nytimes.com"/>
//       <outline type="rss" text="Nextdoor" title="Nextdoor" xmlUrl="https://engblog.nextdoor.com/feed" htmlUrl="https://engblog.nextdoor.com/"/>
//       <outline type="rss" text="Nordic APIs" title="Nordic APIs" xmlUrl="https://nordicapis.com/feed/" htmlUrl="https://nordicapis.com/blog/"/>
//       <outline type="rss" text="Novoda" title="Novoda" xmlUrl="https://blog.novoda.com/rss/" htmlUrl="https://www.novoda.com/blog/"/>
//       <outline type="rss" text="NPR Apps" title="NPR Apps" xmlUrl="http://blog.apps.npr.org/atom.xml" htmlUrl="http://blog.apps.npr.org/"/>
//       <outline type="rss" text="Nvidia" title="Nvidia" xmlUrl="https://blogs.nvidia.com/feed/" htmlUrl="https://blogs.nvidia.com/"/>
//       <outline type="rss" text="OCTO Technology" title="OCTO Technology" xmlUrl="https://blog.octo.com/en/feed/" htmlUrl="https://blog.octo.com/en/"/>
//       <outline type="rss" text="Okta" title="Okta" xmlUrl="https://developer.okta.com/feed.xml" htmlUrl="https://developer.okta.com/blog/"/>
//       <outline type="rss" text="OLX" title="OLX" xmlUrl="https://tech.olx.com/feed" htmlUrl="https://tech.olx.com/"/>
//       <outline type="rss" text="OpenDNS" title="OpenDNS" xmlUrl="https://umbrella.cisco.com/blog/feed/" htmlUrl="https://engineering.opendns.com/"/>
//       <outline type="rss" text="Oursky" title="Oursky" xmlUrl="https://code.oursky.com/feed/" htmlUrl="https://code.oursky.com/"/>
//       <outline type="rss" text="Opensooq" title="Opensooq" xmlUrl="http://engineering.opensooq.com/feed/" htmlUrl="http://engineering.opensooq.com/"/>
//       <outline type="rss" text="Panorama Education" title="Panorama Education" xmlUrl="https://engineering.panoramaed.com/feed/" htmlUrl="http://engineering.panoramaed.com/"/>
//       <outline type="rss" text="Paypal" title="Paypal" xmlUrl="https://www.paypal-engineering.com/feed/" htmlUrl="https://www.paypal-engineering.com/"/>
//       <outline type="rss" text="PicCollage" title="PicCollage" xmlUrl="https://tech.pic-collage.com/feed" htmlUrl="https://tech.pic-collage.com/"/>
//       <outline type="rss" text="Pinterest" title="Pinterest" xmlUrl="https://medium.com/feed/@Pinterest_Engineering" htmlUrl="https://medium.com/@Pinterest_Engineering"/>
//       <outline type="rss" text="Pivotal" title="Pivotal" xmlUrl="http://feeds.feedburner.com/PivotalEngineeringJournal" htmlUrl="https://engineering.pivotal.io"/>
//       <outline type="rss" text="Postman" title="Postman" xmlUrl="https://medium.com/feed/better-practices" htmlUrl="https://medium.com/better-practices"/>
//       <outline type="rss" text="Postmark" title="Postmark" xmlUrl="https://postmarkapp.com/blog/feed.atom" htmlUrl="https://postmarkapp.com/blog"/>
//       <outline type="rss" text="Postmates" title="Postmates" xmlUrl="https://medium.com/feed/postmates-blog/tagged/engineering" htmlUrl="https://blog.postmates.com/tagged/engineering"/>
//       <outline type="rss" text="Prezi" title="Prezi" xmlUrl="https://engineering.prezi.com/feed" htmlUrl="https://medium.com/prezi-engineering"/>
//       <outline type="rss" text="PubNub:" title="PubNub:" xmlUrl="https://www.pubnub.com/blog/feed/" htmlUrl="https://www.pubnub.com/blog/"/>
//       <outline type="rss" text="PullReview" title="PullReview" xmlUrl="http://blog.8thcolor.com/feed.xml" htmlUrl="http://blog.8thcolor.com/"/>
//       <outline type="rss" text="Raizlabs" title="Raizlabs" xmlUrl="https://www.raizlabs.com/dev/feed/" htmlUrl="https://www.raizlabs.com/dev/"/>
//       <outline type="rss" text="RapidAPI" title="RapidAPI" xmlUrl="https://blog.rapidapi.com/feed/" htmlUrl="http://blog.rapidapi.com/"/>
//       <outline type="rss" text="REA Group" title="REA Group" xmlUrl="https://www.rea-group.com/category/tech/feed/" htmlUrl="https://www.rea-group.com/category/tech/"/>
//       <outline type="rss" text="Realm.io" title="Realm.io" xmlUrl="https://realm.io/feed.xml" htmlUrl="https://realm.io/news/"/>
//       <outline type="rss" text="Redbubble" title="Redbubble" xmlUrl="http://artplustech.com/feed/" htmlUrl="http://artplustech.com/"/>
//       <outline type="rss" text="Redino" title="Redino" xmlUrl="http://redino.net/blog/feed/" htmlUrl="http://redino.net/blog/"/>
//       <outline type="rss" text="Reddit" title="Reddit" xmlUrl="https://www.reddit.com/login/?dest=https%3A%2F%2Fwww.reddit.com%2Fr%2FRedditEng.atom" htmlUrl="https://www.reddit.com/r/RedditEng/"/>
//       <outline type="rss" text="Red Hat" title="Red Hat" xmlUrl="https://developers.redhat.com/blog/feed/atom/" htmlUrl="https://developers.redhat.com/blog/"/>
//       <outline type="rss" text="Remind" title="Remind" xmlUrl="http://engineering.remind.com/feed.xml" htmlUrl="http://engineering.remind.com/"/>
//       <outline type="rss" text="RetailMeNot" title="RetailMeNot" xmlUrl="https://medium.com/feed/retailmenot-engineering" htmlUrl="https://medium.com/retailmenot-engineering/"/>
//       <outline type="rss" text="Rightscale" title="Rightscale" xmlUrl="http://eng.rightscale.com/feed.xml" htmlUrl="http://eng.rightscale.com/"/>
//       <outline type="rss" text="Riot Games" title="Riot Games" xmlUrl="https://engineering.riotgames.com/rss.xml" htmlUrl="https://engineering.riotgames.com/"/>
//       <outline type="rss" text="RisingStack" title="RisingStack" xmlUrl="https://blog.risingstack.com/rss/" htmlUrl="https://blog.risingstack.com/"/>
//       <outline type="rss" text="RoseHosting" title="RoseHosting" xmlUrl="https://www.rosehosting.com/blog/feed/" htmlUrl="https://www.rosehosting.com/blog/"/>
//       <outline type="rss" text="Runtastic" title="Runtastic" xmlUrl="https://www.runtastic.com/blog/en/feed/" htmlUrl="https://www.runtastic.com/blog/en/category/tech/"/>
//       <outline type="rss" text="Salesforce" title="Salesforce" xmlUrl="https://developer.salesforce.com/blogs/feed" htmlUrl="https://developer.salesforce.com/blogs/engineering/"/>
//       <outline type="rss" text="Schibsted Tech Polska" title="Schibsted Tech Polska" xmlUrl="http://www.schibsted.pl/blog/feed/" htmlUrl="http://www.schibsted.pl/blog/"/>
//       <outline type="rss" text="Scrapinghub" title="Scrapinghub" xmlUrl="https://blog.scrapinghub.com/rss.xml" htmlUrl="https://blog.scrapinghub.com/"/>
//       <outline type="rss" text="Scrunch" title="Scrunch" xmlUrl="https://tech.scrunch.com/blog/feeds/rss/" htmlUrl="https://tech.scrunch.com/blog/"/>
//       <outline type="rss" text="Secret Escapes" title="Secret Escapes" xmlUrl="http://tech.secretescapes.com/feed/" htmlUrl="http://tech.secretescapes.com/"/>
//       <outline type="rss" text="Segment" title="Segment" xmlUrl="https://segment.com/blog/atom.xml" htmlUrl="https://segment.com/blog/categories/engineering/"/>
//       <outline type="rss" text="Semantics3" title="Semantics3" xmlUrl="https://engineering.semantics3.com/feed" htmlUrl="https://engineering.semantics3.com"/>
//       <outline type="rss" text="Semaphore CI Community" title="Semaphore CI Community" xmlUrl="https://semaphoreci.com/community/tutorials.atom" htmlUrl="https://semaphoreci.com/community"/>
//       <outline type="rss" text="Semaphore CI Engineering" title="Semaphore CI Engineering" xmlUrl="http://semaphoreci.com/blog/engineering.xml" htmlUrl="http://semaphoreci.com/blog/tags/engineering.html"/>
//       <outline type="rss" text="Sensible" title="Sensible" xmlUrl="http://blog.sensible.io/rss" htmlUrl="http://blog.sensible.io/"/>
//       <outline type="rss" text="Serverless" title="Serverless" xmlUrl="https://serverless.com/blog/feed.xml" htmlUrl="https://serverless.com/blog/"/>
//       <outline type="rss" text="Settled" title="Settled" xmlUrl="https://engineroom.settled.co.uk/feed" htmlUrl="https://engineroom.settled.co.uk/"/>
//       <outline type="rss" text="Sharethis" title="Sharethis" xmlUrl="https://www.sharethis.com/feed/" htmlUrl="https://www.sharethis.com/category/engineering/"/>
//       <outline type="rss" text="Shazam" title="Shazam" xmlUrl="https://blog.shazam.com/feed" htmlUrl="https://blog.shazam.com/"/>
//       <outline type="rss" text="Shopify" title="Shopify" xmlUrl="https://shopify.engineering/blog.atom" htmlUrl="https://shopify.engineering/"/>
//       <outline type="rss" text="ShowMax" title="ShowMax" xmlUrl="https://tech.showmax.com/feed.xml" htmlUrl="https://tech.showmax.com"/>
//       <outline type="rss" text="Shyp" title="Shyp" xmlUrl="https://medium.com/feed/shyp-engineering" htmlUrl="https://medium.com/shyp-engineering"/>
//       <outline type="rss" text="Sift Science" title="Sift Science" xmlUrl="https://blog.siftscience.com/feed/" htmlUrl="https://blog.siftscience.com/?category=Engineering"/>
//       <outline type="rss" text="SitePoint" title="SitePoint" xmlUrl="https://www.sitepoint.com/feed/" htmlUrl="https://sitepoint.com"/>
//       <outline type="rss" text="Sky Betting &amp; Gaming" title="Sky Betting &amp; Gaming" xmlUrl="https://technology.skybettingandgaming.com/feed.xml" htmlUrl="http://engineering.skybettingandgaming.com/"/>
//       <outline type="rss" text="Skyscanner" title="Skyscanner" xmlUrl="https://medium.com/feed/@SkyscannerEng" htmlUrl="http://codevoyagers.com/"/>
//       <outline type="rss" text="Slack" title="Slack" xmlUrl="https://slack.engineering/feed" htmlUrl="https://slack.engineering/"/>
//       <outline type="rss" text="Small Improvements" title="Small Improvements" xmlUrl="https://tech.small-improvements.com/rss" htmlUrl="https://tech.small-improvements.com/"/>
//       <outline type="rss" text="Snyk" title="Snyk" xmlUrl="https://snyk.io/blog/feed.xml" htmlUrl="https://snyk.io/blog"/>
//       <outline type="rss" text="Soshace" title="Soshace" xmlUrl="https://blog.soshace.com/en/feed/" htmlUrl="https://blog.soshace.com/en/"/>
//       <outline type="rss" text="Soundcloud" title="Soundcloud" xmlUrl="https://developers.soundcloud.com/blog.rss" htmlUrl="https://developers.soundcloud.com/blog/"/>
//       <outline type="rss" text="Speedledger" title="Speedledger" xmlUrl="http://engineering.speedledger.com/feed/" htmlUrl="http://engineering.speedledger.com/"/>
//       <outline type="rss" text="Spotify" title="Spotify" xmlUrl="https://labs.spotify.com/feed/" htmlUrl="https://labs.spotify.com/"/>
//       <outline type="rss" text="Sqreen" title="Sqreen" xmlUrl="https://blog.sqreen.io/feed/" htmlUrl="https://blog.sqreen.io/"/>
//       <outline type="rss" text="Square" title="Square" xmlUrl="https://medium.com/feed/square-corner-blog" htmlUrl="https://corner.squareup.com/"/>
//       <outline type="rss" text="Squarespace" title="Squarespace" xmlUrl="https://engineering.squarespace.com/blog?format=RSS" htmlUrl="https://engineering.squarespace.com/"/>
//       <outline type="rss" text="Stack Overflow" title="Stack Overflow" xmlUrl="https://stackoverflow.blog/engineering/feed/" htmlUrl="https://stackoverflow.blog/engineering/"/>
//       <outline type="rss" text="Stackshare" title="Stackshare" xmlUrl="https://stackshare.io/featured-posts.atom" htmlUrl="https://stackshare.io/feed"/>
//       <outline type="rss" text="Stitch Fix" title="Stitch Fix" xmlUrl="https://multithreaded.stitchfix.com/feed.xml" htmlUrl="http://multithreaded.stitchfix.com/blog/"/>
//       <outline type="rss" text="Strava" title="Strava" xmlUrl="https://medium.com/feed/strava-engineering" htmlUrl="https://medium.com/strava-engineering/"/>
//       <outline type="rss" text="Stride" title="Stride" xmlUrl="https://www.stridenyc.com/blog/rss.xml" htmlUrl="https://blog.stridenyc.com/"/>
//       <outline type="rss" text="Stripe" title="Stripe" xmlUrl="https://stripe.com/blog/feed.rss" htmlUrl="https://stripe.com/blog"/>
//       <outline type="rss" text="SurveyMonkey" title="SurveyMonkey" xmlUrl="https://www.surveymonkey.com/feed/" htmlUrl="https://engineering.surveymonkey.com/"/>
//       <outline type="rss" text="Swiggy" title="Swiggy" xmlUrl="https://bytes.swiggy.com/feed" htmlUrl="https://bytes.swiggy.com/"/>
//       <outline type="rss" text="Takipi" title="Takipi" xmlUrl="https://blog.takipi.com/feed/" htmlUrl="http://blog.takipi.com/"/>
//       <outline type="rss" text="Target" title="Target" xmlUrl="https://target.github.io/feed.xml" htmlUrl="https://target.github.io/"/>
//       <outline type="rss" text="TaskRabbit" title="TaskRabbit" xmlUrl="http://tech.taskrabbit.com/feed.xml" htmlUrl="http://tech.taskrabbit.com/"/>
//       <outline type="rss" text="Teamwork" title="Teamwork" xmlUrl="https://engineroom.teamwork.com/feed" htmlUrl="https://engineroom.teamwork.com/"/>
//       <outline type="rss" text="Teespring" title="Teespring" xmlUrl="http://teespring.engineering/index.xml" htmlUrl="http://teespring.engineering/"/>
//       <outline type="rss" text="theScore" title="theScore" xmlUrl="http://techblog.thescore.com/feed.xml" htmlUrl="http://techblog.thescore.com/"/>
//       <outline type="rss" text="Thoughtbot" title="Thoughtbot" xmlUrl="https://feeds.feedburner.com/GiantRobotsSmashingIntoOtherGiantRobots" htmlUrl="https://robots.thoughtbot.com/"/>
//       <outline type="rss" text="ThoughtWorks" title="ThoughtWorks" xmlUrl="https://www.thoughtworks.com/rss/insights.xml" htmlUrl="https://www.thoughtworks.com/insights"/>
//       <outline type="rss" text="Thumbtack" title="Thumbtack" xmlUrl="https://www.thumbtack.com/engineering/feed/" htmlUrl="https://www.thumbtack.com/engineering/"/>
//       <outline type="rss" text="Timescale" title="Timescale" xmlUrl="https://blog.timescale.com/feed" htmlUrl="https://blog.timescale.com/"/>
//       <outline type="rss" text="Tinder" title="Tinder" xmlUrl="https://tech.gotinder.com/rss/" htmlUrl="https://tech.gotinder.com/"/>
//       <outline type="rss" text="Toptal" title="Toptal" xmlUrl="https://www.toptal.com/blog.rss" htmlUrl="https://www.toptal.com/blog/"/>
//       <outline type="rss" text="TrackMaven" title="TrackMaven" xmlUrl="http://engineroom.trackmaven.com/feeds/rss.xml" htmlUrl="http://engineroom.trackmaven.com/"/>
//       <outline type="rss" text="Transferwise" title="Transferwise" xmlUrl="https://tech.transferwise.com/rss/" htmlUrl="http://tech.transferwise.com/"/>
//       <outline type="rss" text="TripAdvisor" title="TripAdvisor" xmlUrl="http://engineering.tripadvisor.com/rss" htmlUrl="http://engineering.tripadvisor.com/"/>
//       <outline type="rss" text="Trivago" title="Trivago" xmlUrl="https://tech.trivago.com/index.xml" htmlUrl="http://tech.trivago.com/"/>
//       <outline type="rss" text="TrueCar" title="TrueCar" xmlUrl="https://www.drivenbycode.com/feed/" htmlUrl="https://www.drivenbycode.com/"/>
//       <outline type="rss" text="Tumblr" title="Tumblr" xmlUrl="https://engineering.tumblr.com/rss" htmlUrl="https://engineering.tumblr.com/"/>
//       <outline type="rss" text="Twilio" title="Twilio" xmlUrl="https://www.twilio.com/blog/feed" htmlUrl="https://www.twilio.com/blog/"/>
//       <outline type="rss" text="Twitter" title="Twitter" xmlUrl="https://blog.twitter.com/engineering/feed" htmlUrl="https://blog.twitter.com/engineering"/>
//       <outline type="rss" text="Twitch" title="Twitch" xmlUrl="https://medium.com/feed/twitch-news/tagged/engineering" htmlUrl="https://blog.twitch.tv/tagged/engineering"/>
//       <outline type="rss" text="Uber" title="Uber" xmlUrl="https://eng.uber.com/feed/" htmlUrl="http://eng.uber.com/"/>
//       <outline type="rss" text="Universe" title="Universe" xmlUrl="https://engineering.universe.com/feed" htmlUrl="https://engineering.universe.com"/>
//       <outline type="rss" text="Upday" title="Upday" xmlUrl="https://upday.github.io/feed.xml" htmlUrl="https://upday.github.io/"/>
//       <outline type="rss" text="UpGrad" title="UpGrad" xmlUrl="https://engineering.upgrad.com/feed" htmlUrl="https://engineering.upgrad.com"/>
//       <outline type="rss" text="Vena Solutions" title="Vena Solutions" xmlUrl="https://engineering.vena.io/rss/" htmlUrl="https://engineering.vena.io/"/>
//       <outline type="rss" text="Venmo" title="Venmo" xmlUrl="http://blog.venmo.com/hf2t3h4x98p5e13z82pl8j66ngcmry?format=RSS" htmlUrl="http://blog.venmo.com/?category=Engineering"/>
//       <outline type="rss" text="VersionEye" title="VersionEye" xmlUrl="https://blog.versioneye.com/feed/" htmlUrl="https://blog.versioneye.com/"/>
//       <outline type="rss" text="Vevo" title="Vevo" xmlUrl="https://medium.com/feed/vevo-engineering" htmlUrl="http://blog.vevo.com/"/>
//       <outline type="rss" text="Vine" title="Vine" xmlUrl="http://engineering.vine.co/rss" htmlUrl="http://engineering.vine.co/"/>
//       <outline type="rss" text="Vinted" title="Vinted" xmlUrl="http://engineering.vinted.com//atom.xml" htmlUrl="http://engineering.vinted.com/"/>
//       <outline type="rss" text="VNGRS" title="VNGRS" xmlUrl="http://blog.vngrs.com/rss.xml" htmlUrl="http://blog.vngrs.com/"/>
//       <outline type="rss" text="VTS" title="VTS" xmlUrl="https://buildingvts.com/feed" htmlUrl="https://buildingvts.com/"/>
//       <outline type="rss" text="WalmartLabs" title="WalmartLabs" xmlUrl="https://medium.com/feed/walmartlabs" htmlUrl="https://medium.com/walmartlabs/"/>
//       <outline type="rss" text="Wattpad" title="Wattpad" xmlUrl="http://engineering.wattpad.com/rss" htmlUrl="http://engineering.wattpad.com/"/>
//       <outline type="rss" text="Wayfair" title="Wayfair" xmlUrl="https://tech.wayfair.com/feed/" htmlUrl="http://engineering.wayfair.com/"/>
//       <outline type="rss" text="Wealthfront" title="Wealthfront" xmlUrl="http://eng.wealthfront.com/feed/" htmlUrl="http://eng.wealthfront.com/"/>
//       <outline type="rss" text="We Are Wizards" title="We Are Wizards" xmlUrl="https://blog.wearewizards.io/all.atom.xml" htmlUrl="https://blog.wearewizards.io/"/>
//       <outline type="rss" text="WebEngage" title="WebEngage" xmlUrl="https://engineering.webengage.com/feed/" htmlUrl="http://engineering.webengage.com/"/>
//       <outline type="rss" text="Wemake.services" title="Wemake.services" xmlUrl="https://medium.com/feed/wemake-services" htmlUrl="https://medium.com/wemake-services"/>
//       <outline type="rss" text="WePay" title="WePay" xmlUrl="https://wecode.wepay.com/feed.xml" htmlUrl="https://wecode.wepay.com/"/>
//       <outline type="rss" text="Wimdu" title="Wimdu" xmlUrl="http://tech.wimdu.com/rss" htmlUrl="http://tech.wimdu.com/"/>
//       <outline type="rss" text="Wingify" title="Wingify" xmlUrl="http://engineering.wingify.com/atom.xml" htmlUrl="http://engineering.wingify.com/"/>
//       <outline type="rss" text="Wombat Security Technologies" title="Wombat Security Technologies" xmlUrl="http://development.wombatsecurity.com/feed.xml" htmlUrl="http://development.wombatsecurity.com/"/>
//       <outline type="rss" text="Wonga Technology" title="Wonga Technology" xmlUrl="http://wongatech.github.io/feed.xml" htmlUrl="http://tech.wonga.com/"/>
//       <outline type="rss" text="WyeWorks" title="WyeWorks" xmlUrl="https://wyeworks.com/blog/atom.xml" htmlUrl="https://wyeworks.com/blog/"/>
//       <outline type="rss" text="XING" title="XING" xmlUrl="https://tech.xing.com/feed" htmlUrl="https://tech.xing.com/"/>
//       <outline type="rss" text="Yahoo" title="Yahoo" xmlUrl="https://yahooeng.tumblr.com/rss" htmlUrl="https://yahooeng.tumblr.com/"/>
//       <outline type="rss" text="Yammer" title="Yammer" xmlUrl="https://medium.com/feed/yammer-engineering" htmlUrl="https://medium.com/yammer-engineering"/>
//       <outline type="rss" text="Yelp" title="Yelp" xmlUrl="https://engineeringblog.yelp.com/feed.xml" htmlUrl="https://engineeringblog.yelp.com/"/>
//       <outline type="rss" text="YLD!" title="YLD!" xmlUrl="https://medium.com/feed/yld-engineering-blog" htmlUrl="https://blog.yld.io"/>
//       <outline type="rss" text="ZeeMee" title="ZeeMee" xmlUrl="https://zeemee.engineering/feed" htmlUrl="https://zeemee.engineering/"/>
//       <outline type="rss" text="Zendesk" title="Zendesk" xmlUrl="https://medium.com/feed/zendesk-engineering" htmlUrl="https://medium.com/zendesk-engineering"/>
//       <outline type="rss" text="Zendesk(old)" title="Zendesk(old)" xmlUrl="https://developerblog.zendesk.com/feed" htmlUrl="https://developer.zendesk.com/blog"/>
//       <outline type="rss" text="Zenefits" title="Zenefits" xmlUrl="https://engineering.zenefits.com/feed/" htmlUrl="https://engineering.zenefits.com/posts/"/>
//       <outline type="rss" text="Zillow" title="Zillow" xmlUrl="https://www.zillow.com/engineering/rss" htmlUrl="https://www.zillow.com/engineering/"/>
//       <outline type="rss" text="Zomato" title="Zomato" xmlUrl="https://engineering.zomato.com/rss" htmlUrl="https://engineering.zomato.com/"/>
//       <outline type="rss" text="Zoosk" title="Zoosk" xmlUrl="https://medium.com/feed/zoosk-engineering" htmlUrl="https://about.zoosk.com/en/engineering-blog/"/>
//       <outline type="rss" text="Zulily" title="Zulily" xmlUrl="https://zulily-tech.com/feed/" htmlUrl="https://engineering.zulily.com/"/>
//       <outline type="rss" text="Zumba" title="Zumba" xmlUrl="http://feeds.feedburner.com/zumba_engineering" htmlUrl="http://tech.zumba.com/"/>
//       <outline type="rss" text="0xADADA" title="0xADADA" xmlUrl="https://0xadada.pub/feed.xml" htmlUrl="https://0xadada.pub/"/>
//       <outline type="rss" text="Aaron Patterson" title="Aaron Patterson" xmlUrl="http://tenderlovemaking.com/atom.xml" htmlUrl="http://tenderlovemaking.com/"/>
//       <outline type="rss" text="Abu Ashraf Masnun" title="Abu Ashraf Masnun" xmlUrl="http://masnun.com/feed" htmlUrl="http://masnun.com/"/>
//       <outline type="rss" text="Addy Osmani" title="Addy Osmani" xmlUrl="http://addyosmani.com/rss.xml" htmlUrl="https://addyosmani.com/blog/"/>
//       <outline type="rss" text="Alan Storm" title="Alan Storm" xmlUrl="https://alanstorm.com/feed/feed.xml" htmlUrl="http://alanstorm.com/"/>
//       <outline type="rss" text="Alex Russell" title="Alex Russell" xmlUrl="https://infrequently.org/feed/" htmlUrl="https://infrequently.org/"/>
//       <outline type="rss" text="Amit Merchant" title="Amit Merchant" xmlUrl="https://www.amitmerchant.com/feed.xml" htmlUrl="https://www.amitmerchant.com/"/>
//       <outline type="rss" text="Anders Aarvik" title="Anders Aarvik" xmlUrl="http://aarvik.dk/rss/" htmlUrl="http://aarvik.dk/"/>
//       <outline type="rss" text="Andreas Schuster" title="Andreas Schuster" xmlUrl="https://computer.forensikblog.de/en/atom.xml" htmlUrl="https://computer.forensikblog.de/en/"/>
//       <outline type="rss" text="Andrew Bancroft" title="Andrew Bancroft" xmlUrl="https://www.andrewcbancroft.com/feed/" htmlUrl="http://www.andrewcbancroft.com/"/>
//       <outline type="rss" text="Andrew Ray" title="Andrew Ray" xmlUrl="http://blog.andrewray.me/rss/" htmlUrl="https://blog.andrewray.me/"/>
//       <outline type="rss" text="Andrey Akinshin" title="Andrey Akinshin" xmlUrl="http://aakinshin.net/en/rss.xml" htmlUrl="http://aakinshin.net/blog/"/>
//       <outline type="rss" text="Antirez" title="Antirez" xmlUrl="http://antirez.com/rss" htmlUrl="http://antirez.com/latest/0"/>
//       <outline type="rss" text="Ariejan de Vroom" title="Ariejan de Vroom" xmlUrl="https://www.devroom.io/index.xml" htmlUrl="https://ariejan.net/"/>
//       <outline type="rss" text="Ariya Hidayat" title="Ariya Hidayat" xmlUrl="https://ariya.io/index.xml" htmlUrl="https://ariya.io/"/>
//       <outline type="rss" text="Armin Ronacher" title="Armin Ronacher" xmlUrl="http://lucumr.pocoo.org/feed.atom" htmlUrl="http://lucumr.pocoo.org/"/>
//       <outline type="rss" text="Axel Rauschmayer" title="Axel Rauschmayer" xmlUrl="http://feeds.feedburner.com/2ality" htmlUrl="http://www.2ality.com/"/>
//       <outline type="rss" text="Bad Concurrency" title="Bad Concurrency" xmlUrl="http://bad-concurrency.blogspot.com/feeds/posts/default" htmlUrl="http://bad-concurrency.blogspot.com/"/>
//       <outline type="rss" text="Barry Warsaw" title="Barry Warsaw" xmlUrl="http://www.wefearchange.org/feeds/all.atom.xml" htmlUrl="https://www.wefearchange.org/"/>
//       <outline type="rss" text="Bartlomiej Filipek" title="Bartlomiej Filipek" xmlUrl="https://www.bfilipek.com/feeds/posts/default" htmlUrl="http://www.bfilipek.com/"/>
//       <outline type="rss" text="Ben McCormick" title="Ben McCormick" xmlUrl="https://benmccormick.org/feed.json" htmlUrl="https://benmccormick.org/"/>
//       <outline type="rss" text="Bill the Lizard" title="Bill the Lizard" xmlUrl="http://www.billthelizard.com/feeds/posts/default" htmlUrl="http://www.billthelizard.com/"/>
//       <outline type="rss" text="Bjørn Johansen" title="Bjørn Johansen" xmlUrl="https://bjornjohansen.no/feed" htmlUrl="https://bjornjohansen.no/"/>
//       <outline type="rss" text="Blake Erickson" title="Blake Erickson" xmlUrl="https://blog.blakeerickson.com/feed.xml" htmlUrl="https://blog.blakeerickson.com/"/>
//       <outline type="rss" text="Blundell's Android Tutorials" title="Blundell's Android Tutorials" xmlUrl="http://blog.blundellapps.co.uk/feed/" htmlUrl="http://blog.blundellapps.co.uk"/>
//       <outline type="rss" text="Bohops" title="Bohops" xmlUrl="https://bohops.com/feed/" htmlUrl="https://bohops.com/"/>
//       <outline type="rss" text="Brandon Rhodes" title="Brandon Rhodes" xmlUrl="http://rhodesmill.org/brandon/feed" htmlUrl="http://rhodesmill.org/brandon/"/>
//       <outline type="rss" text="Brendan Eich" title="Brendan Eich" xmlUrl="https://brendaneich.com/feed/" htmlUrl="https://brendaneich.com/"/>
//       <outline type="rss" text="Brendan Gregg" title="Brendan Gregg" xmlUrl="http://www.brendangregg.com/blog/rss.xml" htmlUrl="http://www.brendangregg.com/blog/"/>
//       <outline type="rss" text="Brujo Benavides" title="Brujo Benavides" xmlUrl="https://medium.com/feed/@elbrujohalcon" htmlUrl="https://medium.com/@elbrujohalcon"/>
//       <outline type="rss" text="Bryan Cantrill" title="Bryan Cantrill" xmlUrl="http://dtrace.org/blogs/bmc/feed/" htmlUrl="http://dtrace.org/blogs/bmc/"/>
//       <outline type="rss" text="Carlos Becker" title="Carlos Becker" xmlUrl="https://carlosbecker.com/index.xml" htmlUrl="https://carlosbecker.com"/>
//       <outline type="rss" text="Chen Hui Jing" title="Chen Hui Jing" xmlUrl="https://www.chenhuijing.com/feed.xml" htmlUrl="https://www.chenhuijing.com/blog/"/>
//       <outline type="rss" text="Chien Tran" title="Chien Tran" xmlUrl="http://thelazylog.com/rss/" htmlUrl="http://thelazylog.com/"/>
//       <outline type="rss" text="Chris Hager" title="Chris Hager" xmlUrl="https://www.metachris.com/index.xml" htmlUrl="https://www.metachris.com/blog/"/>
//       <outline type="rss" text="Chris Wellons" title="Chris Wellons" xmlUrl="http://nullprogram.com/feed/" htmlUrl="http://nullprogram.com/"/>
//       <outline type="rss" text="Clay McLeod" title="Clay McLeod" xmlUrl="http://blog.claymcleod.io/atom.xml" htmlUrl="http://blog.claymcleod.io/"/>
//       <outline type="rss" text="Code with style!" title="Code with style!" xmlUrl="https://codewithstyle.info/feed/" htmlUrl="https://codewithstyle.info/"/>
//       <outline type="rss" text="Codrops" title="Codrops" xmlUrl="https://tympanus.net/codrops/rss" htmlUrl="https://tympanus.net/codrops/"/>
//       <outline type="rss" text="Daily JS" title="Daily JS" xmlUrl="https://medium.com/feed/dailyjs" htmlUrl="https://medium.com/dailyjs"/>
//       <outline type="rss" text="Daily Tech Video" title="Daily Tech Video" xmlUrl="http://dailytechvideo.com/feed/" htmlUrl="http://dailytechvideo.com/"/>
//       <outline type="rss" text="Dan Luu" title="Dan Luu" xmlUrl="https://danluu.com/atom.xml" htmlUrl="https://danluu.com/"/>
//       <outline type="rss" text="Daniel Doubrovkine (dB.)" title="Daniel Doubrovkine (dB.)" xmlUrl="https://code.dblock.org/feed.xml" htmlUrl="http://code.dblock.org/"/>
//       <outline type="rss" text="Daniel Schmidt" title="Daniel Schmidt" xmlUrl="https://medium.com/feed/@dschmidt1992" htmlUrl="https://medium.com/@dschmidt1992"/>
//       <outline type="rss" text="Dave Atchley" title="Dave Atchley" xmlUrl="https://www.datchley.name/rss/" htmlUrl="http://www.datchley.name/"/>
//       <outline type="rss" text="Dave Cheney" title="Dave Cheney" xmlUrl="https://dave.cheney.net/feed" htmlUrl="https://dave.cheney.net/"/>
//       <outline type="rss" text="David Walsh" title="David Walsh" xmlUrl="https://davidwalsh.name/feed/atom" htmlUrl="https://davidwalsh.name/"/>
//       <outline type="rss" text="Dean Hume" title="Dean Hume" xmlUrl="https://deanhume.com/rss/" htmlUrl="http://deanhume.com/"/>
//       <outline type="rss" text="Deborah Digges" title="Deborah Digges" xmlUrl="http://deborah-digges.github.io/atom.xml" htmlUrl="http://deborah-digges.github.io/"/>
//       <outline type="rss" text="Dennis Felsing" title="Dennis Felsing" xmlUrl="https://hookrace.net/blog/feed/" htmlUrl="https://hookrace.net/"/>
//       <outline type="rss" text="Dennis Yurichev" title="Dennis Yurichev" xmlUrl="https://yurichev.com/blog/rss.xml" htmlUrl="https://yurichev.com/blog/"/>
//       <outline type="rss" text="Dereuromark" title="Dereuromark" xmlUrl="https://www.dereuromark.de/feed/" htmlUrl="http://www.dereuromark.de/"/>
//       <outline type="rss" text="Discover Meteor" title="Discover Meteor" xmlUrl="https://www.discovermeteor.com/feed.xml" htmlUrl="https://www.discovermeteor.com/blog"/>
//       <outline type="rss" text="Domenico Luciani" title="Domenico Luciani" xmlUrl="https://domenicoluciani.com/feed.xml" htmlUrl="https://domenicoluciani.com"/>
//       <outline type="rss" text="Dot Dev (.dev)" title="Dot Dev (.dev)" xmlUrl="https://dotdev.co/feed/" htmlUrl="https://dotdev.co"/>
//       <outline type="rss" text="Dragan Djuric" title="Dragan Djuric" xmlUrl="https://dragan.rocks/feed.xml" htmlUrl="http://dragan.rocks"/>
//       <outline type="rss" text="Dragan Gaic" title="Dragan Gaic" xmlUrl="https://www.gajotres.net/feed/" htmlUrl="http://www.gajotres.net/"/>
//       <outline type="rss" text="Drew DeVault" title="Drew DeVault" xmlUrl="https://drewdevault.com/feed.xml" htmlUrl="https://drewdevault.com/"/>
//       <outline type="rss" text="Eddie Smith" title="Eddie Smith" xmlUrl="http://www.practicallyefficient.com/feed.xml" htmlUrl="http://www.practicallyefficient.com/"/>
//       <outline type="rss" text="Edgar Aroutiounian" title="Edgar Aroutiounian" xmlUrl="https://hyegar.com/rss.xml" htmlUrl="https://hyegar.com/"/>
//       <outline type="rss" text="Edward Faulkner" title="Edward Faulkner" xmlUrl="https://eaf4.com/rss" htmlUrl="https://eaf4.com/"/>
//       <outline type="rss" text="Elegant Code" title="Elegant Code" xmlUrl="https://elegantcode.com/feed/" htmlUrl="http://elegantcode.com/"/>
//       <outline type="rss" text="Eli Bendersky" title="Eli Bendersky" xmlUrl="https://eli.thegreenplace.net/feeds/all.atom.xml" htmlUrl="http://eli.thegreenplace.net/"/>
//       <outline type="rss" text="Eric Elliot" title="Eric Elliot" xmlUrl="https://medium.com/feed/javascript-scene" htmlUrl="https://medium.com/javascript-scene/"/>
//       <outline type="rss" text="Eric Lippert" title="Eric Lippert" xmlUrl="https://ericlippert.com/feed/" htmlUrl="https://ericlippert.com/"/>
//       <outline type="rss" text="Erik Runyon" title="Erik Runyon" xmlUrl="https://erikrunyon.com/feed.xml" htmlUrl="https://erikrunyon.com/"/>
//       <outline type="rss" text="Evan Hahn" title="Evan Hahn" xmlUrl="https://evanhahn.com/feed.xml" htmlUrl="http://evanhahn.com/"/>
//       <outline type="rss" text="Evan Jones" title="Evan Jones" xmlUrl="http://www.evanjones.ca/index.rss" htmlUrl="http://www.evanjones.ca/chronological.html"/>
//       <outline type="rss" text="Evan Miller" title="Evan Miller" xmlUrl="http://www.evanmiller.org/news.xml" htmlUrl="http://www.evanmiller.org/"/>
//       <outline type="rss" text="Evan Tahler" title="Evan Tahler" xmlUrl="https://blog.evantahler.com/feed" htmlUrl="https://blog.evantahler.com/"/>
//       <outline type="rss" text="Fabrizio Branca" title="Fabrizio Branca" xmlUrl="http://fbrnc.net/blog.atom" htmlUrl="http://fbrnc.net/"/>
//       <outline type="rss" text="Federico Cargnelutti" title="Federico Cargnelutti" xmlUrl="https://blog.fedecarg.com/feed/" htmlUrl="https://blog.fedecarg.com/"/>
//       <outline type="rss" text="Federico Tomassetti" title="Federico Tomassetti" xmlUrl="https://tomassetti.me/feed/" htmlUrl="https://tomassetti.me/"/>
//       <outline type="rss" text="Filippo Valsorda" title="Filippo Valsorda" xmlUrl="https://blog.filippo.io/rss/" htmlUrl="https://blog.filippo.io/"/>
//       <outline type="rss" text="Freek Van der Herten" title="Freek Van der Herten" xmlUrl="https://murze.be/feed" htmlUrl="https://murze.be/"/>
//       <outline type="rss" text="Gleb Bahmutov" title="Gleb Bahmutov" xmlUrl="https://glebbahmutov.com/blog/atom.xml" htmlUrl="https://glebbahmutov.com/blog/"/>
//       <outline type="rss" text="Glenn Engstrand" title="Glenn Engstrand" xmlUrl="http://glennengstrand.info/blog/?feed=rss2" htmlUrl="http://glennengstrand.info"/>
//       <outline type="rss" text="Graham King" title="Graham King" xmlUrl="https://www.darkcoding.net/feed/" htmlUrl="https://www.darkcoding.net/"/>
//       <outline type="rss" text="Guido van Rossum" title="Guido van Rossum" xmlUrl="http://neopythonic.blogspot.com/feeds/posts/default" htmlUrl="http://neopythonic.blogspot.com/"/>
//       <outline type="rss" text="Guilherme Rodrigues" title="Guilherme Rodrigues" xmlUrl="https://firstdoit.com/feed" htmlUrl="https://firstdoit.com/"/>
//       <outline type="rss" text="Hayden James" title="Hayden James" xmlUrl="https://haydenjames.io/rss" htmlUrl="https://haydenjames.io/"/>
//       <outline type="rss" text="Henrik Lau Eriksson" title="Henrik Lau Eriksson" xmlUrl="https://conductofcode.io/feed.xml" htmlUrl="https://conductofcode.io/"/>
//       <outline type="rss" text="Henrik Warne" title="Henrik Warne" xmlUrl="https://henrikwarne.com/feed/" htmlUrl="https://henrikwarne.com/"/>
//       <outline type="rss" text="High Scalability" title="High Scalability" xmlUrl="http://feeds.feedburner.com/HighScalability" htmlUrl="http://highscalability.com/"/>
//       <outline type="rss" text="Huon Wilson" title="Huon Wilson" xmlUrl="http://huonw.github.io/blog/atom.xml" htmlUrl="http://huonw.github.io/"/>
//       <outline type="rss" text="Hypriot" title="Hypriot" xmlUrl="https://blog.hypriot.com/index.xml" htmlUrl="http://blog.hypriot.com/"/>
//       <outline type="rss" text="Ian Hummel" title="Ian Hummel" xmlUrl="https://themodernlife.github.io/feed.xml" htmlUrl="https://themodernlife.github.io/"/>
//       <outline type="rss" text="Ian Sommerville" title="Ian Sommerville" xmlUrl="http://iansommerville.com/systems-software-and-technology/feed/" htmlUrl="http://iansommerville.com/systems-software-and-technology/"/>
//       <outline type="rss" text="Idontgetoutmuch's Weblog" title="Idontgetoutmuch's Weblog" xmlUrl="https://idontgetoutmuch.wordpress.com/feed/" htmlUrl="https://idontgetoutmuch.wordpress.com/"/>
//       <outline type="rss" text="Ievgen Kuzminov" title="Ievgen Kuzminov" xmlUrl="http://stdout.in/en/cat/all.rss" htmlUrl="http://stdout.in/"/>
//       <outline type="rss" text="Ilija Eftimov" title="Ilija Eftimov" xmlUrl="http://ieftimov.com/feed.xml" htmlUrl="http://ieftimov.com/"/>
//       <outline type="rss" text="Ilya Grigorik" title="Ilya Grigorik" xmlUrl="https://www.igvita.com/feed/" htmlUrl="https://www.igvita.com/"/>
//       <outline type="rss" text="Itamar Turner-Trauring" title="Itamar Turner-Trauring" xmlUrl="https://codewithoutrules.com/atom.xml" htmlUrl="https://codewithoutrules.com"/>
//       <outline type="rss" text="Ivan Ursul" title="Ivan Ursul" xmlUrl="https://ivanursul.com/feed.xml" htmlUrl="https://ivanursul.com/"/>
//       <outline type="rss" text="Jacopo Tarantino" title="Jacopo Tarantino" xmlUrl="https://jack.ofspades.com/rss/index.html" htmlUrl="https://jack.ofspades.com/"/>
//       <outline type="rss" text="Jake Trent" title="Jake Trent" xmlUrl="https://jaketrent.com/index.xml" htmlUrl="https://jaketrent.com"/>
//       <outline type="rss" text="Jake Wharton" title="Jake Wharton" xmlUrl="http://jakewharton.com/feed.xml" htmlUrl="http://jakewharton.com/blog"/>
//       <outline type="rss" text="Jake Yesbeck" title="Jake Yesbeck" xmlUrl="http://jakeyesbeck.com/atom.xml" htmlUrl="http://jakeyesbeck.com/"/>
//       <outline type="rss" text="James Hague" title="James Hague" xmlUrl="http://prog21.dadgum.com/atom.xml" htmlUrl="http://prog21.dadgum.com/"/>
//       <outline type="rss" text="James Long" title="James Long" xmlUrl="http://feedpress.me/jlongster" htmlUrl="http://jlongster.com/archive"/>
//       <outline type="rss" text="Jamis Buck" title="Jamis Buck" xmlUrl="http://feeds.feedburner.com/buckblog" htmlUrl="http://weblog.jamisbuck.org/"/>
//       <outline type="rss" text="Jan Lelis" title="Jan Lelis" xmlUrl="https://idiosyncratic-ruby.com/feed.xml" htmlUrl="https://idiosyncratic-ruby.com/"/>
//       <outline type="rss" text="Jay Fields" title="Jay Fields" xmlUrl="http://blog.jayfields.com/feeds/posts/default" htmlUrl="http://blog.jayfields.com"/>
//       <outline type="rss" text="Jeff Atwood" title="Jeff Atwood" xmlUrl="http://feeds.feedburner.com/codinghorror" htmlUrl="https://blog.codinghorror.com/"/>
//       <outline type="rss" text="Jeff Preshing" title="Jeff Preshing" xmlUrl="http://preshing.com/feed" htmlUrl="http://preshing.com/"/>
//       <outline type="rss" text="Jeremy Kun" title="Jeremy Kun" xmlUrl="https://jeremykun.com/feed/" htmlUrl="https://jeremykun.com/"/>
//       <outline type="rss" text="Jerry Gamblin" title="Jerry Gamblin" xmlUrl="https://jerrygamblin.com/feed/" htmlUrl="https://jerrygamblin.com/"/>
//       <outline type="rss" text="Jesal Gadhia" title="Jesal Gadhia" xmlUrl="https://jes.al/atom.xml" htmlUrl="https://jes.al/"/>
//       <outline type="rss" text="Jessie Frazelle" title="Jessie Frazelle" xmlUrl="https://blog.jessfraz.com/index.xml" htmlUrl="https://blog.jessfraz.com/"/>
//       <outline type="rss" text="Jesus Castello" title="Jesus Castello" xmlUrl="http://www.blackbytes.info/rss" htmlUrl="http://www.blackbytes.info/"/>
//       <outline type="rss" text="Joe Nelson" title="Joe Nelson" xmlUrl="https://begriffs.com/atom.xml" htmlUrl="https://begriffs.com/"/>
//       <outline type="rss" text="Joel Spolsky" title="Joel Spolsky" xmlUrl="https://www.joelonsoftware.com/feed/" htmlUrl="https://www.joelonsoftware.com/"/>
//       <outline type="rss" text="Johannes Brodwall" title="Johannes Brodwall" xmlUrl="http://johannesbrodwall.com/feed/" htmlUrl="http://johannesbrodwall.com/"/>
//       <outline type="rss" text="John Resig" title="John Resig" xmlUrl="https://feeds.feedburner.com/JohnResig" htmlUrl="https://johnresig.com/category/blog/"/>
//       <outline type="rss" text="John Wittenauer" title="John Wittenauer" xmlUrl="https://www.johnwittenauer.net/rss/" htmlUrl="http://www.johnwittenauer.net/"/>
//       <outline type="rss" text="Jon Kensy" title="Jon Kensy" xmlUrl="http://www.jonkensy.com/feed/" htmlUrl="http://www.jonkensy.com/"/>
//       <outline type="rss" text="Jon Skeet" title="Jon Skeet" xmlUrl="https://codeblog.jonskeet.uk/feed/" htmlUrl="https://codeblog.jonskeet.uk/"/>
//       <outline type="rss" text="Jonas Plum" title="Jonas Plum" xmlUrl="https://blog.cugu.eu/index.xml" htmlUrl="https://blog.cugu.eu/"/>
//       <outline type="rss" text="Jonathan Dekhtiar" title="Jonathan Dekhtiar" xmlUrl="http://www.born2data.com/feed_atom.xml" htmlUrl="http://www.born2data.com/"/>
//       <outline type="rss" text="Jonathan Snook" title="Jonathan Snook" xmlUrl="https://snook.ca/jonathan/index.rdf" htmlUrl="https://snook.ca/"/>
//       <outline type="rss" text="Josh Haberman" title="Josh Haberman" xmlUrl="http://blog.reverberate.org/feed.xml" htmlUrl="http://blog.reverberate.org/"/>
//       <outline type="rss" text="Josh Sherman" title="Josh Sherman" xmlUrl="https://joshtronic.com/atom.xml" htmlUrl="https://joshtronic.com/"/>
//       <outline type="rss" text="Juan Treminio" title="Juan Treminio" xmlUrl="https://jtreminio.com/atom.xml" htmlUrl="https://jtreminio.com"/>
//       <outline type="rss" text="Julia Evans" title="Julia Evans" xmlUrl="https://jvns.ca/atom.xml" htmlUrl="https://jvns.ca/"/>
//       <outline type="rss" text="Junior Grossi" title="Junior Grossi" xmlUrl="https://blog.jgrossi.com/feed/" htmlUrl="https://blog.jgrossi.com/"/>
//       <outline type="rss" text="Justin Weiss" title="Justin Weiss" xmlUrl="https://www.justinweiss.com/atom.xml" htmlUrl="https://www.justinweiss.com/articles/archives/"/>
//       <outline type="rss" text="Juri Strumpflohner" title="Juri Strumpflohner" xmlUrl="https://feeds.feedburner.com/juristrumpflohner" htmlUrl="https://juristr.com/blog/"/>
//       <outline type="rss" text="K. Harrison" title="K. Harrison" xmlUrl="https://useyourloaf.com/blog/rss.xml" htmlUrl="https://useyourloaf.com/"/>
//       <outline type="rss" text="Kevin Burke" title="Kevin Burke" xmlUrl="https://kev.inburke.com/feed/" htmlUrl="https://kev.inburke.com/"/>
//       <outline type="rss" text="Kirill Shevchenko" title="Kirill Shevchenko" xmlUrl="https://medium.com/feed/@kirill_shevch" htmlUrl="https://medium.com/@kirill_shevch"/>
//       <outline type="rss" text="Kyle Kingsbury" title="Kyle Kingsbury" xmlUrl="https://aphyr.com/posts.atom" htmlUrl="https://aphyr.com/"/>
//       <outline type="rss" text="Lambda the Ultimate" title="Lambda the Ultimate" xmlUrl="http://lambda-the-ultimate.org/rss.xml" htmlUrl="http://lambda-the-ultimate.org/"/>
//       <outline type="rss" text="Larry Land" title="Larry Land" xmlUrl="http://lg.io/feed.xml" htmlUrl="https://lg.io/"/>
//       <outline type="rss" text="Lazarus Lazaridis" title="Lazarus Lazaridis" xmlUrl="https://iridakos.com/feed.xml" htmlUrl="https://iridakos.com"/>
//       <outline type="rss" text="Lea Verou" title="Lea Verou" xmlUrl="http://lea.verou.me/feed/" htmlUrl="http://lea.verou.me/"/>
//       <outline type="rss" text="Lerner Consulting Blog" title="Lerner Consulting Blog" xmlUrl="http://blog.lerner.co.il/feed/" htmlUrl="http://blog.lerner.co.il/"/>
//       <outline type="rss" text="Life Plus Linux" title="Life Plus Linux" xmlUrl="http://lifepluslinux.blogspot.com/feeds/posts/default" htmlUrl="http://lifepluslinux.blogspot.in/"/>
//       <outline type="rss" text="Luciano Mammino" title="Luciano Mammino" xmlUrl="http://loige.co/rss/" htmlUrl="https://loige.co/"/>
//       <outline type="rss" text="Manu Sporny" title="Manu Sporny" xmlUrl="http://manu.sporny.org/feed/" htmlUrl="http://manu.sporny.org/"/>
//       <outline type="rss" text="Marc Plano-Lesay" title="Marc Plano-Lesay" xmlUrl="https://enoent.fr/atom.xml" htmlUrl="https://enoent.fr"/>
//       <outline type="rss" text="Marcelo Rinesi" title="Marcelo Rinesi" xmlUrl="https://blog.rinesi.com/feed/" htmlUrl="https://blog.rinesi.com/"/>
//       <outline type="rss" text="Marco Pivetta" title="Marco Pivetta" xmlUrl="https://ocramius.github.io/atom.xml" htmlUrl="http://ocramius.github.io/"/>
//       <outline type="rss" text="Marek Majkowski" title="Marek Majkowski" xmlUrl="https://idea.popcount.org/rss.xml" htmlUrl="https://idea.popcount.org/"/>
//       <outline type="rss" text="Mark Seaborn" title="Mark Seaborn" xmlUrl="http://lackingrhoticity.blogspot.com/feeds/posts/default" htmlUrl="http://lackingrhoticity.blogspot.de/"/>
//       <outline type="rss" text="Martin Fowler" title="Martin Fowler" xmlUrl="https://martinfowler.com/feed.atom" htmlUrl="https://martinfowler.com/"/>
//       <outline type="rss" text="Mary Rose Cook" title="Mary Rose Cook" xmlUrl="https://maryrosecook.com/blog/feed.xml" htmlUrl="https://maryrosecook.com/blog/"/>
//       <outline type="rss" text="Matt Aimonetti" title="Matt Aimonetti" xmlUrl="https://matt.aimonetti.net/atom.xml" htmlUrl="https://matt.aimonetti.net/"/>
//       <outline type="rss" text="Matt Cutts" title="Matt Cutts" xmlUrl="https://www.mattcutts.com/blog/feed/" htmlUrl="https://www.mattcutts.com/blog/"/>
//       <outline type="rss" text="Matt Might" title="Matt Might" xmlUrl="http://matt.might.net/articles/feed.rss" htmlUrl="http://matt.might.net/articles/"/>
//       <outline type="rss" text="Matt Warren" title="Matt Warren" xmlUrl="http://mattwarren.org/atom.xml" htmlUrl="http://mattwarren.org/"/>
//       <outline type="rss" text="Matthew Green" title="Matthew Green" xmlUrl="https://blog.cryptographyengineering.com/feed/" htmlUrl="https://blog.cryptographyengineering.com/"/>
//       <outline type="rss" text="Michael Crump" title="Michael Crump" xmlUrl="https://www.michaelcrump.net/feed.xml" htmlUrl="https://michaelcrump.net/"/>
//       <outline type="rss" text="Michaël Gallego" title="Michaël Gallego" xmlUrl="http://www.michaelgallego.fr/feed.xml" htmlUrl="http://www.michaelgallego.fr/articles/"/>
//       <outline type="rss" text="Michael Herman" title="Michael Herman" xmlUrl="http://mherman.org/feed.xml" htmlUrl="http://mherman.org/"/>
//       <outline type="rss" text="Miguel Quinones" title="Miguel Quinones" xmlUrl="https://www.miqu.me/atom.xml" htmlUrl="https://www.miqu.me/"/>
//       <outline type="rss" text="Mike Ash" title="Mike Ash" xmlUrl="http://www.mikeash.com/pyblog/rss.py" htmlUrl="https://www.mikeash.com/pyblog/"/>
//       <outline type="rss" text="Mike Fogus" title="Mike Fogus" xmlUrl="http://blog.fogus.me/feed/" htmlUrl="http://blog.fogus.me/"/>
//       <outline type="rss" text="Milosz Galazka" title="Milosz Galazka" xmlUrl="https://blog.sleeplessbeastie.eu/feed.xml" htmlUrl="https://blog.sleeplessbeastie.eu/"/>
//       <outline type="rss" text="Miro Cupak" title="Miro Cupak" xmlUrl="https://mirocupak.com/feed.xml" htmlUrl="https://mirocupak.com/"/>
//       <outline type="rss" text="Monica Dinculescu" title="Monica Dinculescu" xmlUrl="https://meowni.ca/atom.xml" htmlUrl="https://meowni.ca/"/>
//       <outline type="rss" text="Monstermuffin" title="Monstermuffin" xmlUrl="https://blog.monstermuffin.org/feed/" htmlUrl="https://blog.monstermuffin.org/"/>
//       <outline type="rss" text="Mykhailo Kozik" title="Mykhailo Kozik" xmlUrl="http://feeds.feedburner.com/mishadoff" htmlUrl="http://mishadoff.com/"/>
//       <outline type="rss" text="Natasha Murashev" title="Natasha Murashev" xmlUrl="https://natashatherobot.com/rss" htmlUrl="https://natashatherobot.com"/>
//       <outline type="rss" text="Nelson Elhage" title="Nelson Elhage" xmlUrl="https://blog.nelhage.com/atom.xml" htmlUrl="https://blog.nelhage.com/"/>
//       <outline type="rss" text="Nic Raboy" title="Nic Raboy" xmlUrl="https://www.thepolyglotdeveloper.com/blog/index.xml" htmlUrl="https://www.thepolyglotdeveloper.com/blog/"/>
//       <outline type="rss" text="Nick Craver" title="Nick Craver" xmlUrl="https://nickcraver.com/blog/feed.xml" htmlUrl="https://nickcraver.com/blog/"/>
//       <outline type="rss" text="Nick Desaulniers" title="Nick Desaulniers" xmlUrl="https://nickdesaulniers.github.io/atom.xml" htmlUrl="https://nickdesaulniers.github.io/"/>
//       <outline type="rss" text="Nick Galbreath" title="Nick Galbreath" xmlUrl="https://www.client9.com/index.xml" htmlUrl="http://www.client9.com/"/>
//       <outline type="rss" text="Nicolas Liochon" title="Nicolas Liochon" xmlUrl="http://blog.thislongrun.com/feeds/posts/default" htmlUrl="http://blog.thislongrun.com/"/>
//       <outline type="rss" text="Nicolai Parlog (CodeFX)" title="Nicolai Parlog (CodeFX)" xmlUrl="http://blog.codefx.org/feed/" htmlUrl="http://codefx.org"/>
//       <outline type="rss" text="Nikola Brežnjak" title="Nikola Brežnjak" xmlUrl="http://www.nikola-breznjak.com/blog/feed/atom/" htmlUrl="http://www.nikola-breznjak.com/blog/"/>
//       <outline type="rss" text="Nikolay Nemshilov" title="Nikolay Nemshilov" xmlUrl="http://nikolay.rocks/atom.xml" htmlUrl="http://nikolay.rocks/"/>
//       <outline type="rss" text="NSHipster" title="NSHipster" xmlUrl="https://nshipster.com/feed.xml" htmlUrl="http://nshipster.com/"/>
//       <outline type="rss" text="Nate Berkopec" title="Nate Berkopec" xmlUrl="https://www.nateberkopec.com/feed.xml" htmlUrl="http://www.nateberkopec.com/"/>
//       <outline type="rss" text="Ofer Zelig" title="Ofer Zelig" xmlUrl="https://fullstack.info/feed/" htmlUrl="https://fullstack.info"/>
//       <outline type="rss" text="Ole Begemann" title="Ole Begemann" xmlUrl="https://oleb.net/blog/atom.xml" htmlUrl="https://oleb.net/blog/"/>
//       <outline type="rss" text="Oona Räisänen" title="Oona Räisänen" xmlUrl="http://www.windytan.com/feeds/posts/default" htmlUrl="http://www.windytan.com/"/>
//       <outline type="rss" text="Pamela Fox" title="Pamela Fox" xmlUrl="http://blog.pamelafox.org/feeds/posts/default" htmlUrl="http://blog.pamelafox.org/"/>
//       <outline type="rss" text="Pat Shaughnessy" title="Pat Shaughnessy" xmlUrl="http://feeds2.feedburner.com/patshaughnessy" htmlUrl="http://patshaughnessy.net/"/>
//       <outline type="rss" text="Paul Graham" title="Paul Graham" xmlUrl="http://www.aaronsw.com/2002/feeds/pgessays.rss" htmlUrl="http://www.paulgraham.com/articles.html"/>
//       <outline type="rss" text="Paul Irish" title="Paul Irish" xmlUrl="https://feeds.feedburner.com/paul-irish" htmlUrl="https://www.paulirish.com/"/>
//       <outline type="rss" text="Paul Lewis" title="Paul Lewis" xmlUrl="https://aerotwist.com/blog/feed/" htmlUrl="https://aerotwist.com/blog/"/>
//       <outline type="rss" text="Paweł Chudzik" title="Paweł Chudzik" xmlUrl="https://blog.pchudzik.com/index.xml" htmlUrl="https://blog.pchudzik.com/"/>
//       <outline type="rss" text="Peter Norvig" title="Peter Norvig" xmlUrl="http://www.norvig.com/rss-feed.xml" htmlUrl="http://norvig.com/"/>
//       <outline type="rss" text="Peter Steinberger" title="Peter Steinberger" xmlUrl="http://petersteinberger.com/atom.xml" htmlUrl="http://petersteinberger.com/"/>
//       <outline type="rss" text="Peteris Krumins" title="Peteris Krumins" xmlUrl="http://www.catonmat.net/feed/" htmlUrl="http://www.catonmat.net/blog/"/>
//       <outline type="rss" text="Petr Mitrichev" title="Petr Mitrichev" xmlUrl="https://petr-mitrichev.blogspot.com/feeds/posts/default" htmlUrl="http://petr-mitrichev.blogspot.com/"/>
//       <outline type="rss" text="Philip Walton" title="Philip Walton" xmlUrl="https://feeds.feedburner.com/philipwalton" htmlUrl="https://philipwalton.com/"/>
//       <outline type="rss" text="Philipp Oppermann" title="Philipp Oppermann" xmlUrl="https://os.phil-opp.com/atom.xml" htmlUrl="https://os.phil-opp.com/"/>
//       <outline type="rss" text="Pony Foo" title="Pony Foo" xmlUrl="https://feeds.feedburner.com/ponyfoo" htmlUrl="https://ponyfoo.com/"/>
//       <outline type="rss" text="Piotr Pasich" title="Piotr Pasich" xmlUrl="http://piotrpasich.com/feed/" htmlUrl="http://piotrpasich.com/"/>
//       <outline type="rss" text="Piotr Wittchen" title="Piotr Wittchen" xmlUrl="http://blog.wittchen.biz.pl/feed.xml" htmlUrl="http://blog.wittchen.biz.pl/"/>
//       <outline type="rss" text="Rachel Kroll" title="Rachel Kroll" xmlUrl="https://rachelbythebay.com/w/atom.xml" htmlUrl="https://rachelbythebay.com/w/"/>
//       <outline type="rss" text="Radek Pazdera" title="Radek Pazdera" xmlUrl="http://radek.io/rss.xml" htmlUrl="http://radek.io"/>
//       <outline type="rss" text="Radim Řehůřek" title="Radim Řehůřek" xmlUrl="https://radimrehurek.com/feed/" htmlUrl="https://radimrehurek.com/blog/"/>
//       <outline type="rss" text="Ramon Fried" title="Ramon Fried" xmlUrl="https://nativeguru.wordpress.com/feed/" htmlUrl="https://nativeguru.wordpress.com/"/>
//       <outline type="rss" text="Ray Wenderlich" title="Ray Wenderlich" xmlUrl="https://www.raywenderlich.com/rss" htmlUrl="https://www.raywenderlich.com/"/>
//       <outline type="rss" text="Raymond Chen" title="Raymond Chen" xmlUrl="https://blogs.msdn.microsoft.com/oldnewthing/feed" htmlUrl="https://blogs.msdn.microsoft.com/oldnewthing/"/>
//       <outline type="rss" text="Raymond Hettinger" title="Raymond Hettinger" xmlUrl="https://rhettinger.wordpress.com/feed/" htmlUrl="https://rhettinger.wordpress.com/"/>
//       <outline type="rss" text="ReactJS News" title="ReactJS News" xmlUrl="https://reactjsnews.com/feed.xml" htmlUrl="https://reactjsnews.com"/>
//       <outline type="rss" text="Real Python" title="Real Python" xmlUrl="https://realpython.com/atom.xml" htmlUrl="https://realpython.com/blog/"/>
//       <outline type="rss" text="Reginald Braithwaite" title="Reginald Braithwaite" xmlUrl="http://raganwald.com/atom.xml" htmlUrl="http://raganwald.com/#essays"/>
//       <outline type="rss" text="Regular Geek" title="Regular Geek" xmlUrl="http://feeds.regulargeek.com/RegularGeek" htmlUrl="http://regulargeek.com/"/>
//       <outline type="rss" text="Rob Allen" title="Rob Allen" xmlUrl="https://akrabat.com/feed/" htmlUrl="https://akrabat.com/"/>
//       <outline type="rss" text="Robert C. Martin" title="Robert C. Martin" xmlUrl="http://blog.cleancoder.com/atom.xml" htmlUrl="http://blog.cleancoder.com/"/>
//       <outline type="rss" text="Robin Ward" title="Robin Ward" xmlUrl="https://eviltrout.com/feed.xml" htmlUrl="https://eviltrout.com/"/>
//       <outline type="rss" text="Robin Wilson" title="Robin Wilson" xmlUrl="http://blog.rtwilson.com/feed/" htmlUrl="http://blog.rtwilson.com/"/>
//       <outline type="rss" text="Rudy Huyn" title="Rudy Huyn" xmlUrl="http://www.rudyhuyn.com/blog/feed/" htmlUrl="http://www.rudyhuyn.com/blog/"/>
//       <outline type="rss" text="Rudolf Olah" title="Rudolf Olah" xmlUrl="https://neverfriday.com/feed/" htmlUrl="https://neverfriday.com/blog/"/>
//       <outline type="rss" text="Ruslan Spivak" title="Ruslan Spivak" xmlUrl="https://ruslanspivak.com/feeds/all.atom.xml" htmlUrl="https://ruslanspivak.com/"/>
//       <outline type="rss" text="Sakib Sami" title="Sakib Sami" xmlUrl="https://www.sakib.ninja/rss/" htmlUrl="https://www.sakib.ninja"/>
//       <outline type="rss" text="Sam Saffron" title="Sam Saffron" xmlUrl="http://samsaffron.com/posts.rss" htmlUrl="https://samsaffron.com/"/>
//       <outline type="rss" text="Sergey Zhuk" title="Sergey Zhuk" xmlUrl="http://sergeyzhuk.me/feed.xml" htmlUrl="http://sergeyzhuk.me/"/>
//       <outline type="rss" text="Schakko" title="Schakko" xmlUrl="https://schakko.de/feed" htmlUrl="https://schakko.de"/>
//       <outline type="rss" text="Scott Hanselman" title="Scott Hanselman" xmlUrl="http://feeds.hanselman.com/ScottHanselman" htmlUrl="http://www.hanselman.com/blog/"/>
//       <outline type="rss" text="Scott Johnson" title="Scott Johnson" xmlUrl="http://fuzzyblog.io//blog/feed.xml" htmlUrl="http://www.fuzzyblog.io/blog/"/>
//       <outline type="rss" text="Simon Reimler" title="Simon Reimler" xmlUrl="https://devdactic.com/feed/" htmlUrl="https://devdactic.com/devblog/"/>
//       <outline type="rss" text="Srinivas Tamada" title="Srinivas Tamada" xmlUrl="https://www.9lessons.info/feeds/posts/default" htmlUrl="https://www.9lessons.info/"/>
//       <outline type="rss" text="Stack Abuse" title="Stack Abuse" xmlUrl="http://stackabuse.com/rss/" htmlUrl="http://www.stackabuse.com/"/>
//       <outline type="rss" text="Stanko Tadić" title="Stanko Tadić" xmlUrl="https://muffinman.io/atom.xml" htmlUrl="https://muffinman.io"/>
//       <outline type="rss" text="Stefan Parker" title="Stefan Parker" xmlUrl="http://codebeforethehorse.tumblr.com/rss" htmlUrl="http://codebeforethehorse.tumblr.com/"/>
//       <outline type="rss" text="Stephen Colebourne" title="Stephen Colebourne" xmlUrl="http://blog.joda.org/feeds/posts/default" htmlUrl="http://blog.joda.org/"/>
//       <outline type="rss" text="Steve Bellovin" title="Steve Bellovin" xmlUrl="https://www.cs.columbia.edu/~smb/blog/control/blog.xml" htmlUrl="https://www.cs.columbia.edu/~smb/blog/control/"/>
//       <outline type="rss" text="Steve Yegge" title="Steve Yegge" xmlUrl="https://steve-yegge.blogspot.com/feeds/posts/default" htmlUrl="https://steve-yegge.blogspot.com/"/>
//       <outline type="rss" text="Sudhagar" title="Sudhagar" xmlUrl="http://sudhagar.com/feed.xml" htmlUrl="http://sudhagar.com/"/>
//       <outline type="rss" text="Swizec Teller" title="Swizec Teller" xmlUrl="https://swizec.com/blog/feed" htmlUrl="https://swizec.com/blog/"/>
//       <outline type="rss" text="Tania Rascia" title="Tania Rascia" xmlUrl="https://tania.dev/rss.xml" htmlUrl="https://tania.dev/"/>
//       <outline type="rss" text="Tero Parviainen" title="Tero Parviainen" xmlUrl="http://teropa.info/blog/feed.xml" htmlUrl="http://teropa.info/"/>
//       <outline type="rss" text="That Thing In Swift" title="That Thing In Swift" xmlUrl="https://thatthinginswift.com/index.xml" htmlUrl="https://thatthinginswift.com/"/>
//       <outline type="rss" text="The Coded Self" title="The Coded Self" xmlUrl="https://thecodedself.github.io/feed.xml" htmlUrl="http://www.thecodedself.com"/>
//       <outline type="rss" text="The Daily WTF" title="The Daily WTF" xmlUrl="http://thedailywtf.com/rss" htmlUrl="http://thedailywtf.com/"/>
//       <outline type="rss" text="Thomas Young" title="Thomas Young" xmlUrl="http://upcoder.com/feed" htmlUrl="http://upcoder.com"/>
//       <outline type="rss" text="Tikhon Jelvis" title="Tikhon Jelvis" xmlUrl="http://jelv.is/blog/rss.xml" htmlUrl="http://jelv.is/blog/"/>
//       <outline type="rss" text="Todd Motto" title="Todd Motto" xmlUrl="https://toddmotto.com/feed.xml" htmlUrl="https://toddmotto.com/"/>
//       <outline type="rss" text="T.J. Maher" title="T.J. Maher" xmlUrl="http://www.tjmaher.com/feeds/posts/default" htmlUrl="http://adventuresinautomation.blogspot.com/"/>
//       <outline type="rss" text="Una Kravets" title="Una Kravets" xmlUrl="https://una.im/feed.xml" htmlUrl="https://una.im/"/>
//       <outline type="rss" text="Undocumented Matlab" title="Undocumented Matlab" xmlUrl="https://undocumentedmatlab.com/feed" htmlUrl="http://undocumentedmatlab.com/"/>
//       <outline type="rss" text="Vanilla Java" title="Vanilla Java" xmlUrl="http://vanillajava.blogspot.com/feeds/posts/default" htmlUrl="http://vanillajava.blogspot.com/"/>
//       <outline type="rss" text="Vlad Mihalcea" title="Vlad Mihalcea" xmlUrl="https://vladmihalcea.com/feed/" htmlUrl="https://vladmihalcea.com/"/>
//       <outline type="rss" text="Wilfred Hughes" title="Wilfred Hughes" xmlUrl="http://www.wilfred.me.uk/rss.xml" htmlUrl="http://www.wilfred.me.uk/"/>
//       <outline type="rss" text="William Kennedy" title="William Kennedy" xmlUrl="https://www.ardanlabs.com/blog/index.xml" htmlUrl="https://www.goinggo.net/"/>
//       <outline type="rss" text="Wojtek Gawroński" title="Wojtek Gawroński" xmlUrl="http://www.afronski.pl/feed.xml" htmlUrl="http://www.afronski.pl/"/>
//       <outline type="rss" text="Yegor Bugayenko" title="Yegor Bugayenko" xmlUrl="https://www.yegor256.com/rss.xml" htmlUrl="http://www.yegor256.com/"/>
//       <outline type="rss" text="Yifan Lu" title="Yifan Lu" xmlUrl="http://yifan.lu/feed.xml" htmlUrl="http://yifan.lu/"/>
//       <outline type="rss" text="Zach Holman" title="Zach Holman" xmlUrl="https://zachholman.com/atom.xml" htmlUrl="https://zachholman.com/"/>
//       <outline type="rss" text="Zolmeister" title="Zolmeister" xmlUrl="https://zolmeister.com/feeds/posts/default" htmlUrl="https://zolmeister.com/"/>
//       <outline type="rss" text="Android" title="Android" xmlUrl="https://android-developers.googleblog.com/feeds/posts/default" htmlUrl="https://android-developers.blogspot.com/"/>
//       <outline type="rss" text="Bootstrap.com" title="Bootstrap.com" xmlUrl="https://blog.getbootstrap.com/feed.xml" htmlUrl="https://blog.getbootstrap.com/"/>
//       <outline type="rss" text="Crystal" title="Crystal" xmlUrl="https://crystal-lang.org/feed.xml" htmlUrl="https://crystal-lang.org/"/>
//       <outline type="rss" text="Go" title="Go" xmlUrl="https://blog.golang.org/feed.atom" htmlUrl="https://blog.golang.org/"/>
//       <outline type="rss" text="IPFS" title="IPFS" xmlUrl="https://ipfs.io/blog/index.xml" htmlUrl="https://ipfs.io/blog/"/>
//       <outline type="rss" text="jOOQ" title="jOOQ" xmlUrl="https://blog.jooq.org/feed/" htmlUrl="https://blog.jooq.org/"/>
//       <outline type="rss" text="Klipse" title="Klipse" xmlUrl="http://blog.klipse.tech//feed.xml" htmlUrl="http://blog.klipse.tech/"/>
//       <outline type="rss" text="Kotlin" title="Kotlin" xmlUrl="https://blog.jetbrains.com/kotlin/feed/" htmlUrl="https://blog.jetbrains.com/kotlin/"/>
//       <outline type="rss" text="Laravel" title="Laravel" xmlUrl="https://feed.laravel-news.com/" htmlUrl="https://laravel-news.com/blog/"/>
//       <outline type="rss" text="Microsoft Edge" title="Microsoft Edge" xmlUrl="https://blogs.windows.com/msedgedev/rss" htmlUrl="https://blogs.windows.com/msedgedev/"/>
//       <outline type="rss" text=".NET" title=".NET" xmlUrl="https://blogs.msdn.microsoft.com/dotnet/feed/" htmlUrl="https://blogs.msdn.microsoft.com/dotnet/"/>
//       <outline type="rss" text="React" title="React" xmlUrl="https://reactjs.org/feed.xml" htmlUrl="https://reactjs.org/blog/"/>
//       <outline type="rss" text="React Native" title="React Native" xmlUrl="https://facebook.github.io/react-native/blog/atom.xml" htmlUrl="http://facebook.github.io/react-native/blog/"/>
//       <outline type="rss" text="Red" title="Red" xmlUrl="https://www.red-lang.org/feeds/posts/default" htmlUrl="http://www.red-lang.org"/>
//       <outline type="rss" text="RocksDB" title="RocksDB" xmlUrl="http://rocksdb.org/feed.xml" htmlUrl="http://rocksdb.org/blog"/>
//       <outline type="rss" text="Rust" title="Rust" xmlUrl="https://blog.rust-lang.org/feed.xml" htmlUrl="https://blog.rust-lang.org/"/>
//       <outline type="rss" text="Sketch" title="Sketch" xmlUrl="https://blog.sketchapp.com/feed" htmlUrl="https://blog.sketchapp.com/"/>
//       <outline type="rss" text="Swift" title="Swift" xmlUrl="https://developer.apple.com/swift/blog/news.rss" htmlUrl="https://developer.apple.com/swift/blog/"/>
//       <outline type="rss" text="Vertabelo" title="Vertabelo" xmlUrl="http://www.vertabelo.com/_rss/blog.xml" htmlUrl="http://www.vertabelo.com/blog"/>


const companyBlogLinkMap = new Map<string, string>();
// companyBlogLinkMap.set('Google', 'https://developers.googleblog.com/feeds/posts/default'); // TODO: atom fmt
// companyBlogLinkMap.set('Facebook', 'https://engineering.fb.com/feed/'); // TODO: v1?
// companyBlogLinkMap.set('Slack', 'https://slack.engineering/feed'); // TODO: v1?
// companyBlogLinkMap.set('Spotify', 'https://labs.spotify.com/feed/'); // TODO: v1?
// companyBlogLinkMap.set('Uber', 'https://eng.uber.com/feed/'); // FIXME: Not working
companyBlogLinkMap.set('Heroku', 'https://blog.heroku.com/engineering/feed');
companyBlogLinkMap.set('Cloudflare', 'https://blog.cloudflare.com/rss/');
companyBlogLinkMap.set('Twitch', 'https://medium.com/feed/twitch-news/tagged/engineering');
companyBlogLinkMap.set('Netflix', 'https://medium.com/feed/netflix-techblog');
companyBlogLinkMap.set('Airbnb', 'https://medium.com/feed/airbnb-engineering');
companyBlogLinkMap.set('Dropbox', 'https://blogs.dropbox.com/tech/feed/');
companyBlogLinkMap.set('Pinterest', 'https://medium.com/feed/@Pinterest_Engineering');

const fetchBlogPosts = async () => {
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

                const item = result.rss.channel[0].item[0];
                const title = item.title[0];
                const link = item.link[0];
                const publishedData = item.pubDate[0];

                const author = item['dc:creator']?.[0] || item.author?.[0];

                console.log('Title:', title);
                console.log('Published Date:', publishedData);
                console.log('Author:', author);
                console.log('Link:', link);
              }
            });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
}


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
fetchBlogPosts();