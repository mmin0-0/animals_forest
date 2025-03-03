import { NextResponse } from "next/server";
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
  { id: 'test', nickname: '여울', image: '/images/user/profile.png', _count: { Followers: 0, Followings: 1 } },
  { id: 'test01', nickname: 'kk', image: '/images/user/profile01.png', _count: { Followers: 3, Followings: 0 } },
  { id: 'test02', nickname: '너굴', image: '/images/user/profile02.png', _count: { Followers: 3, Followings: 1 } },
  { id: 'test03', nickname: '뽀야미', image: '/images/user/profile03.png', _count: { Followers: 1, Followings: 2 } },
  { id: 'test04', nickname: '애플', image: '/images/user/profile04.png', _count: { Followers: 0, Followings: 4 } },
];

// before login
export async function POST(req: Request) {
  const { pathname } = new URL(req.url);

  // login
  if (pathname === '/api/login') {
    return NextResponse.json(User[0], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      }
    });
  }

  // logout
  if (pathname === '/api/logout') {
    return NextResponse.json(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    });
  }

  // users
  if (pathname === '/api/users') {
    return NextResponse.json(null, {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      }
    });
  }
  return NextResponse.json({ message: 'Invalid endpoint' }, { status: 404 });
}

// after login
export async function GET(req: Request) {
  const { pathname, searchParams } = new URL(req.url);
  const cursor = parseInt(searchParams.get('cursor') as string) || 0;

  // 기본 post
  if (pathname === '/api/postRecommends') {
    await delay(3000);
    return NextResponse.json(generatePosts(cursor));
  }

  // 팔로잉 post
  if (pathname === '/api/followingPosts') {
    await delay(3000);
    return NextResponse.json(generatePosts(cursor));
  }

  // search
  if (pathname.startsWith('/api/search/')) {
    const tag = pathname.split('/').pop();
    return NextResponse.json(generateSearchResults(tag));
  }

  // users
  if (pathname.startsWith('/api/users/')) {
    const userId = pathname.split('/').pop();
    const foundUser = User.find((v) => v.id === userId);
    if (foundUser) {
      return NextResponse.json(foundUser);
    }
    return NextResponse.json({ message: 'no_such_user' }, { status: 404 });
  }

  // users
  if (pathname.startsWith('/api/users/') && pathname.endsWith('/posts')) {
    const userId = pathname.split('/')[2];
    return NextResponse.json(generateUserPosts(userId));
  }

  // user post
  if (pathname.startsWith('/api/posts/')) {
    const postId = pathname.split('/').pop();
    if (parseInt(postId as string) > 10) {
      return NextResponse.json({ message: 'no_such_post' }, { status: 404 });
    }
    return NextResponse.json(generatePost(postId));
  }

  // comments
  if (pathname.startsWith('/api/posts/') && pathname.endsWith('/comments')) {
    const postId = pathname.split('/')[2];
    return NextResponse.json(generateComments(postId));
  }

  // 팔로우추천
  if (pathname === '/api/followRecommends') {
    return NextResponse.json(User);
  }

  // 트렌드
  if (pathname === '/api/trends') {
    return NextResponse.json(generateTrends());
  }
  return NextResponse.json({ message: 'Invalid endpoint' }, { status: 404 });
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 기본 post
function generatePosts(cursor: number) {
  return [
    {
      postId: cursor + 1,
      User: User[0],
      content: `농작물 구경하고 가세요~`,
      Images: [
        { imageId: 1, link: '/images/post/post_img01.jpg' },
        { imageId: 2, link: '/images/post/post_img02.jpg' },
        { imageId: 3, link: '/images/post/post_img03.jpg' },
      ],
      createdAt: generateDate(),
    },
    {
      postId: cursor + 2,
      User: User[1],
      content: `파라다이스 주민들 집꾸꾸`,
      Images: [
        { imageId: 1, link: '/images/post/post_img04.jpg' },
        { imageId: 2, link: '/images/post/post_img05.jpg' },
      ],
      createdAt: generateDate(),
    },
    {
      postId: cursor + 3,
      User: User[2],
      content: `갱상도 눈사람`,
      Images: [{ imageId: 1, link: '/images/post/post_img06.jpg' }],
      createdAt: generateDate(),
    },
    {
      postId: cursor + 4,
      User: User[3],
      content: `모동숲 특수주민 리스트 공유드립니다:)`,
      Images: [
        { imageId: 1, link: '/images/post/post_img07.jpg' },
        { imageId: 2, link: '/images/post/post_img08.jpg' },
        { imageId: 3, link: '/images/post/post_img09.jpg' },
        { imageId: 4, link: '/images/post/post_img10.jpg' },
      ],
      createdAt: generateDate(),
    },
    {
      postId: cursor + 5,
      User: User[4],
      content: `매주 토요일마다 파라다이스에서 kk공연이 있어요!`,
      Images: [{ imageId: 4, link: '/images/post/post_img11.jpg' }],
      createdAt: generateDate(),
    }
  ];
}

// 검색결과 post
function generateSearchResults(tag: string) {
  return [
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
  ];
}

// user 게시글(singlePost)
function generateUserPosts(userId: string) {
  return [
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
  ];
}

// 게시글 상세 내용
function generatePost(postId: string) {
  return {
    postId,
    User: User[0],
    content: `${postId} 게시글의 내용`,
    Images: [
      { imageId: 0, link: faker.image.urlLoremFlickr() },
      { imageId: 1, link: faker.image.urlLoremFlickr() },
      { imageId: 2, link: faker.image.urlLoremFlickr() },
    ],
    createdAt: generateDate(),
  };
}

// 게시글 댓글
function generateComments(postId: string) {
  return [
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
  ];
}

// 트렌드
function generateTrends() {
  return [
    { tagId: 1, title: '모여봐요 동물의 숲2', count: 1297399 },
    { tagId: 2, title: '인기주민', count: 776482 },
    { tagId: 3, title: '무트코인', count: 126422 },
    { tagId: 4, title: '계절아이템 레시피', count: 1223 },
    { tagId: 5, title: '파라다이스', count: 190 },
    { tagId: 6, title: '눈사람 잘만드는 법', count: 78 },
  ];
}