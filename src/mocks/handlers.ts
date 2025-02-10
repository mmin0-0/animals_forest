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
  {
    id: 'test',
    nickname: '여울',
    image: '/images/user/profile.png',
    _count: {
      Followers: 0,
      Followings: 1
    }
  },
  { id: 'test01', nickname: 'kk', image: '/images/user/profile01.png', _count: { Followers: 3, Followings: 0 } },
  { id: 'test02', nickname: '너굴', image: '/images/user/profile02.png', _count: { Followers: 3, Followings: 1 } },
  { id: 'test03', nickname: '뽀야미', image: '/images/user/profile03.png', _count: { Followers: 1, Followings: 2 } },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const handlers = [
  http.post(`${baseUrl}/api/login`, () => {
    console.log('로그인');
    return HttpResponse.json(User[0], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      },
    })
  }),
  http.post(`${baseUrl}/api/logout`, () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    })
  }),
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    console.log('회원가입');
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
          content: `${cursor + 1} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 2,
          User: User[0],
          content: `${cursor + 2} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 3,
          User: User[0],
          content: `${cursor + 3} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 4,
          User: User[0],
          content: `${cursor + 4} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
            { imageId: 3, link: faker.image.urlLoremFlickr() },
            { imageId: 4, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 5,
          User: User[0],
          content: `${cursor + 5} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
            { imageId: 3, link: faker.image.urlLoremFlickr() },
          ],
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
          User: User[0],
          content: `${cursor + 1} Stop following me. I'm too famous.`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 2,
          User: User[0],
          content: `${cursor + 2} Stop following me. I'm too famous.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
            { imageId: 3, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 3,
          User: User[0],
          content: `${cursor + 3} Stop following me. I'm too famous.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() }
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 4,
          User: User[0],
          content: `${cursor + 4} Stop following me. I'm too famous.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
            { imageId: 3, link: faker.image.urlLoremFlickr() },
            { imageId: 4, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 5,
          User: User[0],
          content: `${cursor + 5} Stop following me. I'm too famous.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
          ],
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
          content: `${tag}`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${tag}`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[0],
          content: `${tag}`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[0],
          content: `${tag}`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[0],
          content: `${tag}`,
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
          User: User[0],
          content: `${userId}의 게시글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[0],
          content: `${userId}의 게시글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[0],
          content: `${userId}의 게시글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[0],
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
        content: `${postId} 게시글의 post 내용`,
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
          User: User[0],
          content: `${1}게시글의 ${postId}답글`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 2,
          User: User[0],
          content: `${2}게시글의 ${postId}답글`,
          Images: [{ imageId: 2, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 3,
          User: User[0],
          content: `${3}게시글의 ${postId}답글`,
          Images: [{ imageId: 3, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 4,
          User: User[0],
          content: `${4}게시글의 ${postId}답글`,
          Images: [{ imageId: 4, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: 5,
          User: User[0],
          content: `${5}게시글의 ${postId}답글`,
          Images: [{ imageId: 5, link: faker.image.urlLoremFlickr() }],
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
          roomId: 1,
          Receiver: User[1],
          Sender: User[0],
          Messages: {
            content: {
              ReceiverMessage: '하이하이',
              SenderMessage: '반가워요'
            }
          },
          createdAt: new Date(),
        },
        {
          roomId: 2,
          Receiver: User[2],
          Sender: User[0],
          Messages: {
            content: {
              ReceiverMessage: '저랑 맞팔하실래요?',
              SenderMessage: '좋아요!'
            }
          },
          createdAt: new Date(),
        },
      ]
    )
  }),
];