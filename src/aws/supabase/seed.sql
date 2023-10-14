--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

INSERT INTO "drizzle"."__drizzle_migrations" ("id", "hash", "created_at") VALUES
	(1, '8aa13adec16cdbe780f67aa9daf1457b13c181688a21cebd18444e4eb00fcae0', 1694332253597),
	(2, 'df7665d5770a6e967c150e9e48da1468fc7dafba4b141383a6fef9757f187f8b', 1694464508142),
	(3, '9d54fcfe7fff131c6a4ac5f7c7528cc4110d5ca9b7a8cf89ec43026012969d04', 1694996234711);


--
-- Data for Name: all_blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."all_blogs" ("id", "blog_uuid", "link", "company", "rss_version", "https_link") VALUES
	(14, 'b059a23b-4dd2-42b4-93d9-140b7472560e', 'https://engineering.fb.com/feed/', 'Facebook', '2.0', 'https://engineering.fb.com/'),
	(15, '7bbbdca2-ca6a-4a9e-b105-a52372bdedf1', 'https://blog.cloudflare.com/rss/', 'Cloudflare', '2.0', 'http://blog.cloudflare.com/'),
	(16, 'f21e05be-e869-49b8-823f-e5d506f1a135', 'https://medium.com/feed/twitch-news/tagged/engineering', 'Twitch', '2.0', 'https://medium.com/twitch-news/tagged/engineering?source=rss----3ae745429979--engineering'),
	(17, 'b6978d8d-84ce-46c5-82e0-fb2e9575ab89', 'https://medium.com/feed/netflix-techblog', 'Netflix', '2.0', 'https://netflixtechblog.com?source=rss----2615bd06b42e---4'),
	(18, '8e2fe39c-8b13-4ccc-b221-a2295a15526a', 'https://medium.com/feed/@Pinterest_Engineering', 'Pinterest', '2.0', 'https://medium.com/@Pinterest_Engineering?source=rss-ef81ef829bcb------2'),
	(19, 'a6a65988-1152-4c5d-aa21-f1ac77b58ad9', 'https://medium.com/feed/airbnb-engineering', 'Airbnb', '2.0', 'https://medium.com/airbnb-engineering?source=rss----53c7c27702d5---4'),
	(20, '028913b8-490d-499a-aa7e-e1268805cac9', 'https://slack.engineering/feed', 'Slack', '2.0', 'https://slack.engineering'),
	(21, '13835085-8f37-46d7-9244-ef184976c729', 'https://blog.twitter.com/engineering/feed', 'Twitter', '2.0', 'https://blog.twitter.com/engineering/en_us'),
	(22, '2c7ae522-0f41-4db4-a705-61aec7d0c779', 'https://codeascraft.com/feed/', 'Etsy', '2.0', 'http://www.etsy.com/codeascraft/rss'),
	(23, 'b338d145-51da-4e31-af1b-9f43d1bc3c3f', 'https://instagram-engineering.com/feed', 'Instagram', '2.0', 'https://instagram-engineering.com?source=rss----37dc2a3034f2---4'),
	(24, '5471e7d6-1797-4160-bc5b-5557ec4337df', 'https://blog.heroku.com/engineering/feed', 'Heroku', '2.0', 'http://blog.heroku.com'),
	(25, '69f5e387-4f49-4b08-a6de-169e18b55f62', 'https://labs.spotify.com/feed/', 'Spotify', '2.0', 'https://engineering.atspotify.com/'),
	(26, 'b6673421-a84e-41b0-b036-5ccae7079ba2', 'https://blogs.dropbox.com/tech/feed/', 'Dropbox', '2.0', 'https://dropbox.tech');


