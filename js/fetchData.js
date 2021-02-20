// https://ia801507.us.archive.org/3/items/trailer_20210119/trailer.mp4
const data = {
    sources: [[sessionStorage.getItem('videoUrl'), 'video/mp4']],
    // sources: [['https://o2-pj3-s-z014.vidstream.to/watch/2fb9ad097dddb804F%7C4DMc%7C1T2cCyn4DP.4dLb-zfjtvBt42yWQUSgAA__.Y2JzU0E0WXVEOG9tWmQwUHY3a0lHY2lMYk5UcDZ3akNtK05MQy9hWjI4MytYRTRCWFRIbExOWUd3a2ZBZ1lqbGY0VHNOMUtDWW5qeFNaK0NwNXowYWNIQUEvTHZzNEVmd2RKZlBFZDZHbmZlZzZYcWpFWjZxY0YxMVkyZ3JMMCtDQjBWUmUyT3EzZ2tKbVQ4RmJZekZnQ1BYcUxGMTBGK1NHdjAycUNwUWFkOVdUVGxTSDhoL2d2WGw5eXBuZE9DZlZWQjIwbjBoNkNtejhJNWhlbTBUbVBnWnJkOHdvdllyNGJUT1VLUkltOU0wQ2JMd1k0Tll6d0gzQy9tYjltY1MwWVRBVFV6a2FneVdpTGtOVXBZUVhqMnUwMG51dDQyeEpkSjFBSlJwY1VVWkMxcEFtaWZ4SXd0RnNXQUh0b2k5bXNBOEpQNzBzWXhiTDBGcllLditodEY4bkhHRm9lcXJpRUJ2RUtzS3NJWklJK2VpT0hmaGtGYlFsQnl2STRxbCt5MGczcFR2dXBZd3RKSDdZajJ5azFPYTZIV2dYVT0_', 'video/mp4']],
    // sources: [['', 'video/mp4']],
    audio: [['english', 'static/trailer-en.srt']],
    subtitle: [['english', 'audio.mp3']],
    default: {'audio': 'english', 'subtitles': 'english'},
    meta: {
        id: '1',
        title: '',
        type: 'Series',
        listID: '1',
        age: 'All',
        cats: ['Cartoon', 'Adventure', 'Comedy'] 
    },
}


const subtitlesArr = [
    // {
    //   "content": "Welcome back, friends.",
    //   "end": 6673,
    //   "index": 1,
    //   "start": 4254
    // },
    // {
    //   "content": "Why can\u2019t you just leave me alone?",
    //   "end": 9176,
    //   "index": 2,
    //   "start": 7257
    // },
    // {
    //   "content": "Bean, running from your mother\nis so last year.",
    //   "end": 12179,
    //   "index": 3,
    //   "start": 9259
    // },
    // {
    //   "content": "Elfo\u2019s more of a mother to me\nthan you.",
    //   "end": 14264,
    //   "index": 4,
    //   "start": 12262
    // },
    // {
    //   "content": "This ruins so many fantasies,",
    //   "end": 16475,
    //   "index": 5,
    //   "start": 14348
    // },
    // {
    //   "content": "but opens up so many new ones.",
    //   "end": 18268,
    //   "index": 6,
    //   "start": 16558
    // },
    // {
    //   "content": "Announcing the return\nof Princess Tiabeanie.",
    //   "end": 22564,
    //   "index": 7,
    //   "start": 19603
    // },
    // {
    //   "content": "Warning. She appears to be\nin a bit of a mood.",
    //   "end": 25776,
    //   "index": 8,
    //   "start": 22648
    // },
    // {
    //   "content": "Ow!",
    //   "end": 26735,
    //   "index": 9,
    //   "start": 25859
    // },
    // {
    //   "content": "There are people inside this castle\nwho want me dead.",
    //   "end": 31573,
    //   "index": 10,
    //   "start": 28946
    // },
    // {
    //   "content": "She is clearly a threat.",
    //   "end": 33367,
    //   "index": 11,
    //   "start": 31657
    // },
    // {
    //   "content": "Elfo and Luci\u00a0are all I have",
    //   "end": 35244,
    //   "index": 12,
    //   "start": 33450
    // },
    // {
    //   "content": "and that is not a deep bench.\nWe gotta get out of here.",
    //   "end": 38288,
    //   "index": 13,
    //   "start": 35327
    // },
    // {
    //   "content": "Damn it!",
    //   "end": 45045,
    //   "index": 14,
    //   "start": 44002
    // },
    // {
    //   "content": "Woah, Steamland.",
    //   "end": 48215,
    //   "index": 15,
    //   "start": 47130
    // },
    // {
    //   "content": "There\u2019s a power in Dreamland\nbeyond anything we have here.",
    //   "end": 54054,
    //   "index": 16,
    //   "start": 50759
    // },
    // {
    //   "content": "I\u2019m offering an alliance\nbetween magic and science.",
    //   "end": 57933,
    //   "index": 17,
    //   "start": 55138
    // },
    // {
    //   "content": "This is big. I really need\nsome time to drink about this.",
    //   "end": 61812,
    //   "index": 18,
    //   "start": 58642
    // },
    // {
    //   "content": "-You mean--\n-I know what I said.",
    //   "end": 64314,
    //   "index": 19,
    //   "start": 62896
    // },
    // {
    //   "content": "This is the sinister plot\nthat just keeps giving.",
    //   "end": 74449,
    //   "index": 20,
    //   "start": 71655
    // },
    // {
    //   "content": "So much gasping.",
    //   "end": 77953,
    //   "index": 21,
    //   "start": 76785
    // },
    // {
    //   "content": "Our queen.",
    //   "end": 82124,
    //   "index": 22,
    //   "start": 80872
    // },
    // {
    //   "content": "I know you can do this.",
    //   "end": 84001,
    //   "index": 23,
    //   "start": 82874
    // },
    // {
    //   "content": "Badass Bean is the Bean\nI wanna see right now.",
    //   "end": 88046,
    //   "index": 24,
    //   "start": 85669
    // },
    // {
    //   "content": "You\u2019re right. I am badass!",
    //   "end": 91008,
    //   "index": 25,
    //   "start": 88839
    // },
    // {
    //   "content": "What is this?\nOh, my God. Calm down.",
    //   "end": 95304,
    //   "index": 26,
    //   "start": 92092
    // },
    // {
    //   "content": "Oh, no, this is your life now.\nIt\u2019s forever!",
    //   "end": 98890,
    //   "index": 27,
    //   "start": 95387
    // },
    // {
    //   "content": "All right. I\u2019ll talk to you later.",
    //   "end": 114448,
    //   "index": 28,
    //   "start": 112863
    // }
  ]

console.log('Fetch Data is loaded.')