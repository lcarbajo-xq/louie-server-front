import { Header } from '../../components/Header/Header'
import cover from '../../assets/app-icon.png'
import './styles.scss'
import { TrackList } from '../../components/Library/TrackList'
import { useEffect, useState } from 'react'
import { getAlbumFromDB } from '../../services/databaseService'
import { AlbumCard } from '../../components/Library/AlbumCard'
import { HorizontalScroll } from '../../components/HorizontalScroll/HorizontalScroll'
import { Link } from 'wouter'

const albums = [
  {
    _id: '6150d8b116cb17b199ed1389',
    name: 'A Moon Shaped Pool',
    hash: '04b9b3eaceb5d82aee4ac5d7a9383e7d',
    artist: {
      _id: '6150d5899ce8f39a1b9b6271',
      name: 'Radiohead',
      hash: '222a5a8b3ad3d7d0e6805e301898eaaf',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eba03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab67616100005174a03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab6761610000f178a03696716c9ee605006047fd'
      ],
      tags: ['alternative', 'alternative rock', 'rock', 'indie', 'electronic'],
      bio: 'Radiohead is an English alternative rock band from Abingdon, Oxfordshire, UK which formed in 1985. The band is composed of Thom Yorke (lead vocals, rhythm guitar, piano, beats), Jonny Greenwood (lead guitar, keyboard, other instruments), Ed O\'Brien (guitar, backing vocals), Colin Greenwood (bass guitar) and Phil Selway (drums, percussion).\n\nThe early years (1992 – 1995)\nRadiohead released their first single, "Creep" in 1992. The song was initially unsuccessful Read more on Last.fm',
      similar: [
        'Thom Yorke',
        'Atoms for Peace',
        'Muse',
        'The Strokes',
        'Pixies'
      ],
      createdAt: '2021-09-26T20:18:16.962Z',
      updatedAt: '2021-09-26T20:18:16.962Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/267decde8626b1263f0e3fcb3f43bc4a.png',
      'https://lastfm.freetls.fastly.net/i/u/64s/267decde8626b1263f0e3fcb3f43bc4a.png',
      'https://lastfm.freetls.fastly.net/i/u/174s/267decde8626b1263f0e3fcb3f43bc4a.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/267decde8626b1263f0e3fcb3f43bc4a.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/267decde8626b1263f0e3fcb3f43bc4a.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/267decde8626b1263f0e3fcb3f43bc4a.png'
    ],
    tags: ['radiohead', 'art rock', 'alternative', '2016', 'art pop'],
    bio: 'A Moon Shaped Pool is the ninth studio album by the English rock band Radiohead, released as a download on 8 May 2016. The album\'s first two singles were "Burn the Witch" and "Daydreaming". CD and LP editions will be released by XL Recordings on 17 June 2016, followed in September by a "special edition" containing additional artwork and two bonus tracks. The album was produced by Nigel Godrich.\n\nRadiohead began work on A Moon Shaped Pool intermittently after finishing the 2012 tour for their previous album, 2011\'s The King of Limbs. Several songs on the album date back to much earlier in the band\'s career; "True Love Waits" has been performed as far back as 1995, while "Burn the Witch" dates back to the sessions for the band\'s 2000 album Kid A, although it was not released to the public until the release of the single. "Present Tense" was composed as early as 2008, while "Ful Stop" and "Identikit" were first performed live in 2012. The album contains strings and choral vocals arranged by multi-instrumentalist Jonny Greenwood and performed by The London Contemporary Orchestra.\n\nDuring the 2012 tour for their eighth album, 2011\'s The King of Limbs, Radiohead performed several new songs, including the future Moon Shaped Pool tracks "Identikit" and "Ful Stop". While on tour, the band recorded a version of "Identikit" and another unidentified song at Jack White\'s Third Man Records studio.\n\nAfter the tour, Radiohead entered hiatus and the band members worked on side projects. In 2013, singer Thom Yorke and long-time Radiohead producer Nigel Godrich released an album, Amok, with their band Atoms for Peace; in 2014, Yorke and drummer Philip Selway released their respective second solo albums, Tomorrow\'s Modern Boxes and Weatherhouse. Guitarist Jonny Greenwood composed film scores, including the 2014 Paul Thomas Anderson film Inherent Vice, and worked with classical musicians.\n\nRadiohead and Godrich recorded A Moon Shaped Pool in the La Fabrique studio in France. In February 2015, Selway told Drowned in Sound that Radiohead had worked from September to Christmas 2014, and would resume work that March. In the same month, Greenwood told Pitchfork that Radiohead had changed their methods, "working in limits" and using "very old and very new technology" together. In June 2015, Greenwood said that the band had been slow to regain momentum after their hiatus; Selway stated that the band had worked in "fits and starts", but that a "full schedule" would begin from September.\n\nIn November 2015, composer Robert Ziegler, who worked with Radiohead on The King of Limbs, tweeted photos of the band recording with a string orchestra. The strings were arranged by Greenwood and performed by the London Contemporary Orchestra, who previously worked with him on the score for The Master. In December, Yorke performed two Moon Shaped Pool songs, "The Numbers" (then known as "Silent Spring") and "Desert Island Disk", at the United Nations Climate Change Conference at Le Trianon in Paris, France. On Christmas Day 2015, Radiohead released a new song, "Spectre", on the audio streaming site SoundCloud. It was written for the James Bond film of the same name, but went unused.\n\nSeveral Moon Shaped Pool tracks were written some time before the album\'s release. "True Love Waits" dates to at least 1995; a live version was released on the 2001 live album I Might Be Wrong: Live Recordings. Godrich said of the song in 2012: "We tried to record it countless times, but it never worked ... To Thom\'s credit, he needs to feel a song has validation, that it has a reason to exist as a recording. We could do \'True Love Waits\' and make it sound like John Mayer. Nobody wants to do that." Radiohead worked on "Burn the Witch" during the sessions for their albums Kid A (2000), Hail to the Thief (2003), and In Rainbows (2007), and lyrics from the song appeared in previous album artwork and on the Radiohead website. "Present Tense" dates to 2008, and Yorke first performed it (then known as "The Present Tense") in a solo set at the UK Latitude Festival in 2009.\n\nA Moon Shaped Pool is an art rock album. It retains Radiohead\'s electronic elements such as drum machines and synthesisers, but according to Rolling Stone, supplants them with "an embrace of gorgeous timbres and melody", making use of acoustic guitar, piano, and strings. It makes heavy use of strings and choral vocals; according to Pitchfork, "while lite orchestrations are nothing new for the band, A Moon Shaped Pool brings them to the fore of the songwriting, and Greenwood’s arrangements do more heavy lifting than on any other album."\n\n"Burn the Witch" features col legno strings, meaning that the players strike their strings with the stick of the bow rather than bowing them, creating a percussive effect. "Daydreaming" features a piano figure and backwards vocals that resemble "someone struggling for breath". "Identikit" has a jam-like opening, with "snatches" of vocal and guitar, and ends with an "agitated" guitar solo. The Guardian felt that the strings, bassline and funk rhythm of "The Numbers" was a homage to Serge Gainsbourg’s 1970 album Histoire de Melody Nelson. "Present Tense" features a Latin shuffle beat. "Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief" combines Greenwood\'s strings with electronic percussion and a distorted keyboard. "True Love Waits", first performed on acoustic guitar over 20 years prior, is performed on piano, with additional overdubbed pianos building as the song progresses. The tracks are listed in alphabetical order.\n\nMany of the songs discuss love, forgiveness, and regret with, according to Pitchfork writer Jeremy Larson, "a sense that beyond tectonic heartbreak there is an anaemic acceptance that is kind of beautiful if you don’t get too sad about it". Several critics felt the album\'s lyrics were coloured by Yorke\'s recent separation from his partner of almost 25 years. The lyrics of "Burn the Witch" were interpreted by Pitchfork writer Jillian Mapes as criticism of authority and groupthink, expressing a "deep sense of dread and skepticism"; The Guardian felt the song might address mass surveillance or the threat to open discussion posed by the self-policing users of social media. "The Numbers" addresses climate change.\n\nThe artwork for A Moon Shaped Pool was created by Stanley Donwood, who has worked with Radiohead since 1995. He said it was "made by the strong warm winds of southern France."\n\nOn 30 April 2016, fans who had previously made orders from Radiohead received embossed cards with lyrics from the album\'s lead single, "Burn the Witch". On 1 May, Radiohead deleted all content from their website and social media profiles, replacing them with blank images. After releasing excerpts on Instagram, they released "Burn the Witch" as a download on 3 May, accompanied by a stop-motion animated music video. The video homages the animation style of the 1960s English children\'s television Trumpton Trilogy programmes and the plot of the 1973 horror film The Wicker Man.\n\nOn 6 May, Radiohead released the second single, "Daydreaming", accompanied by a music video directed by Paul Thomas Anderson. The video was projected in 35 mm film in select theatres. On the same day, Radiohead announced that their ninth album, then untitled, would be released at 7pm BST on 8 May, with physical formats to follow from 17 June via XL Recordings. It was made available to buy from Radiohead\'s website and the digital music services Google Play Music, Apple Music, iTunes Store, Amazon Music, and Tidal. Customers can also order a special edition of the album from Radiohead, with packaging "inspired by the albums for 78rpm shellac records" in the studio where they recorded. It includes the album on two heavyweight 12" vinyl records, a CD with two bonus tracks, 32 pages of original artwork, and an original piece of master tape, less than a second in length, from one of Radiohead\'s past recording sessions. As tape degrades over time, the band decided that "rather than it ending up as landfill we would cut it up and make it useful as a part of the special edition."\n\nA Moon Shaped Pool was played in its entirety on BBC Radio 6 Music on the day of release, presented by Tom Robinson. Radiohead will tour in support of the album from May to October 2016, with dates in Europe, North America, and Japan.\n\nA Moon Shaped Pool has a score of 89 out of 100 on the review aggregator website Metacritic—indicating "universal acclaim." Andy Beta of Rolling Stone described it as "a haunting, stunning triumph" and Radiohead\'s "most gorgeous and desolate album to date." Beta praised the individual songs and cohesion of the album; he also commented positively on the mix of electronic, string, and keyboard elements. "Radiohead\'s long-standing embrace of edgy electronics has now been supplanted by an embrace of gorgeous timbres and melody, the more disarming the better.... If anything, A Moon Shaped Pool reveals within Radiohead a newfound appreciation of, if not folk music, then the form\'s ability to express melancholy through their melodies." He thought that "Daydreaming" encapsulated the album best.\n\nJon Pareles, writing for The New York Times, wrote that A Moon Shaped Pool was perhaps " darkest statement — though the one with the band’s most pastoral surface." He praised Yorke\'s vocals and Greenwood\'s string arrangements, writing: "Both Mr. Yorke and Mr. Greenwood are relentlessly inquisitive listeners, lovers of melody and explorers of idioms, makers of puzzles who don’t shy away from emotion." Alexis Petridis of The Guardian felt the album was an improvement over The King of Limbs, writing that Radiohead had achieved "something they\'ve never achieved before... alone among their commercial peers, Radiohead are held to not just release albums but make grand artistic statements worth dissecting and poring over."\n\nChris Barton of The Los Angeles Times also commented positively on the album, writing that it is "an album that reaches for something far more organic and immediate." Justin Joffe, writing for the New York Observer, praised the album. "Pool holds moments of pure heartbreak, loneliness and emotional despair, too, rooted in themes of human intimacy that the band hasn’t explored this bluntly in years. It’s a stunning display of naked vulnerability and a notable achievement." The reviewer lauded the majority of the tracks, particularly the inclusion of "True Love Waits" at the end of the record. He concluded: "Radiohead remain dedicated craftsmen of strange new sonic universes." Nina Corcoran of Consequence of Sound also praised the addition of older songs. "Waiting five years to hear previously released tracks is worth it precisely because Radiohead finally feels connected enough to perform them with meaning." She commends the revision of "True Love Waits", noting it "allowed Radiohead to peel its words when riper than ever." Chris Gerard of PopMatters referred to the album as "worthy of Radiohead’s peerless catalog, a rich addition to what is the most vital and important string of rock albums of the last 30 years." Patrick Ryan of USA Today opined that "the brooding, symphonic and poignant A Moon Shaped Pool, released Sunday, was well worth the wait."\n\nJamieson Cox of The Verge praised the album\'s emotional magnanimity and for offering up something for everyone, while MTV\'s Simon Vozick-Levinson noted that Radiohead\'s "evolution can still blow even a jaded fan\'s mind."\n\n1. Burn the Witch - 3:41\n2. Daydreaming - 6:24\n3. Decks Dark - 4:41\n4. Desert Island Disk - 3:45\n5. Ful Stop - 6:07\n6. Glass Eyes - 2:53\n7. Identikit - 4:27\n8. The Numbers - 5:46\n9. Present Tense - 5:07\n10. Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief - 5:04\n11. True Love Waits - 4:43 Read more on Last.fm. User-contributed text is available under the Creative Commons By-SA License; additional terms may apply.',
    createdAt: '2021-09-26T20:31:44.224Z',
    updatedAt: '2021-09-26T20:31:44.224Z',
    __v: 0
  },
  {
    _id: '6150f1ff8257f25beaeb8857',
    name: 'InnerSpeaker B-Sides & Remixes',
    hash: '05678518fb20e38d1c753d439794124d',
    artist: {
      _id: '6150d5889ce8f39a1b9b6247',
      name: 'Tame Impala',
      hash: '2c6016c76b44cc6876c658f7372b036b',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eb5a2dadeff50fa5c9ad9365c9',
        'https://i.scdn.co/image/ab676161000051745a2dadeff50fa5c9ad9365c9',
        'https://i.scdn.co/image/ab6761610000f1785a2dadeff50fa5c9ad9365c9'
      ],
      tags: [
        'Psychedelic Rock',
        'psychedelic',
        'indie rock',
        'seen live',
        'australian'
      ],
      bio: 'Tame Impala is a psychedelic music project of Australian musician Kevin Parker, who writes, records, produces, and performs. As a touring act, Tame Impala consists of Parker (guitar, vocals), Dominic Simper (guitar, synthesiser), Jay Watson (synthesiser, vocals, guitar), Cam Avery (bass guitar, vocals), and Julien Barbagallo (drums, vocals). Many of them are collaborators of fellow Australian psychedelic rock band Pond. Previously signed to Modular Recordings Read more on Last.fm',
      similar: [
        'Pond',
        "Melody's Echo Chamber",
        'Unknown Mortal Orchestra',
        'Temples',
        'MGMT'
      ],
      createdAt: '2021-09-26T20:18:16.931Z',
      updatedAt: '2021-09-26T20:18:16.931Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/ee5afa70615903fbd4344d3b6003e265.png',
      'https://lastfm.freetls.fastly.net/i/u/64s/ee5afa70615903fbd4344d3b6003e265.png',
      'https://lastfm.freetls.fastly.net/i/u/174s/ee5afa70615903fbd4344d3b6003e265.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/ee5afa70615903fbd4344d3b6003e265.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/ee5afa70615903fbd4344d3b6003e265.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/ee5afa70615903fbd4344d3b6003e265.png'
    ],
    tags: ['psychedelic rock', 'psychedelic', 'indie rock', 'rock', 'indie'],
    bio: 'Add album bio',
    createdAt: '2021-09-26T22:19:42.804Z',
    updatedAt: '2021-09-26T22:19:42.804Z',
    __v: 0
  },
  {
    _id: '6150d84a671486b661904e22',
    name: 'Protean Threat (Rehearsal)',
    hash: '0582e12de610c0a55543042264ae84e4',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/def663419089314b225f96e4068b73cf.jpg',
      'https://lastfm.freetls.fastly.net/i/u/64s/def663419089314b225f96e4068b73cf.jpg',
      'https://lastfm.freetls.fastly.net/i/u/174s/def663419089314b225f96e4068b73cf.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/def663419089314b225f96e4068b73cf.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/def663419089314b225f96e4068b73cf.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/def663419089314b225f96e4068b73cf.jpg'
    ],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:01.097Z',
    updatedAt: '2021-09-26T20:30:01.097Z',
    __v: 0
  },
  {
    _id: '6150d84a671486b661904e2a',
    name: 'Dog Poison',
    hash: '05d96b9fdcb99ab54b5a4cdf50a1931f',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: ['', '', '', '', '', ''],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:01.098Z',
    updatedAt: '2021-09-26T20:30:01.098Z',
    __v: 0
  },
  {
    _id: '6150d84a671486b661904e3c',
    name: 'Drop',
    hash: '066ccc100284d6b685ee108e8a066090',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: ['', '', '', '', '', ''],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:01.368Z',
    updatedAt: '2021-09-26T20:30:01.368Z',
    __v: 0
  },
  {
    _id: '6150f1ff8257f25beaeb883d',
    name: 'Sundown Syndrome',
    hash: '0a42be946eb810b7e9131c7de4587d7a',
    artist: {
      _id: '6150d5889ce8f39a1b9b6247',
      name: 'Tame Impala',
      hash: '2c6016c76b44cc6876c658f7372b036b',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eb5a2dadeff50fa5c9ad9365c9',
        'https://i.scdn.co/image/ab676161000051745a2dadeff50fa5c9ad9365c9',
        'https://i.scdn.co/image/ab6761610000f1785a2dadeff50fa5c9ad9365c9'
      ],
      tags: [
        'Psychedelic Rock',
        'psychedelic',
        'indie rock',
        'seen live',
        'australian'
      ],
      bio: 'Tame Impala is a psychedelic music project of Australian musician Kevin Parker, who writes, records, produces, and performs. As a touring act, Tame Impala consists of Parker (guitar, vocals), Dominic Simper (guitar, synthesiser), Jay Watson (synthesiser, vocals, guitar), Cam Avery (bass guitar, vocals), and Julien Barbagallo (drums, vocals). Many of them are collaborators of fellow Australian psychedelic rock band Pond. Previously signed to Modular Recordings Read more on Last.fm',
      similar: [
        'Pond',
        "Melody's Echo Chamber",
        'Unknown Mortal Orchestra',
        'Temples',
        'MGMT'
      ],
      createdAt: '2021-09-26T20:18:16.931Z',
      updatedAt: '2021-09-26T20:18:16.931Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/839897a080f178b1e6336d1900606b82.png',
      'https://lastfm.freetls.fastly.net/i/u/64s/839897a080f178b1e6336d1900606b82.png',
      'https://lastfm.freetls.fastly.net/i/u/174s/839897a080f178b1e6336d1900606b82.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/839897a080f178b1e6336d1900606b82.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/839897a080f178b1e6336d1900606b82.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/839897a080f178b1e6336d1900606b82.png'
    ],
    tags: ['psychedelic rock', 'psychedelic', 'indie rock', 'cover', 'rock'],
    bio: 'Add album bio',
    createdAt: '2021-09-26T22:19:42.295Z',
    updatedAt: '2021-09-26T22:19:42.295Z',
    __v: 0
  },
  {
    _id: '6150d8b116cb17b199ed13a7',
    name: 'DeLuxe Collection',
    hash: '0cd72c84e60ac660f0f0ceef5b59513d',
    artist: {
      _id: '6150d5899ce8f39a1b9b6271',
      name: 'Radiohead',
      hash: '222a5a8b3ad3d7d0e6805e301898eaaf',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eba03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab67616100005174a03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab6761610000f178a03696716c9ee605006047fd'
      ],
      tags: ['alternative', 'alternative rock', 'rock', 'indie', 'electronic'],
      bio: 'Radiohead is an English alternative rock band from Abingdon, Oxfordshire, UK which formed in 1985. The band is composed of Thom Yorke (lead vocals, rhythm guitar, piano, beats), Jonny Greenwood (lead guitar, keyboard, other instruments), Ed O\'Brien (guitar, backing vocals), Colin Greenwood (bass guitar) and Phil Selway (drums, percussion).\n\nThe early years (1992 – 1995)\nRadiohead released their first single, "Creep" in 1992. The song was initially unsuccessful Read more on Last.fm',
      similar: [
        'Thom Yorke',
        'Atoms for Peace',
        'Muse',
        'The Strokes',
        'Pixies'
      ],
      createdAt: '2021-09-26T20:18:16.962Z',
      updatedAt: '2021-09-26T20:18:16.962Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/89c0d82598544d009595341412b26710.gif',
      'https://lastfm.freetls.fastly.net/i/u/64s/89c0d82598544d009595341412b26710.gif',
      'https://lastfm.freetls.fastly.net/i/u/174s/89c0d82598544d009595341412b26710.gif',
      'https://lastfm.freetls.fastly.net/i/u/300x300/89c0d82598544d009595341412b26710.gif',
      'https://lastfm.freetls.fastly.net/i/u/300x300/89c0d82598544d009595341412b26710.gif',
      'https://lastfm.freetls.fastly.net/i/u/300x300/89c0d82598544d009595341412b26710.gif'
    ],
    tags: ['electronic', 'radiohead', 'rock', 'alternative', 'experimental'],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:31:44.625Z',
    updatedAt: '2021-09-26T20:31:44.625Z',
    __v: 0
  },
  {
    _id: '6150d8b116cb17b199ed1393',
    name: "Pablo Honey (Collector's Edition)",
    hash: '0ce90b0d102a6972f1c2906571829223',
    artist: {
      _id: '6150d5899ce8f39a1b9b6271',
      name: 'Radiohead',
      hash: '222a5a8b3ad3d7d0e6805e301898eaaf',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eba03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab67616100005174a03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab6761610000f178a03696716c9ee605006047fd'
      ],
      tags: ['alternative', 'alternative rock', 'rock', 'indie', 'electronic'],
      bio: 'Radiohead is an English alternative rock band from Abingdon, Oxfordshire, UK which formed in 1985. The band is composed of Thom Yorke (lead vocals, rhythm guitar, piano, beats), Jonny Greenwood (lead guitar, keyboard, other instruments), Ed O\'Brien (guitar, backing vocals), Colin Greenwood (bass guitar) and Phil Selway (drums, percussion).\n\nThe early years (1992 – 1995)\nRadiohead released their first single, "Creep" in 1992. The song was initially unsuccessful Read more on Last.fm',
      similar: [
        'Thom Yorke',
        'Atoms for Peace',
        'Muse',
        'The Strokes',
        'Pixies'
      ],
      createdAt: '2021-09-26T20:18:16.962Z',
      updatedAt: '2021-09-26T20:18:16.962Z',
      __v: 0
    },
    image: ['', '', '', '', '', ''],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:31:44.230Z',
    updatedAt: '2021-09-26T20:31:44.230Z',
    __v: 0
  },
  {
    _id: '6150d6bf85b86c76c88506fa',
    name: 'Dreary Nonsense',
    hash: '0d5b788109702ac7709084b4fd6257c4',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/f0d814a21dffc1ac7d16f94ccf776439.jpg',
      'https://lastfm.freetls.fastly.net/i/u/64s/f0d814a21dffc1ac7d16f94ccf776439.jpg',
      'https://lastfm.freetls.fastly.net/i/u/174s/f0d814a21dffc1ac7d16f94ccf776439.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/f0d814a21dffc1ac7d16f94ccf776439.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/f0d814a21dffc1ac7d16f94ccf776439.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/f0d814a21dffc1ac7d16f94ccf776439.jpg'
    ],
    tags: [
      'psychedelic rock',
      'garage rock',
      'alternative rock',
      'punk rock',
      'experimental rock'
    ],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:23:26.966Z',
    updatedAt: '2021-09-26T20:23:26.966Z',
    __v: 0
  },
  {
    _id: '6150d84a671486b661904e3a',
    name: 'The Ceiling',
    hash: '0da69e6ace1e7d27395663bc8f6b700c',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: ['', '', '', '', '', ''],
    tags: [
      'psychedelic rock',
      'garage rock',
      'alternative rock',
      'punk rock',
      'experimental rock'
    ],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:01.369Z',
    updatedAt: '2021-09-26T20:30:01.369Z',
    __v: 0
  },
  {
    _id: '6150f1ff8257f25beaeb8829',
    name: 'Posthumous Forgiveness',
    hash: '11e91e4d0c828bccfa969bd2c06cd0db',
    artist: {
      _id: '6150d5889ce8f39a1b9b6247',
      name: 'Tame Impala',
      hash: '2c6016c76b44cc6876c658f7372b036b',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eb5a2dadeff50fa5c9ad9365c9',
        'https://i.scdn.co/image/ab676161000051745a2dadeff50fa5c9ad9365c9',
        'https://i.scdn.co/image/ab6761610000f1785a2dadeff50fa5c9ad9365c9'
      ],
      tags: [
        'Psychedelic Rock',
        'psychedelic',
        'indie rock',
        'seen live',
        'australian'
      ],
      bio: 'Tame Impala is a psychedelic music project of Australian musician Kevin Parker, who writes, records, produces, and performs. As a touring act, Tame Impala consists of Parker (guitar, vocals), Dominic Simper (guitar, synthesiser), Jay Watson (synthesiser, vocals, guitar), Cam Avery (bass guitar, vocals), and Julien Barbagallo (drums, vocals). Many of them are collaborators of fellow Australian psychedelic rock band Pond. Previously signed to Modular Recordings Read more on Last.fm',
      similar: [
        'Pond',
        "Melody's Echo Chamber",
        'Unknown Mortal Orchestra',
        'Temples',
        'MGMT'
      ],
      createdAt: '2021-09-26T20:18:16.931Z',
      updatedAt: '2021-09-26T20:18:16.931Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/46b286a212a071665f8d58dfcb13f02f.jpg',
      'https://lastfm.freetls.fastly.net/i/u/64s/46b286a212a071665f8d58dfcb13f02f.jpg',
      'https://lastfm.freetls.fastly.net/i/u/174s/46b286a212a071665f8d58dfcb13f02f.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/46b286a212a071665f8d58dfcb13f02f.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/46b286a212a071665f8d58dfcb13f02f.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/46b286a212a071665f8d58dfcb13f02f.jpg'
    ],
    tags: [
      'psychedelic rock',
      'psychedelic',
      'tame impala',
      'indie rock',
      'rock'
    ],
    bio: 'Add album bio',
    createdAt: '2021-09-26T22:19:42.101Z',
    updatedAt: '2021-09-26T22:19:42.101Z',
    __v: 0
  },
  {
    _id: '6150d84a671486b661904e24',
    name: 'Smote Reverser',
    hash: '14b84861d5cfe3b4c64a53fb7b28d5a6',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/18d1dc09c779ced5febbb85698b9f7f8.jpg',
      'https://lastfm.freetls.fastly.net/i/u/64s/18d1dc09c779ced5febbb85698b9f7f8.jpg',
      'https://lastfm.freetls.fastly.net/i/u/174s/18d1dc09c779ced5febbb85698b9f7f8.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/18d1dc09c779ced5febbb85698b9f7f8.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/18d1dc09c779ced5febbb85698b9f7f8.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/18d1dc09c779ced5febbb85698b9f7f8.jpg'
    ],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:01.095Z',
    updatedAt: '2021-09-26T20:30:01.095Z',
    __v: 0
  },
  {
    _id: '6150d8b116cb17b199ed1385',
    name: 'Me & This Army: Radiohead Remixes',
    hash: '14ee2b47c70474bd28befefb7ea5fbf9',
    artist: {
      _id: '6150d5899ce8f39a1b9b6271',
      name: 'Radiohead',
      hash: '222a5a8b3ad3d7d0e6805e301898eaaf',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eba03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab67616100005174a03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab6761610000f178a03696716c9ee605006047fd'
      ],
      tags: ['alternative', 'alternative rock', 'rock', 'indie', 'electronic'],
      bio: 'Radiohead is an English alternative rock band from Abingdon, Oxfordshire, UK which formed in 1985. The band is composed of Thom Yorke (lead vocals, rhythm guitar, piano, beats), Jonny Greenwood (lead guitar, keyboard, other instruments), Ed O\'Brien (guitar, backing vocals), Colin Greenwood (bass guitar) and Phil Selway (drums, percussion).\n\nThe early years (1992 – 1995)\nRadiohead released their first single, "Creep" in 1992. The song was initially unsuccessful Read more on Last.fm',
      similar: [
        'Thom Yorke',
        'Atoms for Peace',
        'Muse',
        'The Strokes',
        'Pixies'
      ],
      createdAt: '2021-09-26T20:18:16.962Z',
      updatedAt: '2021-09-26T20:18:16.962Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/2b6e2c0ed7f542ce8743feea8a0943b3.jpg',
      'https://lastfm.freetls.fastly.net/i/u/64s/2b6e2c0ed7f542ce8743feea8a0943b3.jpg',
      'https://lastfm.freetls.fastly.net/i/u/174s/2b6e2c0ed7f542ce8743feea8a0943b3.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/2b6e2c0ed7f542ce8743feea8a0943b3.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/2b6e2c0ed7f542ce8743feea8a0943b3.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/2b6e2c0ed7f542ce8743feea8a0943b3.jpg'
    ],
    tags: ['2005', 'cut-up-dj'],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:31:44.030Z',
    updatedAt: '2021-09-26T20:31:44.030Z',
    __v: 0
  },
  {
    _id: '6150f1ff8257f25beaeb881d',
    name: 'Eventually',
    hash: '15cfa6b4a2360d5f945ab54edb8ae38b',
    artist: {
      _id: '6150d5889ce8f39a1b9b6247',
      name: 'Tame Impala',
      hash: '2c6016c76b44cc6876c658f7372b036b',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eb5a2dadeff50fa5c9ad9365c9',
        'https://i.scdn.co/image/ab676161000051745a2dadeff50fa5c9ad9365c9',
        'https://i.scdn.co/image/ab6761610000f1785a2dadeff50fa5c9ad9365c9'
      ],
      tags: [
        'Psychedelic Rock',
        'psychedelic',
        'indie rock',
        'seen live',
        'australian'
      ],
      bio: 'Tame Impala is a psychedelic music project of Australian musician Kevin Parker, who writes, records, produces, and performs. As a touring act, Tame Impala consists of Parker (guitar, vocals), Dominic Simper (guitar, synthesiser), Jay Watson (synthesiser, vocals, guitar), Cam Avery (bass guitar, vocals), and Julien Barbagallo (drums, vocals). Many of them are collaborators of fellow Australian psychedelic rock band Pond. Previously signed to Modular Recordings Read more on Last.fm',
      similar: [
        'Pond',
        "Melody's Echo Chamber",
        'Unknown Mortal Orchestra',
        'Temples',
        'MGMT'
      ],
      createdAt: '2021-09-26T20:18:16.931Z',
      updatedAt: '2021-09-26T20:18:16.931Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/d81b137b7988ebaf3a0a9e953e5d981e.png',
      'https://lastfm.freetls.fastly.net/i/u/64s/d81b137b7988ebaf3a0a9e953e5d981e.png',
      'https://lastfm.freetls.fastly.net/i/u/174s/d81b137b7988ebaf3a0a9e953e5d981e.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/d81b137b7988ebaf3a0a9e953e5d981e.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/d81b137b7988ebaf3a0a9e953e5d981e.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/d81b137b7988ebaf3a0a9e953e5d981e.png'
    ],
    tags: [
      'psychedelic pop',
      'psychedelic rock',
      'singles',
      'rock',
      'power pop'
    ],
    bio: 'Add album bio',
    createdAt: '2021-09-26T22:19:41.895Z',
    updatedAt: '2021-09-26T22:19:41.895Z',
    __v: 0
  },
  {
    _id: '6150d84a671486b661904e1e',
    name: 'Levitation Session Vol. II',
    hash: '179774acaf599fef760f9bfe1a116d09',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/e8f5a54edd14ddc80129718f5b8ce6a7.png',
      'https://lastfm.freetls.fastly.net/i/u/64s/e8f5a54edd14ddc80129718f5b8ce6a7.png',
      'https://lastfm.freetls.fastly.net/i/u/174s/e8f5a54edd14ddc80129718f5b8ce6a7.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/e8f5a54edd14ddc80129718f5b8ce6a7.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/e8f5a54edd14ddc80129718f5b8ce6a7.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/e8f5a54edd14ddc80129718f5b8ce6a7.png'
    ],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:01.096Z',
    updatedAt: '2021-09-26T20:30:01.096Z',
    __v: 0
  },
  {
    _id: '6150d849671486b661904dee',
    name: 'Be Gay, Do Crime!',
    hash: '1872dea9acd9889b706e0c8b0265d9ef',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/ffd39509e2693d18c617d72877aaf6fc.jpg',
      'https://lastfm.freetls.fastly.net/i/u/64s/ffd39509e2693d18c617d72877aaf6fc.jpg',
      'https://lastfm.freetls.fastly.net/i/u/174s/ffd39509e2693d18c617d72877aaf6fc.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/ffd39509e2693d18c617d72877aaf6fc.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/ffd39509e2693d18c617d72877aaf6fc.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/ffd39509e2693d18c617d72877aaf6fc.jpg'
    ],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:29:59.865Z',
    updatedAt: '2021-09-26T20:29:59.865Z',
    __v: 0
  },
  {
    _id: '6150d849671486b661904df0',
    name: 'Weirdo Hairdo',
    hash: '1957909856e9b60f7173bee682253b87',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/67cbeeac18bae4dccd2d39a39e31367d.jpg',
      'https://lastfm.freetls.fastly.net/i/u/64s/67cbeeac18bae4dccd2d39a39e31367d.jpg',
      'https://lastfm.freetls.fastly.net/i/u/174s/67cbeeac18bae4dccd2d39a39e31367d.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/67cbeeac18bae4dccd2d39a39e31367d.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/67cbeeac18bae4dccd2d39a39e31367d.jpg',
      'https://lastfm.freetls.fastly.net/i/u/300x300/67cbeeac18bae4dccd2d39a39e31367d.jpg'
    ],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:00.065Z',
    updatedAt: '2021-09-26T20:30:00.065Z',
    __v: 0
  },
  {
    _id: '6150d849671486b661904dfe',
    name: 'An Odd Entrances',
    hash: '1a8b20fcc50efe3592fb9c3416cd7d56',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: ['', '', '', '', '', ''],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:00.279Z',
    updatedAt: '2021-09-26T20:30:00.279Z',
    __v: 0
  },
  {
    _id: '6150d8b116cb17b199ed137b',
    name: 'No Surprises',
    hash: '2327938d8e8108eab75590fcca1fbd56',
    artist: {
      _id: '6150d5899ce8f39a1b9b6271',
      name: 'Radiohead',
      hash: '222a5a8b3ad3d7d0e6805e301898eaaf',
      image: [
        'https://i.scdn.co/image/ab6761610000e5eba03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab67616100005174a03696716c9ee605006047fd',
        'https://i.scdn.co/image/ab6761610000f178a03696716c9ee605006047fd'
      ],
      tags: ['alternative', 'alternative rock', 'rock', 'indie', 'electronic'],
      bio: 'Radiohead is an English alternative rock band from Abingdon, Oxfordshire, UK which formed in 1985. The band is composed of Thom Yorke (lead vocals, rhythm guitar, piano, beats), Jonny Greenwood (lead guitar, keyboard, other instruments), Ed O\'Brien (guitar, backing vocals), Colin Greenwood (bass guitar) and Phil Selway (drums, percussion).\n\nThe early years (1992 – 1995)\nRadiohead released their first single, "Creep" in 1992. The song was initially unsuccessful Read more on Last.fm',
      similar: [
        'Thom Yorke',
        'Atoms for Peace',
        'Muse',
        'The Strokes',
        'Pixies'
      ],
      createdAt: '2021-09-26T20:18:16.962Z',
      updatedAt: '2021-09-26T20:18:16.962Z',
      __v: 0
    },
    image: [
      'https://lastfm.freetls.fastly.net/i/u/34s/927b6996fb441c629a8bbf353ff8d440.png',
      'https://lastfm.freetls.fastly.net/i/u/64s/927b6996fb441c629a8bbf353ff8d440.png',
      'https://lastfm.freetls.fastly.net/i/u/174s/927b6996fb441c629a8bbf353ff8d440.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/927b6996fb441c629a8bbf353ff8d440.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/927b6996fb441c629a8bbf353ff8d440.png',
      'https://lastfm.freetls.fastly.net/i/u/300x300/927b6996fb441c629a8bbf353ff8d440.png'
    ],
    tags: ['alternative', 'alternative rock', 'radiohead', 'rock', 'indie'],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:31:43.811Z',
    updatedAt: '2021-09-26T20:31:43.811Z',
    __v: 0
  },
  {
    _id: '6150d84a671486b661904e1c',
    name: 'Putrifiers II',
    hash: '2583baae99a15c13449ba3b9841a8408',
    artist: {
      _id: '6150d6be85b86c76c88506f7',
      name: 'Osees',
      hash: 'd7a23c416d280e7d6fb25ddb318f1a3d',
      image: [
        'https://i.scdn.co/image/ab6772690000c46cb2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000dd22b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab6772690000bac3b2c183cbd9febc49e59c8286',
        'https://i.scdn.co/image/ab67726900008f74b2c183cbd9febc49e59c8286'
      ],
      tags: [
        'Garage Rock',
        'Psychedelic Rock',
        'alternative rock',
        'Experimental Rock',
        'punk rock'
      ],
      bio: 'The name Osees is the name the band formerly known as OCS, Thee Oh Sees and Oh Sees has been using since late 2019. Read more on Last.fm',
      similar: [
        'Thee Oh Sees',
        'Frankie and the Witch Fingers',
        'Bent Arcana',
        'Fuzz',
        'Ty Segall'
      ],
      createdAt: '2021-09-26T20:23:26.867Z',
      updatedAt: '2021-09-26T20:23:26.867Z',
      __v: 0
    },
    image: ['', '', '', '', '', ''],
    tags: [],
    bio: 'Add album bio',
    createdAt: '2021-09-26T20:30:00.832Z',
    updatedAt: '2021-09-26T20:30:00.832Z',
    __v: 0
  }
]