--
-- Data for Name: blog_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."blog_posts" ("id", "post_uuid", "title", "link", "author", "published_date", "blog_id", "title_hash") VALUES
	(1149, '04c482d1-05b7-4f30-8ac6-66b4d6ce5cf1', 'More Predictable Shared Dyno Performance', 'https://blog.heroku.com/more-predictable-shared-dyno-performance', 'Michael Friis', '2023-04-11 18:00:05', 24, '4211e88002bf9aeb21826ba1cd95735b6c01298d3447536f6d76bbcd44c847fb'),
	(1150, 'e35abb28-e68d-43e8-82ea-8e9eebb56b46', 'The Adventures of Rendezvous in Heroku’s New Architecture', 'https://blog.heroku.com/adventures-of-rendevous', 'Ethan Limchayseng', '2022-01-19 17:00:00', 24, '7e0b8ab71e08878f4582bc3a27a38395f8d1111a0b28f2a3df9a104d83246622'),
	(1151, 'b9a3f8d4-4496-4c7e-93fe-95ee59424080', 'Building a Monorepo with Yarn 2', 'https://blog.heroku.com/building-a-monorepo-with-yarn-2', 'Danielle Adams', '2020-12-22 20:53:08', 24, '489292d6aec46881e4cab2f3c9dc463fc8f3a950d114d162d8fcae361f1bba2f'),
	(1152, 'c8084dcf-ab8d-48aa-a86a-3c239b1f1346', 'Extend Flows with Heroku Compute: An Event-Driven Pattern', 'https://blog.heroku.com/extend-flows-heroku-event-driven', 'Chris Marino', '2020-12-11 16:30:00', 24, '1c10d99da643906b436212334355e5c84943f82e818e12e56e17dd2518de9f7f'),
	(1153, '2d946d80-9aaa-4b3f-8797-7c10f02b6e5c', 'Incident Response at Heroku', 'https://blog.heroku.com/incident-response-at-heroku-2020', 'Guillaume Winter', '2020-10-08 12:53:43', 24, 'fc097928950d6a7b5b3e2941fe377207382e7a6bf75b4fe0e068cb80eb0a6bbd'),
	(1154, '33d3b8c9-8b47-42dc-a445-da4ce8f5ba86', 'How I Broke `git push heroku main`', 'https://blog.heroku.com/how-i-broke-git-push-heroku-main', 'Damien Mathieu', '2020-10-01 15:30:00', 24, 'c1e2965613f7ff0658dd28276e7dba0d5a09f08edc182125c6c1d113e6276620'),
	(1155, '496f06fb-a9cb-4dfd-b05a-0bb15f1f6acd', 'The Life-Changing Magic of Tidying Ruby Object Allocations', 'https://blog.heroku.com/tidying-ruby-object-allocations', 'Richard Schneeman', '2020-09-16 14:58:00', 24, 'bfc7c33a69861f59e1175cd510885ec2d67d312c4139068b858afe3710b02410'),
	(1156, '868a90a3-3fd3-4e80-a531-84cf48807ce4', 'Let''s Debug a Node.js Application', 'https://blog.heroku.com/debug-node-applications', 'Julián Duque', '2020-08-03 16:08:55', 24, '05e36016d83ab796255786f8ef5d9e8cd676d3cef15e15486644ae6954023f4d'),
	(1157, 'baeb6b22-14cd-4a70-a84d-fef60f820289', 'Ground Control to Major TOML: Why Buildpacks Use a Most Peculiar Format', 'https://blog.heroku.com/why-buildpacks-use-toml', 'Joe Kutner', '2020-07-22 15:08:00', 24, '7ab278082a8733fce9e52a7739eda64f29d8cb3321b4e62cb29ea4d49d8d28fc'),
	(1158, '7b95598b-7953-4ead-b168-adb001c243c2', 'Making Time to Save You Time: How We Sped Up Time-Related Syscalls on Dynos', 'https://blog.heroku.com/clocksource-tuning', 'Will Farrington', '2020-07-16 16:50:00', 24, '92ba55f106a7560b35856f76cb68d675efc141a3a2ca2d70e12ed80bafeacd5f'),
	(1159, 'cefdcc41-5a40-408d-b67c-bf0849c81e80', 'A Fast Car Needs Good Brakes: How We Added Client Rate Throttling to the Platform API Gem', 'https://blog.heroku.com/rate-throttle-api-client', 'Richard Schneeman', '2020-07-07 20:30:00', 24, '22e90a0d410373344b5521e014c8469377633016b973ce950860d32e58da2a87'),
	(1160, '1c9069fb-2a74-4034-9e2b-58044c427c0c', 'Building a GraphQL API in JavaScript', 'https://blog.heroku.com/building-graphql-api-javascript', 'Owen Ou', '2020-06-24 15:30:00', 24, '54575b10d0f93eceea82f1a1335add6ff797d4bb1f220f70a93258e7dc9b7d57'),
	(1161, 'f2bcbdfb-6014-44ee-b306-0d27ae312d3d', 'From Project to Productionized with Python', 'https://blog.heroku.com/from-project-to-productionized-python', 'Ed Morley', '2020-06-22 16:00:00', 24, 'f056b5168f955be619f9677d892966b17002e6768f3a65cd81703ed60cc7160f'),
	(1162, '8e5c2d5d-b520-49f9-b4d3-7fa3022b9897', 'Evolving Alongside your Tech Stack', 'https://blog.heroku.com/evolving-alongside-tech-stack', 'Chris Castle', '2020-04-29 19:59:00', 24, '54b3b4d6c33a9db7a6d6fe52d89933e43abce7741dc060a62f514e5e9c2f47bb'),
	(1163, 'b87bafe8-9361-4806-91d4-acde7fe16c9e', 'Building and Scaling a Global Chatbot using Heroku + Terraform', 'https://blog.heroku.com/chatbots-with-heroku-terraform', 'Garen Torikian', '2020-04-22 15:33:17', 24, '4e6b47571c38ce7485198dda64be76f367a6a2c48ffa21906ad9c6ab64cd6806'),
	(1164, '3d91822a-3973-4621-9d45-051260d9c4f5', 'Building with Web Components', 'https://blog.heroku.com/building-with-web-components', 'Jamie White', '2020-03-04 16:45:00', 24, '90e6fc2a36398137c282b322e2a0143a0fdfeac13a3a25f0df8b32f01f7dd617'),
	(1165, '632d15fd-100a-4eeb-9e6d-db78c09aca63', 'Chrome''s Changes Could Break Your App: Prepare for SameSite Cookie Updates', 'https://blog.heroku.com/chrome-changes-samesite-cookie', 'Lenora Porter', '2020-02-03 21:30:00', 24, 'f6b08d3090533e9a8a496f0101e79fe3a7d93fb186fcf85cd8175e1b67393ad1'),
	(1166, 'add41902-ad4f-416e-b9c7-490e16667ab5', 'Terrier: An Open-Source Tool for Identifying and Analyzing Container and Image Components', 'https://blog.heroku.com/terrier-open-source-identifying-analyzing-containers', 'chris le roy', '2020-01-14 21:30:00', 24, 'e68903cfd74a53c0d051fdcb6a949ce573ead47611065ab0b57c25f2407c9e6d'),
	(1167, '4db50e1c-d7a7-4544-9090-a7f826300b4d', 'Know Your Database Types', 'https://blog.heroku.com/know-your-database-types', 'Ben Fritsch', '2019-12-18 18:07:49', 24, 'f88ec70e70bad2b02d86ff65d3e0f7f2c11c5cc34fc00630fb9a9b521b8729c6'),
	(1168, '3fe9aec5-d484-4d51-a781-5bfdfade4d32', 'The Curious Case of the Table-Locking UPDATE Query', 'https://blog.heroku.com/curious-case-table-locking-update-query', 'Richard Schneeman', '2019-12-18 18:07:00', 24, '16ebe75525b1882d9c518e51a223584e8cf593e891c5fbf3d0e92599427ec73b'),
	(1169, '2833dd78-c561-4092-a06d-d12332338982', 'Making Content Security Policies (CSPs) easy with Page Shield', 'http://blog.cloudflare.com/making-content-security-policies-csps-easy-with-page-shield/', 'Michael Tremante', '2023-09-15 13:00:57', 15, 'c1a569bda97ebc81112f97e6ad504f7bdd67332b31f5f79f9e1b20fe45f81f8f'),
	(1170, '119b3591-9eae-41cf-af65-f3fe7653dc08', 'Building companies means building careers: why I joined Cloudflare as Chief People Officer', 'http://blog.cloudflare.com/why-i-joined-cloudflare-as-chief-people-officer/', 'Michele Yetman', '2023-09-13 13:00:22', 15, 'd4612656f089e64e9af717d03f27a8498eb7e1fd0d0c055905515bd2ffb4b8ec'),
	(1171, '6fa2524d-d507-4bb6-963e-89e5e4e8b610', 'Elevate load balancing with Private IPs and Cloudflare Tunnels: a secure path to efficient traffic distribution', 'http://blog.cloudflare.com/elevate-load-balancing-with-private-ips-and-cloudflare-tunnels-a-secure-path-to-efficient-traffic-distribution/', 'Brian Batraski', '2023-09-08 13:00:01', 15, '1d50cc1d65f09b5019a6bf910b353844323d5ff6d8472edcf1add56e06ead767'),
	(1172, '469c4c72-5736-4160-abce-2cd507f57f68', 'Cloudflare One for Data Protection', 'http://blog.cloudflare.com/cloudflare-one-data-protection-announcement/', 'James Chang', '2023-09-07 13:00:35', 15, 'c84de5a5a3c4f86847956da8c4a6dda8613d8b9bfdf24a02c2dc1b84004127f7'),
	(1173, '48b71f03-b049-440f-8325-5c6aabfe4421', 'What’s next for Cloudflare One’s data protection suite', 'http://blog.cloudflare.com/cloudflare-one-data-protection-roadmap-preview/', 'Corey Mahan', '2023-09-07 13:00:31', 15, '58c957311abd4d33180e4742821d797f8ea52c6e2eb3d3653c1613bb70cecdb2'),
	(1174, 'eaadfc71-728e-42f9-845f-54da3db7c25d', 'Connection coalescing with ORIGIN Frames: fewer DNS queries, fewer connections', 'http://blog.cloudflare.com/connection-coalescing-with-origin-frames-fewer-dns-queries-fewer-connections/', 'Suleman Ahmad', '2023-09-04 13:00:51', 15, 'c1edcf2e92f096eac2ab1f59c9982d9f902f291b97fd7aa002d7603c4784fad6'),
	(1175, '69f80cc9-8d77-4d9c-a19f-828542c9baaa', 'Improving Worker Tail scalability', 'http://blog.cloudflare.com/improving-worker-tail-scalability/', 'Joshua Johnson', '2023-09-01 13:00:46', 15, '30d5cfd6fae92b2a1390d0639f2ef83078d426ed2918e4345b755bbb5155c573'),
	(1176, '08cdff19-fd2b-42f1-822f-84e51999b115', 'Cloudflare Radar’s 2023 overview of new tools and insights', 'http://blog.cloudflare.com/cloudflare-radars-2023-overview-of-new-tools-and-insights/', 'João Tomé', '2023-08-31 16:33:55', 15, '0f761a915be4e66f0388d8f0b0a8fbe647db44adb86f13018565239abe0b0b98'),
	(1177, '907303be-3013-468f-ab03-109425676512', 'Cloudflare’s tenant platform in action: Meter deploys DNS filtering at scale', 'http://blog.cloudflare.com/gateway-managed-service-provider-meter/', 'Mythili Prabhu', '2023-08-29 13:00:30', 15, '6c06ce7804243e8a8bfe17f8193039e3f23740011c79ffc0f22f223043887be9'),
	(1178, '7ad0ec67-812e-44dc-8a71-45e3f6cc942a', 'Star your favorite websites in the dashboard', 'http://blog.cloudflare.com/star-your-favorite-websites-in-the-dashboard/', 'Emily Flannery', '2023-08-24 13:00:37', 15, '53d262565bc906ad253e403db62b942f23a49e162b6112122da3907bcbc00308'),
	(1179, '2eedd26e-a0e1-4936-be00-aa4c2f3ddee5', 'Introducing the 2023 Intern-ets!', 'http://blog.cloudflare.com/introducing-the-2023-intern-ets/', 'Emilie Ma', '2023-08-23 17:30:50', 15, 'c5ec65e4ca81d48c88768be8bbcd678481db7dcd506bcbee04525ea4f0a6ebf8'),
	(1180, '2523d2a1-ad2f-4cb8-8aed-e7fd82ad4278', 'Application Security Report: Q2 2023', 'http://blog.cloudflare.com/application-security-report-q2-2023/', 'Michael Tremante', '2023-08-21 14:15:46', 15, '398f20681521a1cbdc1c4e2a7f99f32c3783f1abcc4bf2c6acc38a7d9843e758'),
	(1181, '914453ce-2b43-47ce-b875-76b862ce49a7', 'An August reading list about online security and 2023 attacks landscape', 'http://blog.cloudflare.com/an-august-reading-list-about-online-security-and-2023-attacks-landscape/', 'João Tomé', '2023-08-21 13:00:57', 15, '15e0178bc56a744927f90112d0619ec8461270be8a727aed378486db762b79bc'),
	(1182, 'a2fdbf55-d1ef-433f-8edf-9b2cf00962db', 'Introducing Cloudflare''s 2023 phishing threats report', 'http://blog.cloudflare.com/2023-phishing-report/', 'Elaine Dzuba', '2023-08-16 09:13:17', 15, '68c512ac50069154664e06feb54add2cea7939f8a8eb6852fa491bd8aca308db'),
	(1183, '54a6222b-141c-4967-819f-601daa23ce32', 'Wasm core dumps and debugging Rust in Cloudflare Workers', 'http://blog.cloudflare.com/wasm-coredumps/', 'Sven Sauleau', '2023-08-14 13:00:33', 15, 'e4e92d4a401e5b538c841901a94965b19405f189d4c4e3eeca2d5c084b75aa29'),
	(1184, '75caaa66-afee-4e8b-90e2-1ea042a99a79', 'ThisEmoteDoesNotExist: Training a GAN for Twitch Emotes', 'https://medium.com/twitch-news/thisemotedoesnotexist-training-a-gan-for-twitch-emotes-a742b6354b73?source=rss----3ae745429979--engineering', 'Avery Gnolek', '2019-07-24 22:05:46', 16, '2a8ce2fa110ee18a4ff644e8560b52dd05df441982c72723ac3226a7dc6047e8'),
	(1185, '7529d6ac-6b77-4d6c-8d30-9e4fbe2bb343', 'Go memory ballast: How I learnt to stop worrying and love the heap', 'https://medium.com/twitch-news/go-memory-ballast-how-i-learnt-to-stop-worrying-and-love-the-heap-26c2462549a2?source=rss----3ae745429979--engineering', 'Ross Engers', '2019-04-10 21:44:55', 16, 'a276deedd19f6b541bdd2fb48ccf4e7d6dd60c2d875dd0b977b0185d1413d16f'),
	(1186, '041196c1-0efa-4735-88fd-ebc4501800e9', 'How Twitch Addresses Scalability and Authentication', 'https://medium.com/twitch-news/how-twitch-addresses-scalability-and-authentication-718d6ed3c471?source=rss----3ae745429979--engineering', 'Eugene Pivovarov', '2019-03-15 19:13:30', 16, 'a80ad4a8b006564d264241ca7a2f68c694df0e14501fcfa0fc5cacafbc23a02c'),
	(1187, '9a714df1-7f66-4aaa-9344-2105b6956af7', 'Twitch for Android: From Meme to Dream', 'https://medium.com/twitch-news/twitch-for-android-from-meme-to-dream-141e6b7e8416?source=rss----3ae745429979--engineering', 'Joaquim Verges', '2019-02-26 21:45:39', 16, 'c4b4be1c2a95ad43e95d79cfab31c57a20a39920960d2b02701d3cb90e4f9b89'),
	(1188, '3d3b895d-e3c6-43cf-b5e1-79dd9c821751', 'How VP9 delivers value for Twitch’s esports live streaming', 'https://medium.com/twitch-news/how-does-vp9-deliver-value-for-twitchs-esports-live-streaming-35db26f6322f?source=rss----3ae745429979--engineering', 'Yueshi Shen', '2018-12-19 21:12:17', 16, '40d4e92f0baa690cb32403dfcfb58a73b9b1b0254364f6346a48d7ff874d3a95'),
	(1189, '78bb93b9-b059-4026-b4a5-69da7ee8e672', 'Artisanal Objective-C Sum Types', 'https://medium.com/twitch-news/artisanal-objective-c-sum-types-8ea1ab9da342?source=rss----3ae745429979--engineering', 'Heath Borders', '2018-05-14 18:49:35', 16, '50eed09eda9a680c41df5ffafd8d125aa2531276a7afddc335c950c68a55ba6d'),
	(1190, 'ad763b8e-02f7-4b0c-965f-b428a854d20b', 'Twirp: a sweet new RPC framework for Go', 'https://medium.com/twitch-news/twirp-a-sweet-new-rpc-framework-for-go-5f2febbf35f?source=rss----3ae745429979--engineering', 'Spencer Nelson', '2018-01-16 20:19:57', 16, '686046e6a7b9b7464f9c090ead94f01ee3130f692d4bf78d9b4e79ee3d9d3e43'),
	(1191, '05d162d6-f150-4680-84a7-9ce996a4e6d5', 'Twitch invites you to take on the ICME 2018 Grand Challenge', 'https://medium.com/twitch-news/twitch-invites-you-to-take-on-the-icme-2018-grand-challenge-2b3824d3537b?source=rss----3ae745429979--engineering', 'Yueshi Shen', '2017-12-01 17:56:37', 16, '50bdd24b3f088d0346eeed33c5c090db15877f4554b8030ffda8573b1ab03079'),
	(1192, 'b36c4a84-951b-4b0d-9979-5473d3452551', 'Live Video Transmuxing/Transcoding: FFmpeg vs TwitchTranscoder, Part II', 'https://medium.com/twitch-news/live-video-transmuxing-transcoding-ffmpeg-vs-twitchtranscoder-part-ii-4973f475f8a3?source=rss----3ae745429979--engineering', 'Yueshi Shen', '2017-10-23 21:08:55', 16, '4c20ad96da4f8ee56d644b0ec6d5da2a640ca1aafd03c1daeb5303a319ce31c4'),
	(1193, '261fef09-50d7-4b1d-b9c6-2072b722eb02', 'Live Video Transmuxing/Transcoding: FFmpeg vs TwitchTranscoder, Part I', 'https://medium.com/twitch-news/live-video-transmuxing-transcoding-ffmpeg-vs-twitchtranscoder-part-i-489c1c125f28?source=rss----3ae745429979--engineering', 'Yueshi Shen', '2017-10-10 18:40:03', 16, '3940e141d111db74c1b1213d583e2831bd39870d10651e80fce4eeb4b5fcd474'),
	(1194, '3964dd48-155c-4b54-b49e-48c59791cfbb', 'Zero Configuration Service Mesh with On-Demand Cluster Discovery', 'https://netflixtechblog.com/zero-configuration-service-mesh-with-on-demand-cluster-discovery-ac6483b52a51?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-08-29 23:08:45', 17, '28fa0499e0158667f773e1e8fb749d3fce850cda37178c5a8250899d66dc6e53'),
	(1195, '27b404a0-0cf6-423a-a41a-0d5a8a8f0307', 'AVA Discovery View: Surfacing Authentic Moments', 'https://netflixtechblog.com/ava-discovery-view-surfacing-authentic-moments-b8cd145491cc?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-08-17 22:07:14', 17, 'fd86a4428ec665c4d2e044c7e284bd342b80441e3059a0dd832f5479246b3197'),
	(1196, 'e4380362-abe2-481e-84fb-3885a0aeaca1', 'Curbing Connection Churn in Zuul', 'https://netflixtechblog.com/curbing-connection-churn-in-zuul-2feb273a3598?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-08-16 17:55:48', 17, '4c1418f408b870bd4f7428d9ea7de96e2ba7c0f040b9086c3bfe054ea48e32dd'),
	(1197, 'e442b94a-6bb5-46dc-a341-e7b4e51ef7a0', 'Detecting Scene Changes in Audiovisual Content', 'https://netflixtechblog.com/detecting-scene-changes-in-audiovisual-content-77a61d3eaad6?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-06-20 16:51:36', 17, '3c819af7a374336d2501cadba7c5d89d4b3f9f750f49056dd84c3f640c0be1b0'),
	(1198, 'd97c8c38-07c5-4330-aa63-fddf3989168d', 'Migrating Netflix to GraphQL Safely', 'https://netflixtechblog.com/migrating-netflix-to-graphql-safely-8e1e4d4f1e72?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-06-14 17:59:46', 17, 'b44c544afdf39a97271b86092a51889c6a87ac32d336896e201fde0b414383f0'),
	(1199, '0f674f28-e7da-4f40-9ff0-82b89a4f5527', 'Migrating Critical Traffic At Scale with No Downtime — Part 2', 'https://netflixtechblog.com/migrating-critical-traffic-at-scale-with-no-downtime-part-2-4b1c8c7155c1?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-06-13 17:23:17', 17, '7bb4da89dfd3e27b7b5972b5c5f538754420a0af9d909cc41f71a499497f4de3'),
	(1200, '47645cd4-ed2e-415f-961a-570b28c3c094', 'Escrow Buddy: An open-source tool from Netflix for remediation of missing FileVault keys in MDM', 'https://netflixtechblog.com/escrow-buddy-an-open-source-tool-from-netflix-for-remediation-of-missing-filevault-keys-in-mdm-815aef5107cd?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-06-12 16:36:25', 17, 'c6d2cc8f83d3646f02a6c6692b1746b0accc38ba9b28a3a9da384dc0e931497d'),
	(1201, 'e9a883d0-83d5-48c9-b107-2bdcd1245c0a', 'Native Frame Rate Playback', 'https://netflixtechblog.com/native-frame-rate-playback-6c87836a948?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-06-05 16:31:44', 17, '64182881af9632dc11eb696931285228810d3b58986dc41c0e396456a2f50d09'),
	(1202, '97bb9899-6f00-4067-a66b-aaabc30d042d', 'Ensuring the Successful Launch of Ads on Netflix', 'https://netflixtechblog.com/ensuring-the-successful-launch-of-ads-on-netflix-f99490fdf1ba?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-06-01 19:22:48', 17, '6fb4e1c7b87f6d92559065cf959c64a544e708dc7cd69e74a55a8b5633e78619'),
	(1203, '0dbf34d6-9569-4ea0-9e3f-9a7568148b62', 'Debugging a FUSE deadlock in the Linux kernel', 'https://netflixtechblog.com/debugging-a-fuse-deadlock-in-the-linux-kernel-c75cd7989b6d?source=rss----2615bd06b42e---4', 'Netflix Technology Blog', '2023-05-19 19:21:03', 17, 'abb1beb531c8c87aa4734088bd51d49e8dc0a02ec75601c95c7657e2ea7073fb'),
	(1204, '5d7b1949-7e6b-40b3-b135-b5bfce34d7d8', 'Riverbed: Optimizing Data Access at Airbnb’s Scale', 'https://medium.com/airbnb-engineering/riverbed-optimizing-data-access-at-airbnbs-scale-c37ecf6456d9?source=rss----53c7c27702d5---4', 'Amre Shakim', '2023-07-25 18:46:01', 19, '3fdadc0e64e4732bda6de3ce5231e3c3bb5f0c591b5f9130e2119ca1e70d5b2b'),
	(1205, 'eaa0ee2d-8913-4f69-8fee-d56dfdee3d76', 'Chronon — A Declarative Feature Engineering Framework', 'https://medium.com/airbnb-engineering/chronon-a-declarative-feature-engineering-framework-b7b8ce796e04?source=rss----53c7c27702d5---4', 'Nikhil Simha', '2023-07-11 18:48:31', 19, 'b281cdc7c664e722ae033a1c9859986e7d7f3ef41c9e48bda1160eeeaf6668f7'),
	(1206, '5460b82f-5392-4c89-93a5-a0fcfe88d2b8', 'Metis: Building Airbnb’s Next Generation Data Management Platform', 'https://medium.com/airbnb-engineering/metis-building-airbnbs-next-generation-data-management-platform-d2c5219edf19?source=rss----53c7c27702d5---4', 'Xiaobin Zheng', '2023-06-08 17:09:03', 19, '0d0b2bcd1f0ee581ea442a881478391ddd2c8d6b9cf6449eb2ec69198697b09e'),
	(1207, '6effd596-2f08-4b71-a91c-2159879afc6b', 'Improving Performance with HTTP Streaming', 'https://medium.com/airbnb-engineering/improving-performance-with-http-streaming-ba9e72c66408?source=rss----53c7c27702d5---4', 'Victor', '2023-05-17 16:48:22', 19, '9676c78ae8336a2407284b34b3416bcba7b57e8a010db9f9194cd11cf0c1ab30'),
	(1208, 'c5c436b7-a78b-4a4d-9d80-3ba164a57c93', 'Journey Platform: A low-code tool for creating interactive user workflows', 'https://medium.com/airbnb-engineering/journey-platform-a-low-code-tool-for-creating-interactive-user-workflows-9954f51fa3f8?source=rss----53c7c27702d5---4', 'Arjun Raman', '2023-05-11 19:13:03', 19, 'e0350d7a9794a41c1469668ae5d20025ff94903af914190a07527d11315209d5'),
	(1209, 'e7210cdf-8a59-4699-9337-1cda9f5cbf12', 'Flexible Continuous Integration for iOS', 'https://medium.com/airbnb-engineering/flexible-continuous-integration-for-ios-4ab33ea4072f?source=rss----53c7c27702d5---4', 'Michael Bachand', '2023-05-10 17:01:55', 19, '305b6d7ed07ae79d90aa9bed7a2648aee96924fba6017884eb3a220f7df2157b'),
	(1210, '8207dc5c-9d1c-4e5c-9835-503cbc603f34', 'My Journey to Airbnb — Michael Kinoti', 'https://medium.com/airbnb-engineering/my-journey-to-airbnb-michael-kinoti-645d4c228d06?source=rss----53c7c27702d5---4', 'Lauren Mackevich', '2023-04-26 20:26:57', 19, '1c1d1f299c0aa5c4fc0731e4c9c6bd25b525fb2c0a552d643fb8eda40dfaaea2'),
	(1211, '2e879a05-a089-4e8b-8bb7-f1cdd6182755', 'Improving Istio Propagation Delay', 'https://medium.com/airbnb-engineering/improving-istio-propagation-delay-d4da9b5b9f90?source=rss----53c7c27702d5---4', 'Ying Zhu', '2023-03-23 18:20:38', 19, 'b44ba4a51cdb8475c140e131197365caf46d708da8f4274c7f6df213b1ea6eaa'),
	(1212, '7e6b05e0-86fd-4f88-b78d-0e454c8d2363', 'Building Airbnb Categories with ML & Human in the Loop', 'https://medium.com/airbnb-engineering/building-airbnb-categories-with-ml-human-in-the-loop-35b78a837725?source=rss----53c7c27702d5---4', 'Mihajlo Grbovic', '2023-03-22 22:03:24', 19, 'c325312a3ccf67bccea02c66403c512fab42270134d68bd19f97e0800f91c1b7'),
	(1213, 'f42b5e47-97e1-40dd-af29-3fa45303df77', 'Prioritizing Home Attributes Based on Guest Interest', 'https://medium.com/airbnb-engineering/prioritizing-home-attributes-based-on-guest-interest-3c49b827e51a?source=rss----53c7c27702d5---4', 'Joy Jing', '2023-02-16 17:05:39', 19, '44943c4429cd30944e7c664f1d2b85ce049c0e670282847127a0f93045d1fd1d'),
	(1214, '81cc795b-f971-4282-9dde-9553267ef6c0', 'How we reduced the size of our JavaScript bundles by 33%', 'https://dropbox.tech/frontend/how-we-reduced-the-size-of-our-javascript-bundles-by-33-percent', 'Umair Nadeem and Rich Hong', '2023-08-16 13:00:00', 26, '0488efda9e9e9df3ab0c76c3a587867dfbbd413f213ca686a8dd16d413dbe153'),
	(1215, '673d4607-4373-4149-ab8a-cc17e4a180ee', 'Beta version of major SwiftyDropbox update available', 'https://dropbox.tech/developers/swiftydropbox-major-beta', 'Dropbox Platform Team', '2023-07-28 14:30:00', 26, 'e02ce754003ee99befe3192de175ffc5486b085ef39e9e9460dde67e6222ecf7'),
	(1216, '75e2bdbe-39b6-4bb3-a365-be10feae501f', 'Dont you (forget NLP): Prompt injection with control characters in ChatGPT', 'https://dropbox.tech/machine-learning/prompt-injection-with-control-characters-openai-chatgpt-llm', 'Mark Breitenbach, Adrian Wood, Win Suen, and Po-Ning Tseng', '2023-07-19 14:00:00', 26, 'fa99c2bcdd35f4cddd54d4a63920d8666e98f3b9aaf1435b0fa94d5c8a0b08eb'),
	(1217, '13691886-40d1-44d7-9793-2d2b05ddbf94', 'How the data center site selection process works at Dropbox', 'https://dropbox.tech/infrastructure/how-the-data-center-site-selection-process-works-at-dropbox', 'Edward del Rio', '2023-06-13 13:00:00', 26, '6aded7ab90953351cb8e054c3a9a5422b6230b97216f22254f24805a1f88dd07'),
	(1218, 'ed5645a4-5058-405c-b499-19bd37e17cf1', 'Investigating the impact of HTTP3 on network latency for search', 'https://dropbox.tech/frontend/investigating-the-impact-of-http3-on-network-latency-for-search', 'Tiffany Fong, Mike Lyons, and Nikita Shirokov', '2023-05-16 13:00:00', 26, '47a0b2fd8852b5e13da82c911a7ff82a33d7e39c64b0839f25851c8bfe39e44b'),
	(1219, '25beca94-80bc-4768-82a7-73131c87bad7', 'Lessons learned: Using a cybersecurity vendor to check for malicious links', 'https://dropbox.tech/security/changing-how-we-identify-malicious-urls-in-shared-documents', 'Dropbox Security Team', '2023-05-09 12:55:00', 26, 'eb2abfa17cdaa09dd63c4b4d247e773a200dddf58ff27504ad585283041e5513'),
	(1220, 'cc100313-6fe5-4601-8a1a-a460202955be', 'How Edison is helping us build a faster, more powerful Dropbox on the web', 'https://dropbox.tech/frontend/edison-webserver-a-faster-more-powerful-dropbox-on-the-web', 'Giles Copp', '2023-04-11 14:00:00', 26, '083a8a20990b6dc3a466de5aeab07d30a529621e1756d2a53eaaeef46dffd812'),
	(1221, '7368efb9-0994-4f3a-bf0b-f90c6ca39d1c', 'Here''s the latest version of our Engineering Career Framework', 'https://dropbox.tech/culture/our-updated-engineering-career-framework', 'Andrew Schamp', '2023-04-06 15:00:00', 26, 'd1ea87d09f4d3e7feeedb1e263d83f79a1b89b83118f5cc2436a1e7d6da84277'),
	(1222, '92006957-230b-451a-afec-82c2f5b7c5ac', 'After four years of SMR storage, here''s what we love?and what comes next', 'https://dropbox.tech/infrastructure/four-years-of-smr-storage-what-we-love-and-whats-next', 'Eric Shobe', '2023-03-08 15:00:00', 26, '19738433764bbcec10f8847957c7c729dddd4d0d35e495a4482aa9a43037dc64'),
	(1223, 'dbfd7134-5394-4af0-8851-d55018c1ea83', 'Balancing quality and coverage with our data validation framework', 'https://dropbox.tech/infrastructure/balancing-quality-and-coverage-with-our-data-validation-framework', 'Alexey Sanko', '2023-02-07 15:00:00', 26, '078396f40dabdcdf288516ee3d11528bd3c5231f97eb5f7984bd14375f366a07'),
	(1224, '400053fb-5878-4c75-b577-5881ab7e458c', 'Last Mile Data Processing with Ray', 'https://medium.com/pinterest-engineering/last-mile-data-processing-with-ray-629affbf34ff?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-09-12 18:07:36', 18, '27aba0e1a58a663b4ebeeddc2ad7482275348d1f122a3e29d6aa1fed57c1473b'),
	(1225, '207dcdf0-1784-4b21-9844-5c327f805916', 'MLEnv: Standardizing ML at Pinterest Under One ML Engine to Accelerate Innovation', 'https://medium.com/pinterest-engineering/mlenv-standardizing-ml-at-pinterest-under-one-ml-engine-to-accelerate-innovation-e2b30b2f6768?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-09-05 16:53:18', 18, 'fceabc43b074882efd12994367bdcc4eb484217186fe0966e8ab127a77d88c10'),
	(1226, '8f45c190-67fc-474e-8f37-7cdc9e52ea3f', 'Create the engineering career you love at Pinterest', 'https://medium.com/pinterest-engineering/create-the-engineering-career-you-love-at-pinterest-c1010e69f31a?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-08-03 15:38:01', 18, '8daa843940dcb65b165aa5e6f143a9a67243ea692e7b45a2aa432c7c874d9474'),
	(1227, '06de2e53-e300-4329-bfdb-dc69f2b1c5e1', 'Securely Scaling Big Data Access Controls At Pinterest', 'https://medium.com/pinterest-engineering/securely-scaling-big-data-access-controls-at-pinterest-bbc3406a1695?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-07-25 17:19:13', 18, '566a7b605b95ec7117ad6a557e785258ae7a714b967428271b970ed15d047443'),
	(1228, '76806d49-7a87-45c9-b935-8828df119ae8', 'Analyzing Time Series for Pinterest Observability', 'https://medium.com/pinterest-engineering/analyzing-time-series-for-pinterest-observability-95f8cc0c5885?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-07-18 16:01:18', 18, '2c2b3aeabc5fcce382b9e54e723c440c4c2373c95baf56b7fdbcf29f46dc136a'),
	(1229, 'b5cca028-17a6-44ab-81a9-5feb6f2214b1', 'Tuning Flink Clusters for Stability and Efficiency', 'https://medium.com/pinterest-engineering/tuning-flink-clusters-for-stability-and-efficiency-50d3d50384ed?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-07-11 20:39:55', 18, 'b5448fefe32060bf64d85a765b7305ffe313307762fcaa41ad3917fbd0f0767e'),
	(1230, '54f20b57-ad04-4c5d-8e22-25f360f36cf6', 'Deep Multi-task Learning and Real-time Personalization for Closeup Recommendations', 'https://medium.com/pinterest-engineering/deep-multi-task-learning-and-real-time-personalization-for-closeup-recommendations-1030edfe445f?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-06-13 15:13:51', 18, '9352adf76e0d8a809b6f5185371f2e46a536b2c5d0b34ec61e09bfff089c340c'),
	(1231, '6ce43cba-8852-4d33-bdc5-d7edb58f6b62', 'Representation online matters: practical end-to-end diversification in search and recommender…', 'https://medium.com/pinterest-engineering/representation-online-matters-practical-end-to-end-diversification-in-search-and-recommender-cb60b547f2e0?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-05-25 16:58:29', 18, '330265cc49b91f5a76d6882f999bca885229637a61f713d5dcdea969b11bbbf0'),
	(1232, '9f413a5c-805c-4804-832a-d594be08cdcb', 'Pacer: Pinterest’s New Generation of Asynchronous Computing Platform', 'https://medium.com/pinterest-engineering/pacer-pinterests-new-generation-of-asynchronous-computing-platform-5c338a15d2a0?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-05-23 16:54:35', 18, '8d3af79ebbdb6c7c2ae8677d7f8bd10b0e6e2b4974a8bb232117aa5368118747'),
	(1233, 'f3bdc4d4-2f39-40c0-aa3e-37dc1e0658bb', 'Warden: Real Time Anomaly Detection at Pinterest', 'https://medium.com/pinterest-engineering/warden-real-time-anomaly-detection-at-pinterest-210c122f6afa?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-05-17 20:07:38', 18, '0bad95857cd230dc934d9414bc66e726b4ed1c0cd47190a74783f8000033e25e'),
	(1234, '408dfebd-74fa-4d53-80f5-ced3193875bb', 'Meta Quest 2: Defense through offense', 'https://engineering.fb.com/2023/09/12/security/meta-quest-2-defense-through-offense/', NULL, '2023-09-12 16:00:39', 14, '595c9c929e08d41c9355477ec7bbcde52f9eb274933ecd0b4eaa9981a32ca930'),
	(1235, '2a082008-a836-43b3-abdc-ba6b17ceb485', 'Using Chakra execution traces for benchmarking and network performance optimization', 'https://engineering.fb.com/2023/09/07/networking-traffic/chakra-execution-traces-benchmarking-network-performance-optimization/', NULL, '2023-09-07 19:35:28', 14, '00c6a5cf89f067647f49add9bd1ac71464e00a861402cda1d414177af5042073'),
	(1236, '7cb8b48b-5354-4273-acfc-6e76954b3f16', 'Arcadia: An end-to-end AI system performance simulator', 'https://engineering.fb.com/2023/09/07/data-infrastructure/arcadia-end-to-end-ai-system-performance-simulator/', NULL, '2023-09-07 19:10:13', 14, '356124ef0a62d12ac83516692f9b77ba21f79be0fed6c9304b2e418d9e2fc522'),
	(1237, 'b9156254-dbdc-4188-81c5-5a2d7f8d001d', 'Threads: The inside story of Meta’s newest social app', 'https://engineering.fb.com/2023/09/07/culture/threads-inside-story-metas-newest-social-app/', NULL, '2023-09-07 18:00:21', 14, '6c0c56550de85d3f20848bd2833487d6c44b558449d5864b35c0817609059531'),
	(1238, 'bde13d88-4767-4314-83e5-1ed5a61ba169', 'What is it like to write code at Meta?', 'https://engineering.fb.com/2023/09/05/web/what-like-ship-code-meta-tech-podcast/', NULL, '2023-09-05 16:00:04', 14, '0a359266a775cc15ffe320f744130fdba64774bad7f42f7c0e206b06966332b1'),
	(1239, 'e4153c16-9fe4-47c7-99e2-62c7c453b72b', 'Scheduling Jupyter Notebooks at Meta', 'https://engineering.fb.com/2023/08/29/security/scheduling-jupyter-notebooks-meta/', NULL, '2023-08-29 16:00:30', 14, 'caa6a2037e289a76ee2d3b178b8575ea9e0d5daac2b8698cc630c4395fb381cd'),
	(1240, 'b8d36744-def0-4353-8505-843a1495254c', 'Code Llama: Meta’s state-of-the-art LLM for coding', 'https://ai.meta.com/blog/code-llama-large-language-model-coding/', NULL, '2023-08-24 07:00:23', 14, '53f6e08436c8f8623307bcab4e1457adabae92db5e37cb3951a1ad2be2255a5a'),
	(1241, 'bb046117-1a91-46e1-b03d-c7150d821906', 'Introducing Immortal Objects for Python', 'https://engineering.fb.com/2023/08/15/developer-tools/immortal-objects-for-python-instagram-meta/', NULL, '2023-08-15 16:00:31', 14, '5428a34f425b77a4584360e5e9fb9af032a32284bdf89bb2383105c3f38d4ee9'),
	(1242, '251c775b-1a62-439e-8ba6-51d994c1bf85', 'Meta Connect 2023: September 27 – 28', 'https://www.meta.com/blog/quest/connect-2023-september-27-28-menlo-park-vr-ai', NULL, '2023-08-14 16:00:42', 14, 'b8f683c24b47104afa4de2ccb475ba62d2b45ba9e3c7e8a73a3047e025fd7ac7'),
	(1243, '0657da27-6168-4647-88fc-a5cbf23c1d2c', 'The Instagram Engineering Blog has a new location', 'https://instagram-engineering.com/the-instagram-engineering-blog-has-a-new-location-85de9ab8d90f?source=rss----37dc2a3034f2---4', 'Ryan Peterman', '2022-07-12 17:00:22', 23, '0a8f341c5ed8ffd597fa078e752528d3377faffa530fc7dd0498b87e608d664d'),
	(1244, '34f0f4d3-f309-4d4e-ae10-c7479753d7eb', 'Five things I learned about working on content quality at Instagram', 'https://instagram-engineering.com/five-things-i-learned-about-working-on-content-quality-at-instagram-5031b1342bea?source=rss----37dc2a3034f2---4', 'Brunno Attorre', '2020-01-25 01:13:36', 23, 'c102ebb826892f5b1f2365c6ed56060d75e0f62a1fe40c0ef96a5fb36e69f9a4'),
	(1245, '15185806-b6a3-4dec-ab01-6692796a880d', 'Instagram Data Saver Mode', 'https://instagram-engineering.com/instagram-data-saver-mode-ffb01fd5a6bd?source=rss----37dc2a3034f2---4', 'Cristina Acha', '2019-12-13 18:09:34', 23, 'e4fa75cbb370e927001d7b63b5cc2263dec1fec71c81718ff139eaf7518572bb'),
	(1246, '19f16a8d-94fd-4bc3-8de7-a2afcd441dca', 'Powered by AI: Instagram’s Explore recommender system', 'https://instagram-engineering.com/powered-by-ai-instagrams-explore-recommender-system-7ca901d2a882?source=rss----37dc2a3034f2---4', 'Ivan Medvedev', '2019-11-26 13:48:39', 23, '521c8d295de3232914ed3b99fdb118d0220c3a5ac6442f4eef9a82fd3713b511'),
	(1247, '599c5813-97fb-435c-b945-4680c22a8dbd', '10 Questions with Shupin Mao, Well-being tech lead', 'https://instagram-engineering.com/10-questions-with-shupin-mao-well-being-tech-lead-3b19f19b168d?source=rss----37dc2a3034f2---4', 'shelly', '2019-11-08 16:24:40', 23, '78ed0fc595ca022e34fba9567af01f56ce853a7d636cf9410d53962985f02af0'),
	(1248, '4f7756b7-4b29-42fd-af35-7e2e11044842', 'Making instagram.com faster: Code size and execution optimizations (Part 4)', 'https://instagram-engineering.com/making-instagram-com-faster-code-size-and-execution-optimizations-part-4-57668be796a8?source=rss----37dc2a3034f2---4', 'Glenn Conner', '2019-11-01 13:03:12', 23, 'fed270619d370f87893e778d0e4ad27c7abb00cc8324eb7f31a786292e3428f9'),
	(1249, '3c206424-9d1b-4d5b-8cf4-43472fe69102', 'Python at Scale: Strict Modules', 'https://instagram-engineering.com/python-at-scale-strict-modules-c0bb9245c834?source=rss----37dc2a3034f2---4', 'Carl Meyer', '2019-10-17 15:01:07', 23, '286ab76ae50fccec11c8954c88d5e05749cb51a031ff60c5c46b070a2d907a42'),
	(1250, '66cdb854-70d4-4464-b2d5-2b2082515e9f', 'Making instagram.com faster: Part 3 — cache first', 'https://instagram-engineering.com/making-instagram-com-faster-part-3-cache-first-6f3f130b9669?source=rss----37dc2a3034f2---4', 'Glenn Conner', '2019-10-11 00:04:26', 23, 'f3fefe809968d9b90a657fac074ea874dbd6c13e6e39f385e6e9f955c59e9b40'),
	(1251, '23c3cfa2-b53b-481d-971f-cce248ea8226', 'Implementing Dark Mode in iOS 13', 'https://instagram-engineering.com/instagram-darkmode-58802b43c0f2?source=rss----37dc2a3034f2---4', 'Tim Johnsen', '2019-10-08 16:30:51', 23, '4224b8385934a4ed2db48d87ec812585ed4331f8aab49d694f2e3a3d517bb620'),
	(1252, '87e67c1e-f36f-4ff1-ac4a-b6a7d3e58b7d', 'Interview with Tamar Shapiro, Instagram’s Head of Analytics', 'https://instagram-engineering.com/interview-with-tamar-shapiro-instagrams-head-of-analytics-c81946d02b90?source=rss----37dc2a3034f2---4', 'Instagram Engineering', '2019-09-24 15:51:03', 23, '3cd55fba18388c991a900b41683b8a6fb87719bb6b16351387417e4db308d95b'),
	(1253, 'bba92e63-1ac3-4dd6-9543-952718910b3a', 'Encouragement Designs and Instrumental Variables for A/B Testing', 'https://engineering.atspotify.com/2023/08/encouragement-designs-and-instrumental-variables-for-a-b-testing/', 'Spotify Engineering', '2023-08-24 17:44:29', 25, 'a63e36fb4bc5add6c19473947c37a44571ada09ea5db425d95f123c969316d8f'),
	(1254, 'f336f13b-9491-4c69-9d01-088280e4cf31', 'Experimentation at Spotify: Three Lessons for Maximizing Impact in Innovation', 'https://engineering.atspotify.com/2023/08/experimentation-at-spotify-three-lessons-for-maximizing-impact-in-innovation/', 'Spotify Engineering', '2023-08-16 20:14:42', 25, 'fe76805173c625474553f150daa9d5681e805d5a95b93e2171d35cf5995ae5f8'),
	(1255, '287385ab-6c95-461b-8316-be00c8270635', 'Coming Soon: Confidence — An Experimentation Platform from Spotify', 'https://engineering.atspotify.com/2023/08/coming-soon-confidence-an-experimentation-platform-from-spotify/', 'Spotify Engineering', '2023-08-03 12:00:00', 25, '405efe5f6921cf415bd942eaf6bb65a5d66c57cb0541f2ca01b6e43fb64343ac'),
	(1256, '8242b419-99e0-4be4-93fd-3e346e0e3638', 'Bringing Sequential Testing to Experiments with Longitudinal Data (Part 2): Sequential Testing', 'https://engineering.atspotify.com/2023/07/bringing-sequential-testing-to-experiments-with-longitudinal-data-part-2-sequential-testing/', 'Spotify Engineering', '2023-07-25 14:29:19', 25, 'cfde533e2579c73224f553be52b53eb71ff34006b805854fa486e09e743fd4d4'),
	(1257, '81f6bb91-a697-464d-9ff3-6d374b7f3d09', 'Bringing Sequential Testing to Experiments with Longitudinal Data (Part 1): The Peeking Problem 2.0', 'https://engineering.atspotify.com/2023/07/bringing-sequential-testing-to-experiments-with-longitudinal-data-part-1-the-peeking-problem-2-0/', 'Spotify Engineering', '2023-07-18 22:07:14', 25, '140a534bde917a3946ae3e20d03d74aa1bf60d634c669d924a2d532f9d2d8bc3'),
	(1258, '2460cd38-3afe-40ef-818d-db3862c25f76', 'My Summer Return Internship @ Slack: A Guide on Building on Past Experiences', 'https://slack.engineering/my-summer-return-internship-slack-a-guide-on-building-on-past-experiences/', 'Zac Sweers', '2023-09-06 07:00:52', 20, '0fc1e3d6fd12cd5e0fa20ee175016cedde2eed3018534ac1e5dae5343edbf3c9'),
	(1259, 'e0b13162-433c-4493-8233-ca0e60691a5f', 'Traffic 101: Packets Mostly Flow', 'https://slack.engineering/traffic-101-packets-mostly-flow/', 'Radha Kumari', '2023-08-28 08:00:05', 20, '19420e2a4acb48a97f4e35bd9dab6b382a9f5d78b2ea096eb1490bd82a6d61c8'),
	(1260, '84b6f1c1-aa72-47e1-90af-f1a3c1feae27', 'Slack’s Migration to a Cellular Architecture', 'https://slack.engineering/slacks-migration-to-a-cellular-architecture/', 'Stephan Zuercher', '2023-08-22 15:51:40', 20, 'b8bde0485485e124d409ce3d0b3424a48d100670e83507d51c597de12fa2e308'),
	(1261, '1e1b2330-dd0c-4b26-8a0d-e7ddca830129', 'Service Delivery Index: A Driver for Reliability', 'https://slack.engineering/service-delivery-index-a-driver-for-reliability/', 'Ryan Katkov', '2023-07-26 17:47:00', 20, '6c8dfc8fac487210212d0405820ddaa5b74c69d52553bcb5cc0f54cda6357266'),
	(1262, '5672641a-793c-410c-a2e6-da615ed35ea7', 'Real-time Messaging', 'https://slack.engineering/real-time-messaging/', 'Sameera Thangudu', '2023-04-11 20:40:11', 20, 'c5ca08ff2d9165023276ee7ad893311ddba732c4e4f7a3b5f6115f9ca4ca167f'),
	(1263, '45261a82-f777-4c0d-affe-e9f7e86cf038', 'Tracing Notifications', 'https://slack.engineering/tracing-notifications/', 'George Luong', '2023-04-04 08:00:50', 20, '171fd2ffc99131ac0bbba851ea806a2410f46907d90f908243f319ca48654f83'),
	(1264, '089c5f1f-ec5a-4cf0-b3bc-295f493b60ff', 'Technology Lifecycle', 'https://slack.engineering/technology-lifecycle/', 'Tricia Bogen', '2023-03-21 09:45:49', 20, '3ee555123ceedcb830a1f929d99bb01025eb491a3e4175ff53bc07542dd08ebc'),
	(1265, 'ffd0fb16-a826-4d83-b4ad-5fb112a99fa5', 'Hakana: Taking Hack Seriously', 'https://slack.engineering/hakana-taking-hack-seriously/', 'Matt Brown', '2023-02-08 18:35:43', 20, '578e684b969e545f26824efcb4d8aff4697463ca364c74c913771cbb91b1a576'),
	(1266, '60379ab4-0e14-4cda-a82d-a11d1f4ae908', 'The So-fine Real-time ML Paradigm', 'https://www.etsy.com/codeascraft/the-so-fine-real-time-ml-paradigm?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Kyle Gallatin', '2023-09-05 19:55:41', 22, '512f0c3e5accfd068d433957ee102cdd1c86c348721d396bc93c2c810fd6568a'),
	(1267, '4f87671e-dfeb-4cb3-9c6c-46740c965eca', 'Leveraging Real-Time User Actions to Personalize Etsy Ads', 'https://www.etsy.com/codeascraft/leveraging-real-time-user-actions-to-personalize-etsy-ads?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Alaa Awad', '2023-07-14 19:54:41', 22, '05b01870b2b79071fbc3e42650acb4d768c16f14b19b3dd8e4f5dda9dfbe6e6c'),
	(1268, '5b836754-f202-4b5e-8867-7f3cce9f07dc', 'The Problem with Timeseries Data in Machine Learning Feature Systems', 'https://www.etsy.com/codeascraft/the-problem-with-timeseries-data-in-machine-learning-feature-systems?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Kyle Gallatin', '2023-06-23 20:30:41', 22, '3df4ac9b3d3fd80305f8b91993ea4aa70a372eeb18f3dbe219383934afcc4b80'),
	(1269, '0ed86db4-6f5f-456d-aef3-4cfb85c35a4a', 'From Image Classification to Multitask Modeling: Building Etsy’s Search by Image Feature', 'https://www.etsy.com/codeascraft/from-image-classification-to-multitask-modeling-building-etsys-search-by-image-feature?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Eden Dolev', '2023-05-26 20:32:49', 22, 'd20d2f2ccf053678975eecff0a14cd5424a17f7189c2906a1d4891a28c99f421'),
	(1270, '37d25dd9-dd89-45cd-add5-548b18ff3448', 'How We Built a Multi-Task Canonical Ranker for Recommendations at Etsy', 'https://www.etsy.com/codeascraft/how-we-built-a-multi-task-canonical-ranker-for-recommendations-at-etsy?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Yuqing Pan', '2023-04-18 21:44:34', 22, '41bdede3180cbe700b7fafa7bdb0c7f1a26724de859ff148c92823dbb7de1553'),
	(1271, '523c698c-68ac-415b-ade3-af2fda104d28', 'Barista: Enabling Greater Flexibility in Machine Learning Model Deployment', 'https://www.etsy.com/codeascraft/barista-enabling-greater-flexibility-in-machine-learning-model-deployment?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Kyle Gallatin', '2023-04-14 21:15:18', 22, '4e39e83077ac80a129db80b8aa66bf31e85c86bd65af3b11cc7525f906048f31'),
	(1272, '58f0daed-125e-4c74-8479-b6aeb73cc4a5', 'Docs-as-code at Etsy', 'https://www.etsy.com/codeascraft/code-as-craft-blog-post-docs-as-code-at-etsy?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Afshin Mehrabani', '2023-04-13 20:55:35', 22, '2ddd78fbe5c581ea69134545c2b81369a75eab3b7f478b012540e88c4fb8618d'),
	(1273, '521e6217-72bd-45c3-8ae5-5e6ca7a4d724', 'Scaling Etsy Payments with Vitess: Part 3 – Reducing Cutover Risk', 'https://www.etsy.com/codeascraft/scaling-etsy-payments-with-vitess-part-3--reducing-cutover-risk?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'David Leibovic', '2023-02-22 23:03:53', 22, 'e3503b19fe5382190b689b6e94985309851d8b11f5e6be9e69a1105f9257cffc'),
	(1274, '6788fbf7-9127-4c90-ac5a-7101c8799573', 'Scaling Etsy Payments with Vitess: Part 2 – The “Seamless” Migration', 'https://www.etsy.com/codeascraft/scaling-etsy-payments-with-vitess-part-2--the-seamless-migration?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Keith Wells', '2023-02-22 23:03:36', 22, 'eee047569e62e27f614f7ee955eaade80030d8d8bb72989a6dd08522c231a682'),
	(1275, '01bf55fa-3b96-4315-9a54-a74be629f742', 'Scaling Etsy Payments with Vitess: Part 1 – The Data Model', 'https://www.etsy.com/codeascraft/scaling-etsy-payments-with-vitess-part-1--the-data-model?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'River Rainne', '2023-02-22 23:03:00', 22, '0cfc6c3ee8ca253c5a805850b02090f9a7d639f34922be535b4ac0df49c34852'),
	(1276, 'eb8a6cb7-284d-4c4c-9c92-9f69802e6497', 'Adding Zonal Resiliency to Etsy’s Kafka Cluster: Part 2', 'https://www.etsy.com/codeascraft/leveraging-zonal-resiliency-to-improve-updates-for-etsys-kafka-cluster-part-2?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Kamya Shethia', '2023-02-09 17:06:19', 22, 'a762cbfbae436ed653ee75ccd6616454f0b13bd22a3db5538dc76c0eb340fcc1'),
	(1277, 'f083759a-faf7-4874-a128-7cb252720eae', 'Adding Zonal Resiliency to Etsy’s Kafka Cluster: Part 1', 'https://www.etsy.com/codeascraft/adding-zonal-resiliency-to-etsys-kafka-cluster-part-1?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Andrey Polyakov', '2023-01-31 20:36:33', 22, '37165f9c94b75a9f09e1c32df8934570f15e1ac79fab7457422b3d365e29a777'),
	(1278, '7fd5f9b6-f346-4515-abdd-bca3ff5b0c00', 'Improving Support for Deep Learning in Etsy&#39;s ML Platform', 'https://www.etsy.com/codeascraft/improving-support-for-deep-learning-in-etsy39s-ml-platform?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Sallie Walecka', '2023-01-26 14:21:11', 22, 'f1c30690c8c60714ce1603abe5c7ac5ba8cbbd3ece8a83ad19223fe6050f3d0d'),
	(1279, 'af06f74c-8dfb-456c-87f9-f1a28f4ce1c4', 'Mitigating the winner’s curse in online experiments', 'https://www.etsy.com/codeascraft/mitigating-the-winners-curse-in-online-experiments?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Stephane Shao', '2022-12-13 14:34:37', 22, '19ac7b8cd786252c72ecfb1c6f544c929caf4f363642ff601251a01bd4ba0db9'),
	(1280, 'c6fb21cb-1955-4aa7-a978-9b427b8cbb59', 'Understanding the collective impact of experiments', 'https://www.etsy.com/codeascraft/understanding-the-collective-impact-of-experiments?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Stephane Shao', '2022-12-07 22:31:36', 22, '2847d481e0e0f3e4852c870b9c0cbbbc0f886a10835ca001279083b8097ea850'),
	(1281, 'b1fff34c-e5aa-4f6e-b274-f28eb25b7e14', 'Being a Dynamic Leader', 'https://www.etsy.com/codeascraft/being-a-dynamic-leader?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Sean Sutherland', '2022-10-24 16:10:43', 22, '24c7446d77b2ccc74b88a7123608e5ed41e52113ce08692a20ea101b51cfb68c'),
	(1282, '3d1569cd-9d57-411e-aee5-ffc8017723bb', 'Managing and Leading Globally Distributed Teams', 'https://www.etsy.com/codeascraft/managing-and-leading-globally-distributed-teams?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Sean Sutherland', '2022-10-24 14:49:02', 22, '918f83cdfd513b651473ab6cb3021dc41a7d0f793c2a7ee98266f1fb133a31db'),
	(1283, '89020401-8288-4709-b45d-2b75c002b2dc', 'Making The Indian Rupee Work For Humans and Databases', 'https://www.etsy.com/codeascraft/indian-rupee-users-database?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Marco Gaspari', '2022-10-14 16:14:21', 22, '1a1ba110964c6931b8eebb4da44b26da7229e7af90314832e97f26b094dd987d'),
	(1284, '0c0fc866-dc0e-430e-a786-ab25be01693c', 'Deep Learning for Search Ranking at Etsy', 'https://www.etsy.com/codeascraft/deep-learning-for-search-ranking-at-etsy?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Lucia Yu', '2022-10-04 16:59:37', 22, 'f4d57fa70f7cd5279bff7208794dd51a22cb230033cbc27b9c5534be0b153e54'),
	(1285, '4e4ae094-759c-4a43-aab4-b9e165bdff26', 'Towards Machine Learning Observability at Etsy', 'https://www.etsy.com/codeascraft/towards-machine-learning-observability-at-etsy?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Kyle Gallatin', '2022-08-31 00:15:03', 22, '54bbb3b3a9b9a8c11989d7516b2aeb9fc2a1995f76ffd6dad58fa4b7e6119aa8'),
	(1401, '52c8d0c7-7939-40d0-87ed-234e5a272ae9', 'The AR Measuring Box: Etsy&#39;s answer to Big Tape Measure', 'https://www.etsy.com/codeascraft/the-ar-measuring-box-etsys-answer-to-big-tape-measure?utm_source=OpenGraph&utm_medium=PageTools&utm_campaign=Share', 'Pedro Michel', '2023-09-18 20:11:58', 22, 'd3eeed4dc63194a308fcb7ae5583e4c34b2f3460c1de004d622619de7dcc35d2'),
	(1411, '9ede43eb-23ff-4d48-8d8e-2b398591b1ef', 'New! Rate Limiting analytics and throttling', 'http://blog.cloudflare.com/new-rate-limiting-analytics-and-throttling/', 'Radwa Radwan', '2023-09-19 13:00:41', 15, 'b6fccbc763cc2425137456938cfda1d816ba5b7acfc95341e75ece484dca1575'),
	(1471, 'b649a807-136e-4aa1-b4d0-38595b5ac5db', 'How Waiting Room makes queueing decisions on Cloudflare''s highly distributed network', 'http://blog.cloudflare.com/how-waiting-room-queues/', 'George Thomas', '2023-09-20 13:00:58', 15, 'e57e365e53f556ba0b06917d39f5d88dfeac8c088f40bbfc2c2bdf54e487ef85'),
	(1496, 'b55612d8-58df-47d3-b660-5a7666683a12', 'Building for Inclusivity: The Technical Blueprint of Pinterest’s Multidimensional Diversification', 'https://medium.com/pinterest-engineering/building-for-inclusivity-the-technical-blueprint-of-pinterests-multidimensional-diversification-a43d38840fb9?source=rss-ef81ef829bcb------2', 'Pinterest Engineering', '2023-09-20 16:10:38', 18, '96788194d6bed881875e541b21940aa5faa414af432125ffb8ddcb132150260d'),
	(1531, '6ab7a7c4-d2a6-4a23-a4b4-216e35ab5076', 'Cloudflare Email Security now works with CrowdStrike Falcon LogScale', 'http://blog.cloudflare.com/cloudflare-email-security-now-works-with-crowdstrike-falcon-logscale/', 'Ayush Kumar', '2023-09-21 13:00:27', 15, '430a551c84dc1d2daadbd89e7fcc7dbea519313df509af7c57e599ec943c1865'),
	(1546, '212d630e-31a7-4b31-b6af-f99d31542c42', 'Unlocking SwiftUI at Airbnb', 'https://medium.com/airbnb-engineering/unlocking-swiftui-at-airbnb-ea58f50cde49?source=rss----53c7c27702d5---4', 'Bryn Bodayle', '2023-09-21 17:02:38', 19, '58159ed643a9003e4e1b6ac4e0057d0e0c18dd2447e56ead9a36bbd55efc9a04');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("id", "user_uuid", "username", "email") VALUES
	(110, '5c41c714-1d6b-43a6-8425-b6b2557f7dc8', 'Haff', 'haffimazhar96@gmail.com');


--
-- Data for Name: user_blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_blogs" ("id", "user_id", "blog_id") VALUES
	(21, 110, 15),
	(22, 110, 18),
	(23, 110, 16),
	(24, 110, 20),
	(25, 110, 21),
	(26, 110, 14),
	(27, 110, 17),
	(28, 110, 19),
	(29, 110, 22),
	(30, 110, 23),
	(31, 110, 24),
	(32, 110, 25),
	(33, 110, 26);


--
-- Data for Name: user_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_posts" ("id", "user_id", "post_id", "emailed", "notification_date", "updated_at") VALUES
	(13, 110, 1169, false, '2023-09-18 09:00:02.537545', NULL),
	(14, 110, 1401, false, '2023-09-19 09:00:02.731262', NULL),
	(15, 110, 1411, false, '2023-09-20 09:00:02.501704', NULL),
	(16, 110, 1401, false, '2023-09-20 09:00:02.779409', NULL),
	(17, 110, 1411, false, '2023-09-21 09:00:02.528331', NULL),
	(18, 110, 1471, false, '2023-09-21 09:00:02.885699', NULL),
	(19, 110, 1496, false, '2023-09-21 09:00:02.926174', NULL),
	(20, 110, 1401, false, '2023-09-21 09:00:02.967304', NULL),
	(21, 110, 1411, false, '2023-09-21 18:29:13.628451', NULL),
	(22, 110, 1471, false, '2023-09-21 18:29:13.98869', NULL),
	(23, 110, 1496, false, '2023-09-21 18:29:14.053835', NULL),
	(24, 110, 1401, false, '2023-09-21 18:29:14.1125', NULL),
	(25, 110, 1411, false, '2023-09-21 19:07:31.551589', NULL),
	(26, 110, 1471, false, '2023-09-21 19:07:34.44462', NULL),
	(27, 110, 1496, false, '2023-09-21 19:07:34.645333', NULL),
	(28, 110, 1401, false, '2023-09-21 19:07:35.007354', NULL),
	(29, 110, 1411, false, '2023-09-21 19:08:11.391326', NULL),
	(30, 110, 1411, false, '2023-09-21 19:08:11.474648', NULL),
	(31, 110, 1471, false, '2023-09-21 19:08:12.056935', NULL),
	(32, 110, 1471, false, '2023-09-21 19:08:12.067579', NULL),
	(33, 110, 1496, false, '2023-09-21 19:08:12.154915', NULL),
	(34, 110, 1496, false, '2023-09-21 19:08:12.161821', NULL),
	(35, 110, 1401, false, '2023-09-21 19:08:12.256988', NULL),
	(36, 110, 1401, false, '2023-09-21 19:08:12.271842', NULL),
	(37, 110, 1411, false, '2023-09-21 19:09:26.611294', NULL),
	(38, 110, 1411, false, '2023-09-21 19:09:26.603269', NULL),
	(39, 110, 1471, false, '2023-09-21 19:09:27.813706', NULL),
	(40, 110, 1496, false, '2023-09-21 19:09:27.850633', NULL),
	(41, 110, 1471, false, '2023-09-21 19:09:27.879908', NULL),
	(42, 110, 1496, false, '2023-09-21 19:09:27.950996', NULL),
	(43, 110, 1401, false, '2023-09-21 19:09:27.963394', NULL),
	(44, 110, 1401, false, '2023-09-21 19:09:28.077365', NULL),
	(45, 110, 1411, false, '2023-09-21 19:10:19.457375', NULL),
	(46, 110, 1411, false, '2023-09-21 19:10:19.467443', NULL),
	(47, 110, 1471, false, '2023-09-21 19:10:20.196269', NULL),
	(48, 110, 1471, false, '2023-09-21 19:10:20.208145', NULL),
	(49, 110, 1496, false, '2023-09-21 19:10:20.26282', NULL),
	(50, 110, 1401, false, '2023-09-21 19:10:20.357412', NULL),
	(51, 110, 1496, false, '2023-09-21 19:10:20.406978', NULL),
	(52, 110, 1401, false, '2023-09-21 19:10:20.497464', NULL),
	(53, 110, 1411, false, '2023-09-21 19:10:39.787049', NULL),
	(54, 110, 1411, false, '2023-09-21 19:10:39.877769', NULL),
	(55, 110, 1471, false, '2023-09-21 19:10:40.540893', NULL),
	(56, 110, 1496, false, '2023-09-21 19:10:40.687761', NULL),
	(57, 110, 1471, false, '2023-09-21 19:10:40.686925', NULL),
	(58, 110, 1496, false, '2023-09-21 19:10:40.707062', NULL),
	(59, 110, 1401, false, '2023-09-21 19:10:40.777771', NULL),
	(60, 110, 1401, false, '2023-09-21 19:10:40.797614', NULL),
	(61, 110, 1411, false, '2023-09-21 19:11:00.626883', NULL),
	(62, 110, 1411, false, '2023-09-21 19:11:00.627205', NULL),
	(63, 110, 1471, false, '2023-09-21 19:11:01.306246', NULL),
	(64, 110, 1471, false, '2023-09-21 19:11:01.307546', NULL),
	(65, 110, 1496, false, '2023-09-21 19:11:01.39646', NULL),
	(66, 110, 1496, false, '2023-09-21 19:11:01.387039', NULL),
	(67, 110, 1401, false, '2023-09-21 19:11:01.506665', NULL),
	(68, 110, 1401, false, '2023-09-21 19:11:01.507907', NULL),
	(69, 110, 1411, false, '2023-09-21 19:11:49.479661', NULL),
	(70, 110, 1411, false, '2023-09-21 19:11:49.589205', NULL),
	(71, 110, 1471, false, '2023-09-21 19:11:49.600122', NULL),
	(72, 110, 1471, false, '2023-09-21 19:11:50.15899', NULL),
	(73, 110, 1496, false, '2023-09-21 19:11:50.209464', NULL),
	(74, 110, 1401, false, '2023-09-21 19:11:50.329463', NULL),
	(75, 110, 1496, false, '2023-09-21 19:11:50.368787', NULL),
	(76, 110, 1401, false, '2023-09-21 19:11:50.479384', NULL),
	(77, 110, 1411, false, '2023-09-21 19:12:22.921945', NULL),
	(78, 110, 1471, false, '2023-09-21 19:12:23.991825', NULL),
	(79, 110, 1496, false, '2023-09-21 19:12:24.122503', NULL),
	(80, 110, 1401, false, '2023-09-21 19:12:24.348091', NULL),
	(81, 110, 1411, false, '2023-09-21 19:50:07.385521', NULL),
	(82, 110, 1471, false, '2023-09-21 19:50:08.284388', NULL),
	(83, 110, 1496, false, '2023-09-21 19:50:08.583689', NULL),
	(84, 110, 1401, false, '2023-09-21 19:50:08.78455', NULL),
	(85, 110, 1411, false, '2023-09-21 19:50:37.61723', NULL),
	(86, 110, 1471, false, '2023-09-21 19:50:39.889428', NULL),
	(87, 110, 1496, false, '2023-09-21 19:50:40.141724', NULL),
	(88, 110, 1401, false, '2023-09-21 19:50:40.476871', NULL),
	(89, 110, 1411, false, '2023-09-21 20:01:39.847541', NULL),
	(90, 110, 1471, false, '2023-09-21 20:01:40.180408', NULL),
	(91, 110, 1496, false, '2023-09-21 20:01:40.239179', NULL),
	(92, 110, 1401, false, '2023-09-21 20:01:40.293209', NULL),
	(93, 110, 1411, false, '2023-09-21 20:12:33.216202', NULL),
	(94, 110, 1471, false, '2023-09-21 20:12:33.857434', NULL),
	(95, 110, 1496, false, '2023-09-21 20:12:33.942545', NULL),
	(96, 110, 1411, false, '2023-09-21 20:15:13.575526', NULL),
	(97, 110, 1471, false, '2023-09-21 20:15:14.132637', NULL),
	(98, 110, 1496, false, '2023-09-21 20:15:14.262282', NULL),
	(99, 110, 1411, false, '2023-09-21 20:17:35.584811', NULL),
	(100, 110, 1471, false, '2023-09-21 20:17:36.212672', NULL),
	(101, 110, 1496, false, '2023-09-21 20:17:36.302429', NULL),
	(102, 110, 1411, false, '2023-09-21 20:18:27.111115', NULL),
	(103, 110, 1471, false, '2023-09-21 20:18:27.704797', NULL),
	(104, 110, 1496, false, '2023-09-21 20:18:27.872117', NULL),
	(105, 110, 1411, false, '2023-09-21 20:20:27.906623', NULL),
	(106, 110, 1471, false, '2023-09-21 20:20:28.374656', NULL),
	(107, 110, 1496, false, '2023-09-21 20:20:28.497922', NULL),
	(108, 110, 1411, false, '2023-09-21 20:21:09.55038', NULL),
	(109, 110, 1496, false, '2023-09-21 20:21:10.084111', NULL),
	(110, 110, 1471, false, '2023-09-21 20:21:10.154153', NULL),
	(111, 110, 1411, false, '2023-09-21 20:24:47.54143', NULL),
	(112, 110, 1471, false, '2023-09-21 20:24:47.980118', NULL),
	(113, 110, 1496, false, '2023-09-21 20:24:48.018353', NULL),
	(114, 110, 1411, false, '2023-09-22 09:00:02.493527', NULL),
	(115, 110, 1471, false, '2023-09-22 09:00:02.931028', NULL),
	(116, 110, 1531, false, '2023-09-22 09:00:02.931253', NULL),
	(117, 110, 1496, false, '2023-09-22 09:00:03.011231', NULL),
	(118, 110, 1546, false, '2023-09-22 09:00:03.070223', NULL),
	(119, 110, 1471, false, '2023-09-22 13:39:04.310119', NULL),
	(120, 110, 1496, false, '2023-09-22 13:39:04.839735', NULL),
	(121, 110, 1546, false, '2023-09-22 13:39:04.894891', NULL),
	(122, 110, 1531, false, '2023-09-22 13:39:06.576215', NULL),
	(123, 110, 1471, false, '2023-09-22 13:39:35.538759', NULL),
	(124, 110, 1531, false, '2023-09-22 13:39:35.804893', NULL),
	(125, 110, 1496, false, '2023-09-22 13:39:37.080189', NULL),
	(126, 110, 1546, false, '2023-09-22 13:39:37.138834', NULL),
	(127, 110, 1471, false, '2023-09-22 13:39:57.512121', NULL),
	(128, 110, 1531, false, '2023-09-22 13:39:58.177027', NULL),
	(129, 110, 1496, false, '2023-09-22 13:39:58.279476', NULL),
	(130, 110, 1546, false, '2023-09-22 13:39:58.330555', NULL);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('"drizzle"."__drizzle_migrations_id_seq"', 3, true);


--
-- Name: all_blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."all_blogs_id_seq"', 26, true);


--
-- Name: blog_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."blog_posts_id_seq"', 1585, true);


--
-- Name: user_blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."user_blogs_id_seq"', 33, true);


--
-- Name: user_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."user_posts_id_seq"', 130, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_id_seq"', 271, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
