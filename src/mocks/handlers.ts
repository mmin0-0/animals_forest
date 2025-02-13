import { http, HttpResponse } from 'msw'
import { faker } from "@faker-js/faker";

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

const User = [
  {id: 'test', nickname: '여울', image: '/images/user/profile.png', _count: {Followers: 0, Followings: 1}},
  { id: 'test01', nickname: 'kk', image: '/images/user/profile01.png', _count: { Followers: 3, Followings: 0 } },
  { id: 'test02', nickname: '너굴', image: '/images/user/profile02.png', _count: { Followers: 3, Followings: 1 } },
  { id: 'test03', nickname: '뽀야미', image: '/images/user/profile03.png', _count: { Followers: 1, Followings: 2 } },
  { id: 'test04', nickname: '애플', image: '/images/user/profile04.png', _count: { Followers: 0, Followings: 4 } },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const handlers = [
  http.post(`${baseUrl}/api/login`, () => {
    return HttpResponse.json(User[0], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      },
    })
  }),
  http.post(`${baseUrl}/api/logout`, () => {
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    })
  }),
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      },
    });
  }),
  http.get(`${baseUrl}/api/postRecommends`, async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json(
      [
        {
          postId: cursor + 1,
          User: User[0],
          content: `농작물 구경하고 가세요~`,
          Images: [
            {imageId: 1, link: '/images/post/post_img01.jpg'},
            {imageId: 2, link: '/images/post/post_img02.jpg'},
            {imageId: 3, link: '/images/post/post_img03.jpg'},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 2,
          User: User[1],
          content: `파라다이스 주민들 집꾸꾸`,
          Images: [
            {imageId: 1, link: '/images/post/post_img04.jpg'},
            {imageId: 2, link: '/images/post/post_img05.jpg'},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 3,
          User: User[2],
          content: `갱상도 눈사람`,
          Images: [{imageId: 1, link: '/images/post/post_img06.jpg'}],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 4,
          User: User[3],
          content: `모동숲 특수주민 리스트 공유드립니다:)`,
          Images: [
            {imageId: 1, link: '/images/post/post_img07.jpg'},
            {imageId: 2, link: '/images/post/post_img08.jpg'},
            {imageId: 3, link: '/images/post/post_img09.jpg'},
            {imageId: 4, link: '/images/post/post_img10.jpg'},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 5,
          User: User[4],
          content: `매주 토요일마다 파라다이스에서 kk공연이 있어요!`,
          Images: [{imageId: 4, link: '/images/post/post_img11.jpg'}],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  http.get(`${baseUrl}/api/followingPosts`, async ({ request }) => {
    await delay(3000);
    const url = new URL(request.url);
    const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;
    return HttpResponse.json(
      [
        {
          postId: cursor + 1,
          User: User[1],
          content: `파라다이스 주민들 집꾸`,
          Images: [
            {imageId: 1, link: '/images/post/post_img04.jpg'},
            {imageId: 2, link: '/images/post/post_img05.jpg'},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 2,
          User: User[2],
          content: `갱상도 눈사람`,
          Images: [{imageId: 1, link: '/images/post/post_img06.jpg'}],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 3,
          User: User[3],
          content: `모동숲 특수주민 리스트 공유드립니다:)`,
          Images: [
            {imageId: 1, link: '/images/post/post_img07.jpg'},
            {imageId: 2, link: '/images/post/post_img08.jpg'},
            {imageId: 3, link: '/images/post/post_img09.jpg'},
            {imageId: 4, link: '/images/post/post_img10.jpg'},
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 4,
          User: User[4],
          content: `매주 토요일마다 파라다이스에서 kk공연이 있어요!`,
          Images: [{imageId: 4, link: '/images/post/post_img11.jpg'}],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 5,
          User: User[0],
          content: `무트코인 거래 원합니다!`,
          Images: [],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  http.get(`${baseUrl}/api/search/:tag`, async ({ request, params }) => {
    const { tag } = params;
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[0],
          content: `${tag}의 검색결과`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[1],
          content: `${tag}의 검색결과`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[2],
          content: `${tag}의 검색결과`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[3],
          content: `${tag}의 검색결과`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[4],
          content: `${tag}의 검색결과`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  http.get(`${baseUrl}/api/users/:userId`, async ({ request, params }) => {
    const { userId } = params;
    const found = User.find((v) => v.id === userId);

    if (found) {
      return HttpResponse.json(found)
    }
    return HttpResponse.json({ message: 'no_such_user' }, {
      status: 404
    })
  }),
  http.get(`${baseUrl}/api/users/:userId/posts`, async ({ request, params }) => {
    const { userId } = params;
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[0],
          content: `${userId}의 게시글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[1],
          content: `${userId}의 게시글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[2],
          content: `${userId}의 게시글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[3],
          content: `${userId}의 게시글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[4],
          content: `${userId}의 게시글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  http.get(`${baseUrl}/api/posts/:postId`, async ({ request, params }) => {
    const { postId } = params;
    if (parseInt(postId as string) > 10) {
      return HttpResponse.json({ message: 'no_such_post' }, {
        status: 404
      });
    }
    return HttpResponse.json(
      {
        postId,
        User: User[0],
        content: `${postId} 게시글의 내용`,
        Images: [
          { imageId: 0, link: faker.image.urlLoremFlickr() },
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: generateDate(),
      }
    )
  }),
  http.get(`${baseUrl}/api/posts/:postId/comments`, async ({ request, params }) => {
    const { postId } = params;
    return HttpResponse.json(
      [
        {
          postId: 1,
          User: User[1],
          content: `저랑 맞팔해요!`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[3],
          content: `쪽지 주실 수 있나요?!`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[4],
          content: `공유 부탁드립니다:)`,
          Images: [{ imageId: 3, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[2],
          content: `오 어떻게 하신 거에요?-?`,
          Images: [],
          createdAt: generateDate(),
        },
      ]
    )
  }),
  http.get(`${baseUrl}/api/followRecommends`, async ({ request }) => {
    return HttpResponse.json(User);
  }),
  http.get(`${baseUrl}/api/trends`, ({ request }) => {
    return HttpResponse.json(
      [
        { tagId: 1, title: '모여봐요 동물의 숲2', count: 1297399 },
        { tagId: 2, title: '인기주민', count: 776482 },
        { tagId: 3, title: '무트코인', count: 126422 },
        { tagId: 4, title: '계절아이템 레시피', count: 1223 },
        { tagId: 5, title: '파라다이스', count: 190 },
        { tagId: 6, title: '눈사람 잘만드는 법', count: 78 }
      ]
    )
  }),
  http.get(`${baseUrl}/api/messages/:roomId`, async ({ request, params }) => {
    const { roomId } = params;
    return HttpResponse.json(
      [
        {
          messageId: 1,
          roomId: 1,
          Sender: User[1],
          Receiver: User[0],
          content: {
            SenderMessage: '하이하이',
            ReceiverMessage: '반가워요:)'
          },
          createdAt: generateDate(),
        },
        {
          messageId: 2,
          roomId: 2,
          Sender: User[4],
          Receiver: User[0],
          content: {
            SenderMessage: '저랑 무트코인 거래하실래요?',
            ReceiverMessage: '좋아요!'
          },
          createdAt: generateDate(),
        },
      ]
    )
  }),
  http.get(`${baseUrl}/api/messages/:messageId`, async ({ request, params }) => {
    const { messageId } = params;
    return HttpResponse.json(
      {
        messageId: 1,
        roomId: 1,
        Sender: User[1],
        Receiver: User[0],
        content: {
          SenderMessage: '하이하이',
          ReceiverMessage: `반가워요:) ${messageId}`
        },
        createdAt: generateDate(),
      }
    )
  }),
];