const tracks = [
  {
    _id: '6170349c8db56cf9cf24b497',
    name: 'Clutter (us, 1980)',
    artists: ['615b532ad4e3a6d7f3076d78'],
    artist: 'Bound & Gagged',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/01 Clutter (US, 1980).mp3',
    duration: 133.0938775510204,
    year: 2018,
    number: 1,
    updatedAt: '2021-10-20T15:24:12.834Z',
    createdAt: '2021-10-20T15:24:12.834Z',
    __v: 0
  },
  {
    _id: '6170349d8db56cf9cf24b4aa',
    name: "Mary's Got The Bug (uk, 1982)",
    artists: ['615b532bd4e3a6d7f3076d85'],
    artist: 'Twelve Cubic Feet',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: "music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/03 Mary's Got The Bug (UK, 1982).mp3",
    duration: 110.81142857142858,
    year: 2018,
    number: 3,
    updatedAt: '2021-10-20T15:24:13.851Z',
    createdAt: '2021-10-20T15:24:13.851Z',
    __v: 0
  },
  {
    _id: '6170349e8db56cf9cf24b4b1',
    name: 'Fontänen (se, 1981)',
    artists: ['615b532bd4e3a6d7f3076d8a'],
    artist: 'Sporten Är Död',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/04 Fontänen (SE, 1981).mp3',
    duration: 145.99836734693878,
    year: 2018,
    number: 4,
    updatedAt: '2021-10-20T15:24:14.219Z',
    createdAt: '2021-10-20T15:24:14.219Z',
    __v: 0
  },
  {
    _id: '6170349e8db56cf9cf24b4b8',
    name: 'Consume (dn, 1979)',
    artists: ['615b532bd4e3a6d7f3076d8f'],
    artist: 'Elektrochok',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/05 Consume (DN, 1979).mp3',
    duration: 159.66040816326532,
    year: 2018,
    number: 5,
    updatedAt: '2021-10-20T15:24:14.482Z',
    createdAt: '2021-10-20T15:24:14.482Z',
    __v: 0
  },
  {
    _id: '6170349e8db56cf9cf24b4bf',
    name: 'Lantin (be, 1980)',
    artists: ['615b532bd4e3a6d7f3076d94'],
    artist: "No Man's Land",
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/06 Lantin (BE, 1980).mp3',
    duration: 125.51836734693877,
    year: 2018,
    number: 6,
    updatedAt: '2021-10-20T15:24:14.772Z',
    createdAt: '2021-10-20T15:24:14.772Z',
    __v: 0
  },
  {
    _id: '6170349f8db56cf9cf24b4c6',
    name: 'ハプニング (jp, 1984)',
    artists: ['615b532bd4e3a6d7f3076d99'],
    artist: 'Kyah (キャ→)',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/07 ハプニング (JP, 1984).mp3',
    duration: 90.264,
    year: 2018,
    number: 7,
    updatedAt: '2021-10-20T15:24:15.041Z',
    createdAt: '2021-10-20T15:24:15.041Z',
    __v: 0
  },
  {
    _id: '6170349f8db56cf9cf24b4d4',
    name: 'Javna Kupatila (yu, 1981)',
    artists: ['615b532cd4e3a6d7f3076da3'],
    artist: 'Paraf',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/09 Javna Kupatila (YU, 1981).mp3',
    duration: 152.79020408163265,
    year: 2018,
    number: 9,
    updatedAt: '2021-10-20T15:24:15.653Z',
    createdAt: '2021-10-20T15:24:15.653Z',
    __v: 0
  },
  {
    _id: '6170349f8db56cf9cf24b4db',
    name: 'Doctor Spock (sp, 1981)',
    artists: ['615b532cd4e3a6d7f3076da8'],
    artist: 'Alaska Y Los Pegamoides',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/10 Doctor Spock (SP, 1981).mp3',
    duration: 142.81142857142856,
    year: 2018,
    number: 10,
    updatedAt: '2021-10-20T15:24:15.917Z',
    createdAt: '2021-10-20T15:24:15.917Z',
    __v: 0
  },
  {
    _id: '617034a08db56cf9cf24b4e2',
    name: 'Sado Maso (fr, 1979)',
    artists: ['615b532cd4e3a6d7f3076dad'],
    artist: 'Edith Nylon',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/11 Sado Maso (FR, 1979).mp3',
    duration: 173.79265306122448,
    year: 2018,
    number: 11,
    updatedAt: '2021-10-20T15:24:16.183Z',
    createdAt: '2021-10-20T15:24:16.183Z',
    __v: 0
  },
  {
    _id: '617034a08db56cf9cf24b4e9',
    name: 'Food Free Food (us, 1981)',
    artists: ['615b532cd4e3a6d7f3076db2'],
    artist: 'The Delinquents',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/12 Food Free Food (US, 1981).mp3',
    duration: 150.64816326530612,
    year: 2018,
    number: 12,
    updatedAt: '2021-10-20T15:24:16.445Z',
    createdAt: '2021-10-20T15:24:16.445Z',
    __v: 0
  },
  {
    _id: '617034a08db56cf9cf24b4f0',
    name: 'Zu Cool (de, 1981)',
    artists: ['615b532cd4e3a6d7f3076db7'],
    artist: 'Östro 430',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/13 Zu Cool (DE, 1981).mp3',
    duration: 163.5265306122449,
    year: 2018,
    number: 13,
    updatedAt: '2021-10-20T15:24:16.762Z',
    createdAt: '2021-10-20T15:24:16.762Z',
    __v: 0
  },
  {
    _id: '617034a18db56cf9cf24b4f7',
    name: 'Telephone (ch, 1981)',
    artists: ['615b532dd4e3a6d7f3076dbc'],
    artist: 'Technycolor',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/14 Telephone (CH, 1981).mp3',
    duration: 185.57387755102042,
    year: 2018,
    number: 14,
    updatedAt: '2021-10-20T15:24:17.032Z',
    createdAt: '2021-10-20T15:24:17.032Z',
    __v: 0
  },
  {
    _id: '617034a18db56cf9cf24b4fe',
    name: 'In Technicolor (us, 1981)',
    artists: ['615b532dd4e3a6d7f3076dc1'],
    artist: 'MYDOLLS',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/15 In Technicolor (US, 1981).mp3',
    duration: 154.01795918367347,
    year: 2018,
    number: 15,
    updatedAt: '2021-10-20T15:24:17.371Z',
    createdAt: '2021-10-20T15:24:17.371Z',
    __v: 0
  },
  {
    _id: '617034a18db56cf9cf24b505',
    name: 'Mi Ne Parolas (us, 1981)',
    artists: ['615b532dd4e3a6d7f3076dc6'],
    artist: 'IXNA',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/16 Mi Ne Parolas (US, 1981).mp3',
    duration: 164.96326530612245,
    year: 2018,
    number: 16,
    updatedAt: '2021-10-20T15:24:17.744Z',
    createdAt: '2021-10-20T15:24:17.744Z',
    __v: 0
  },
  {
    _id: '61715903593d57961c21f492',
    name: 'Sit Down (stand Up) (nz, 1981)',
    artists: ['615b532bd4e3a6d7f3076d80'],
    artist: 'Playthings',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/02 Sit Down (Stand Up) (NZ, 1981).mp3',
    duration: 131.84,
    year: 2018,
    number: 2,
    updatedAt: '2021-10-21T12:11:47.722Z',
    createdAt: '2021-10-21T12:11:47.722Z',
    __v: 0
  },
  {
    _id: '61715904593d57961c21f499',
    name: 'Bla-bla (nl, 1980)',
    artists: ['615b532cd4e3a6d7f3076d9e'],
    artist: 'Pink Plastic & Panties',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/08 Bla-Bla (NL, 1980).mp3',
    duration: 140.69551020408164,
    year: 2018,
    number: 8,
    updatedAt: '2021-10-21T12:11:48.136Z',
    createdAt: '2021-10-21T12:11:48.136Z',
    __v: 0
  }
]

export const AlbumScreen = ({ id }) => {
  const [albumData, setAlbumData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getAlbumFromDB(id).then((data) => {
      setAlbumData({
        ...data.album
      })
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Header
        title={`Album: ${albumData?.name} by ${albumData?.artist?.name}`}
        static='true'
        back='true'
        transparent='true'
      />

      <div className='album-meta'>
        <div className='picture'>
          <img className='album-picture' src={albumData?.image[3] || cover} />
        </div>
        <div className='details'>
          {/* <div [routerLink]="['/', { outlets: { modal: ['modal', 'artists', album?.artist?._id] } }]"
           */}

          <div className='album-title'>{albumData?.name}</div>
          {/* <div>{{ tracks.length }} Songs; <i appTooltip tooltip="Duration" className="feather-clock"></i> {{ duration |
				formatSeconds }}</div> */}
          <Link
            href={`/library/artist/${albumData?.artist._id}`}
            className='album-artist'
          >
            <img
              className='artist-picture'
              src={albumData?.artist?.image[0] || cover}
            />
            {albumData?.artist?.name}
          </Link>
          <div className='album-length'>
            23 Songs | 41:43
            <i className='feather-clock'></i>
          </div>
          <div className='play-button'>Play</div>
        </div>
      </div>
      <TrackList tracks={tracks} />
      {albums.length > 0 && (
        <>
          <h3>{`More from ${albumData?.artist?.name}`}</h3>
          <HorizontalScroll>
            <div className='albums'>
              {albums.map((album) => {
                const imageURL =
                  album.image && album.image[5] !== '' ? album.image[5] : cover
                return (
                  <AlbumCard
                    key={album._id}
                    id={album._id}
                    imageURL={imageURL}
                    artist={album.artist}
                    name={album.name}
                  />
                )
              })}
            </div>
          </HorizontalScroll>
        </>
      )}
    </>
  )
}

/* <div class="details">
			<div [routerLink]="['/', { outlets: { modal: ['modal', 'artists', album?.artist?._id] } }]"
				class="album-artist">
				<img class="artist-picture" [src]="album?.artist?.picture || '/assets/app-icon-text.png'" />
				{{ album?.artist?.name }}
			</div>

			<div class="album-title">{{ album.name }}</div>
			<div>{{ tracks.length }} Songs; <i appTooltip tooltip="Duration" class="feather-clock"></i> {{ duration |
				formatSeconds }}</div>
			<div (click)="onPlayAlbum()" class="play-button">
				Play</div>
		</div>
	</div>
	<app-track-list [track]="track" *ngFor="let track of tracks"></app-track-list>



	<ng-container *ngIf="albums.length > 0">
		<h3>More by {{ album.artist.name }}</h3>
		<div class="albums">
			<swiper [config]="config">
				<ng-container *ngFor="let album of albums; ">
					<ng-template swiperSlide>
						<div [routerLink]="['/', { outlets: { modal: ['modal', 'albums', album?._id] } }]"
							class="album">
							<img [src]="album.picture || '/assets/app-icon-text.png'" />
							<div class="column-details">
								<div class="title">{{ album.name }}</div>
								<div class="subtitle">{{ album.artist.name }}</div>
							</div>
						</div>
					</ng-template>
				</ng-container>
			</swiper>
		</div>
	</ng-container>

	<app-loading [loading]="loading"></app-loading> */
